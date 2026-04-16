import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { setupSwagger } from './common/swagger/config.swagger.js'

// ─── Routers ──────────────────────────────────────────────────────────────────
import authRouter from './routes/auth.router.js'
import imageRouter from './routes/image.router.js'
import userRouter from './routes/user.router.js'

const app = express()
const PORT = process.env.PORT || 9090

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
   cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   }),
)

// ─── Swagger ──────────────────────────────────────────────────────────────────
setupSwagger(app)

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
   res.json({
      success: true,
      message: 'PinShare API is running',
      version: '1.0.0',
      docs: `/api-docs`,
   })
})

app.use('/api/auth', authRouter)
app.use('/api/images', imageRouter)
app.use('/api/users', userRouter)
// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
   res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` })
})

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`)
   console.log(`Swagger docs at http://localhost:${PORT}/api-docs`)
})
