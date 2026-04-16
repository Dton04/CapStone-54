import { Request, Response, NextFunction } from 'express'
import { imageService } from '../services/image.service.js'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'

export const imageController = {

   async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { page, limit, name } = req.query

         // Biến đổi req.query sang DTO trước khi đẩy vào Service
         const dto = {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            name: name ? String(name) : undefined,
         }

         const result = await imageService.findAll(dto)

         const resp = responseSuccess(result, 'Lấy danh sách ảnh thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async getImageById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params

         if (!id || isNaN(Number(id))) {
            const resp = responseError('ID ảnh không hợp lệ', 400)
            res.status(resp.statusCode).json(resp)
            return
         }

         const result = await imageService.getImageById(Number(id))

         const resp = responseSuccess(result, 'Lấy chi tiết ảnh thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async create(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { image_name, description } = req.body
         const file = req.file

         if (!image_name || !file) {
            const resp = responseError('Tên ảnh và file là bắt buộc', 400)
            res.status(resp.statusCode).json(resp)
            return
         }

         const result = await imageService.create({
            image_name,
            description,
            userId: req.user!.id,  // Có được thông qua verifyToken
            fileBuffer: file.buffer,
         })

         const resp = responseSuccess(result, 'Upload ảnh thành công', 201)
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const { id } = req.params

         if (!id || isNaN(Number(id))) {
            const resp = responseError('ID ảnh không hợp lệ', 400)
            res.status(resp.statusCode).json(resp)
            return
         }

         const result = await imageService.delete({
            imageId: Number(id),
            userId: req.user!.id,  // Kiểm tra ownership bằng id của chính họ
         })

         const resp = responseSuccess(result, 'Xoá ảnh thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
}
