import { Request, Response, NextFunction } from 'express'
import { userService } from '../services/user.service.js'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'

export const userController = {
   async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = req.user!.id
         const result = await userService.getProfile(userId)

         const resp = responseSuccess(result, 'Lấy thông tin cá nhân thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = req.user!.id
         const { full_name, age } = req.body

         const result = await userService.updateProfile(userId, {
            full_name,
            age: age ? Number(age) : undefined,
         })

         const resp = responseSuccess(result, 'Cập nhật thông tin thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async getCreatedImages(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const targetUserId = Number(req.params.id)
         const { page, limit } = req.query

         const result = await userService.getCreatedImages(targetUserId, {
            page: page as string,
            limit: limit as string,
         })

         const resp = responseSuccess(result, 'Lấy danh sách ảnh đã tạo thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async getSavedImages(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const targetUserId = Number(req.params.id)
         const { page, limit } = req.query

         const result = await userService.getSavedImages(targetUserId, {
            page: page as string,
            limit: limit as string,
         })

         const resp = responseSuccess(result, 'Lấy danh sách ảnh đã lưu thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async uploadAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = req.user!.id
         const file = req.file

         if (!file) {
            const resp = responseError('Vui lòng chọn file ảnh avatar', 400)
            res.status(resp.statusCode).json(resp)
            return
         }

         const result = await userService.updateAvatar(userId, file.buffer)

         const resp = responseSuccess(result, 'Cập nhật avatar thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
}
