import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { uploadConfig } from '../middlewares/upload.middleware.js'

const userRouter = Router()

userRouter.get('/profile', verifyToken, userController.getProfile)
userRouter.put('/profile', verifyToken, userController.updateProfile)
userRouter.post('/avatar', verifyToken, uploadConfig.single('avatar'), userController.uploadAvatar)
userRouter.get('/:id/created-images', userController.getCreatedImages)
userRouter.get('/:id/saved-images', userController.getSavedImages)

export default userRouter
