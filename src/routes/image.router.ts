import { Router } from 'express'
import { imageController } from '../controllers/image.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { uploadConfig } from '../middlewares/upload.middleware.js'
import commentRouter from './comment.router.js'
import saveRouter from './save.router.js'

const imageRouter = Router()

imageRouter.get('/', imageController.findAll)
imageRouter.get('/:id', imageController.getImageById)
imageRouter.post('/', verifyToken, uploadConfig.single('file'), imageController.create)
imageRouter.delete('/:id', verifyToken, imageController.delete)
imageRouter.use('/:id/comments', commentRouter)
imageRouter.use('/:id', saveRouter)

export default imageRouter
