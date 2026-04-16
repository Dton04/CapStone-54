import { Router } from 'express'
import { saveController } from '../controllers/save.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

// Sử dụng mergeParams: true để nhận được :id từ imageRouter
const saveRouter = Router({ mergeParams: true })

// GET /api/images/:id/saved
saveRouter.get('/saved', verifyToken, saveController.checkSaved)

// POST /api/images/:id/save
saveRouter.post('/save', verifyToken, saveController.saveImage)

// DELETE /api/images/:id/save
saveRouter.delete('/save', verifyToken, saveController.unsaveImage)

export default saveRouter
