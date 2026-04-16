import { Router } from 'express'
import { imageController } from '../controllers/image.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
import { uploadConfig } from '../middlewares/upload.middleware.js'

const imageRouter = Router()

// Swagger docs → xem src/common/swagger/image.swagger.ts

// API Lấy danh sách ảnh (có tích hợp luôn tìm kiếm via query param ?name=xxx)
imageRouter.get('/', imageController.findAll)

// API Lấy chi tiết ảnh
imageRouter.get('/:id', imageController.getImageById)

// API Upload ảnh (yêu cầu đăng nhập & gửi file form-data)
imageRouter.post('/', verifyToken, uploadConfig.single('file'), imageController.create)

// API Xóa ảnh (yêu cầu đăng nhập, chỉ chủ sở hữu được xóa)
imageRouter.delete('/:id', verifyToken, imageController.delete)

export default imageRouter
