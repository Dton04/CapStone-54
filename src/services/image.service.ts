import { prisma } from '../common/prisma/connect.prisma.js'
import { NotfoundException, ForbiddenException, BadRequestException } from '../common/helpers/exception.helper.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../common/helpers/cloudinary.helper.js'
import type { CreateImageDto, DeleteImageDto } from '../dtos/image.dto.js'

export interface ImageFilterDto {
   page?: number
   limit?: number
   name?: string
}

export const imageService = {
   /**
    * Trả về danh sách ảnh, có hỗ trợ tìm kiếm động theo 'name'
    */
   async findAll(dto: ImageFilterDto) {
      const page = dto.page || 1
      const limit = dto.limit || 10
      const skip = (page - 1) * limit

      // Build điều kiện where động (dynamic where clause)
      const where: any = {}
      if (dto.name) {
         where.image_name = { contains: dto.name, mode: 'insensitive' }
      }

      // Vừa đếm tổng số lượng (đáp ứng điều kiện), vừa query data
      const [totalCount, images] = await Promise.all([
         prisma.image.count({ where }),
         prisma.image.findMany({
            where,
            skip,
            take: limit,
            orderBy: { created_at: 'desc' },
            select: {
               id: true,
               image_name: true,
               url: true,
               created_at: true,
               user: {
                  select: { id: true, full_name: true, avatar: true },
               },
            },
         }),
      ])

      return {
         images,
         pagination: {
            page,
            limit,
            total_items: totalCount,
            total_pages: Math.ceil(totalCount / limit),
         },
      }
   },

   /**
    * Lấy chi tiết ảnh theo ID
    */
   async getImageById(id: number) {
      const image = await prisma.image.findUnique({
         where: { id },
         select: {
            id: true,
            image_name: true,
            url: true,
            description: true,
            created_at: true,
            user: {
               select: { id: true, full_name: true, email: true, avatar: true },
            },
            _count: {
               select: { comments: true, savedBy: true },
            },
         },
      })

      if (!image) {
         throw new NotfoundException('Không tìm thấy ảnh')
      }

      return image
   },

   /**
    * Tạo ảnh mới (Upload lên Cloudinary và lưu DB)
    */
   async create(dto: CreateImageDto) {
      if (!dto.fileBuffer) {
         throw new BadRequestException('File ảnh không được để trống')
      }

      // 1. Upload lên Cloudinary
      const uploadResult = await uploadToCloudinary(dto.fileBuffer, 'pinshare-images')

      // 2. Lưu vào Database
      const newImage = await prisma.image.create({
         data: {
            image_name: dto.image_name,
            description: dto.description || null,
            url: uploadResult.secure_url,
            user_id: dto.userId,
         },
      })

      return newImage
   },

   /**
    * Xóa ảnh (Chỉ người tạo mới được xóa)
    */
   async delete(dto: DeleteImageDto) {
      // 1. Lấy thông tin ảnh
      const image = await prisma.image.findUnique({
         where: { id: dto.imageId },
      })

      if (!image) {
         throw new NotfoundException('Không tìm thấy ảnh')
      }

      // 2. Kiểm tra quyền sở hữu
      if (image.user_id !== dto.userId) {
         throw new ForbiddenException('Bạn không có quyền xóa ảnh này')
      }

      // 3. Xoá khỏi Cloudinary (Tuỳ chọn: tách public_id từ URL nếu cần, tạm thời xử lý đơn giản)
      try {
         // Lấy public_id từ url: https://res.cloudinary.com/.../pinshare-images/filename.jpg
         const urlParts = image.url.split('/')
         const filenameWithExt = urlParts[urlParts.length - 1]
         const folderName = urlParts[urlParts.length - 2]
         const filename = filenameWithExt.split('.')[0]
         const publicId = `${folderName}/${filename}`
         
         await deleteFromCloudinary(publicId)
      } catch (err) {
         console.warn('Lỗi khi xóa ảnh trên Cloudinary:', err)
      }

      // 4. Xóa khỏi DB
      await prisma.image.delete({
         where: { id: dto.imageId },
      })

      return { deletedId: dto.imageId }
   },
}