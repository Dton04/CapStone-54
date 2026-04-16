import { Router } from 'express'
import { register, login, refresh, logout } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const authRouter = Router()

// Swagger docs → xem src/common/swagger/auth.swagger.ts

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/refresh', refresh)
authRouter.post('/logout', verifyToken, logout)

export default authRouter
