import { Request, Response, NextFunction } from 'express'
import { saveService } from '../services/save.service.js'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'

export const saveController = {

   async checkSaved(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const imageId = Number(req.params.id)
         const userId = req.user!.id

         const result = await saveService.checkSaved({ imageId, userId })

         const resp = responseSuccess(result, 'Kiểm tra trạng thái lưu thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
   async saveImage(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const imageId = Number(req.params.id)
         const userId = req.user!.id

         const result = await saveService.saveImage({ imageId, userId })

         const resp = responseSuccess(result, 'Lưu ảnh thành công', 201)
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
   async unsaveImage(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const imageId = Number(req.params.id)
         const userId = req.user!.id

         const result = await saveService.unsaveImage({ imageId, userId })

         const resp = responseSuccess(result, 'Bỏ lưu ảnh thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
}
