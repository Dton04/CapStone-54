import { Router } from 'express'
import { commentController } from '../controllers/comment.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

// Bật mergeParams: true để commentRouter nhận được tham số :id từ imageRouter cha (/api/images/:id/comments)
const commentRouter = Router({ mergeParams: true })

// GET /api/images/:id/comments
commentRouter.get('/', commentController.getComments)

// POST /api/images/:id/comments
commentRouter.post('/', verifyToken, commentController.createComment)

// DELETE /api/images/:id/comments/:commentId
commentRouter.delete('/:commentId', verifyToken, commentController.deleteComment)

export default commentRouter
