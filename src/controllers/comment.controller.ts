import { Request, Response, NextFunction } from 'express'
import { commentService } from '../services/comment.service.js'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'


//| `GET` | `/api/images/:id/comments` | Lấy dah sách bình luận của ản
//| `POST` | `/api/images/:id/comments` | Đăng bình luận


export const commentController = {
   async getComments(req: Request, res: Response, next: NextFunction) {
      const result = await commentService.findAll(Number(req.params.id));
      const response = responseSuccess(result, `Lấy danh sách bình luận thành công`);
      res.status(response.statusCode).json(response);
   },


}