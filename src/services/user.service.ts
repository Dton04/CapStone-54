import { prisma } from '../common/prisma/connect.prisma.js'
import { NotfoundException, BadRequestException } from '../common/helpers/exception.helper.js'
import { uploadToCloudinary } from '../common/helpers/cloudinary.helper.js'
import type { UpdateProfileDto } from '../dtos/user.dto.js'
import type { PaginationDto } from '../dtos/image.dto.js'
import { getPaginationOptions, getPaginationResult } from '../common/helpers/pagination.helper.js'

export const userService = {

   async getProfile(userId: number) {
      const user = await prisma.user.findUnique({
         where: { id: userId },
         select: {
            id: true,
            full_name: true,
            email: true,
            avatar: true,
            age: true,
            createdAt: true,
         },
      })

      if (!user) throw new NotfoundException('Không tìm thấy người dùng')
      return user
   },

   async updateProfile(userId: number, dto: UpdateProfileDto) {
      const user = await prisma.user.update({
         where: { id: userId },
         data: {
            full_name: dto.full_name,
            age: dto.age,
            updatedAt: new Date(),
         },
         select: {
            id: true,
            full_name: true,
            email: true,
            avatar: true,
            age: true,
         },
      })

      return user
   },

   async getCreatedImages(userId: number, paginationDto: PaginationDto) {
      const { page, limit, skip } = getPaginationOptions(paginationDto.page, paginationDto.limit)

      const where = { user_id: userId, isDeleted: false }

      const [totalCount, images] = await Promise.all([
         prisma.image.count({ where }),
         prisma.image.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
               id: true,
               image_name: true,
               url: true,
               createdAt: true,
               user: {
                  select: { id: true, full_name: true, avatar: true },
               },
            },
         }),
      ])

      return getPaginationResult(images, totalCount, page, limit)
   },

   async getSavedImages(userId: number, paginationDto: PaginationDto) {
      const { page, limit, skip } = getPaginationOptions(paginationDto.page, paginationDto.limit)

      const where = { user_id: userId, isDeleted: false }

      const [totalCount, savedRecords] = await Promise.all([
         prisma.savedImage.count({ where }),
         prisma.savedImage.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
               image: {
                  select: {
                     id: true,
                     image_name: true,
                     url: true,
                     createdAt: true,
                     user: {
                        select: { id: true, full_name: true, avatar: true },
                     },
                  },
               },
            },
         }),
      ])

      // Map lại để trả về mảng ảnh phẳng
      const images = savedRecords.map(r => r.image)

      return getPaginationResult(images, totalCount, page, limit)
   },

   async updateAvatar(userId: number, fileBuffer: Buffer) {
      if (!fileBuffer) throw new BadRequestException('File avatar không được để trống')

      const uploadResult = await uploadToCloudinary(fileBuffer, 'pinshare-avatars')

      const user = await prisma.user.update({
         where: { id: userId },
         data: {
            avatar: uploadResult.secure_url,
            updatedAt: new Date(),
         },
         select: {
            id: true,
            avatar: true,
         },
      })

      return user
   },
}
