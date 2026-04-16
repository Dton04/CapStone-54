import { prisma } from '../common/prisma/connect.prisma.js'
import { NotfoundException, ForbiddenException, BadRequestException } from '../common/helpers/exception.helper.js'
import type { CreateCommentDto, DeleteCommentDto } from '../dtos/comment.dto.js'

export const commentService = {
   /**
    * Lấy danh sách bình luận của 1 ảnh
    */
   async findAll(imageId: number) {
      if (isNaN(imageId)) throw new BadRequestException('ID ảnh không hợp lệ')

      const comments = await prisma.comment.findMany({
         where: {
            image_id: imageId,
            isDeleted: false,
         },
         select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
               select: {
                  id: true,
                  full_name: true,
                  avatar: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
      return comments
   },

   /**
    * Đăng bình luận mới
    */
   async create(dto: CreateCommentDto) {
      if (!dto.content?.trim()) {
         throw new BadRequestException('Nội dung bình luận không được để trống')
      }

      // Kiểm tra ảnh có tồn tại không
      const image = await prisma.image.findUnique({ where: { id: dto.imageId } })
      if (!image || image.isDeleted) {
         throw new NotfoundException('Không tìm thấy ảnh này')
      }

      const comment = await prisma.comment.create({
         data: {
            content: dto.content,
            image_id: dto.imageId,
            user_id: dto.userId,
         },
         select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
               select: { id: true, full_name: true, avatar: true },
            },
         },
      })
      return comment
   },

   /**
    * Xóa bình luận (Soft delete by owner)
    */
   async delete(dto: DeleteCommentDto) {
      const comment = await prisma.comment.findUnique({
         where: { id: dto.commentId },
      })

      if (!comment || comment.isDeleted) {
         throw new NotfoundException('Không tìm thấy bình luận')
      }

      if (comment.user_id !== dto.userId) {
         throw new ForbiddenException('Bạn không có quyền xoá bình luận này')
      }

      const deletedComment = await prisma.comment.update({
         where: { id: dto.commentId },
         data: {
            isDeleted: true,
            deletedAt: new Date(),
         },
      })
      return { deletedId: deletedComment.id }
   },
}