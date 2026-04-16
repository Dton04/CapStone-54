import { prisma } from '../common/prisma/connect.prisma.js'
import { NotfoundException, BadRequestException } from '../common/helpers/exception.helper.js'
import type { CheckSaveDto, ToggleSaveDto } from '../dtos/save.dto.js'

export const saveService = {

   async checkSaved(dto: CheckSaveDto): Promise<{ isSaved: boolean }> {
      const savedRecord = await prisma.savedImage.findFirst({
         where: {
            image_id: dto.imageId,
            user_id: dto.userId,
            isDeleted: false,
         },
      })

      return { isSaved: !!savedRecord }
   },


   async saveImage(dto: ToggleSaveDto) {
      const image = await prisma.image.findUnique({
         where: { id: dto.imageId },
      })

      if (!image || image.isDeleted) {
         throw new NotfoundException('Không tìm thấy ảnh này để lưu')
      }
      const existingRecord = await prisma.savedImage.findUnique({
         where: {
            user_id_image_id: {
               user_id: dto.userId,
               image_id: dto.imageId,
            },
         },
      })

      if (existingRecord) {
         if (!existingRecord.isDeleted) {
            throw new BadRequestException('Bạn đã lưu ảnh này rồi')
         }
         return await prisma.savedImage.update({
            where: { id: existingRecord.id },
            data: {
               isDeleted: false,
               deletedAt: null,
               updatedAt: new Date(),
            },
         })
      }
      return await prisma.savedImage.create({
         data: {
            user_id: dto.userId,
            image_id: dto.imageId,
         },
      })
   },

   async unsaveImage(dto: ToggleSaveDto) {
      const existingRecord = await prisma.savedImage.findUnique({
         where: {
            user_id_image_id: {
               user_id: dto.userId,
               image_id: dto.imageId,
            },
         },
      })

      if (!existingRecord || existingRecord.isDeleted) {
         throw new BadRequestException('Bạn chưa lưu ảnh này hoặc đã bỏ lưu rồi')
      }

      return await prisma.savedImage.update({
         where: { id: existingRecord.id },
         data: {
            isDeleted: true,
            deletedAt: new Date(),
            updatedAt: new Date(),
         },
      })
   },
}
