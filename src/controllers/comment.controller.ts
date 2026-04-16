import { Request, Response, NextFunction } from 'express'
import { commentService } from '../services/comment.service.js'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'

export const commentController = {

   async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const imageId = Number(req.params.id)
         const result = await commentService.findAll(imageId)

         const resp = responseSuccess(result, 'Lấy danh sách bình luận thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },

   async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const imageId = Number(req.params.id)
         const { content } = req.body
         const userId = req.user!.id

         const result = await commentService.create({
            content,
            imageId,
            userId,
         })

         const resp = responseSuccess(result, 'Bình luận thành công', 201)
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },


   async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const commentId = Number(req.params.commentId)
         const userId = req.user!.id

         if (isNaN(commentId)) {
            const resp = responseError('ID bình luận không hợp lệ', 400)
            res.status(resp.statusCode).json(resp)
            return
         }

         const result = await commentService.delete({
            commentId,
            userId,
         })

         const resp = responseSuccess(result, 'Xoá bình luận thành công')
         res.status(resp.statusCode).json(resp)
      } catch (error: any) {
         const resp = responseError(error.message, error.code || 500)
         res.status(resp.statusCode).json(resp)
      }
   },
}