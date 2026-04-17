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
   res.send(`
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8" />
      <title>PinShare API</title>
      <style>
         body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            font-family: Arial, sans-serif;
         }

         .container {
            text-align: center;
            animation: fadeIn 1.5s ease-in-out;
         }

         h1 {
            margin-bottom: 10px;
         }

         p {
            opacity: 0.9;
         }

         .spinner {
            margin: 20px auto;
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
         }

         @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
         }

         @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
         }
      </style>
   </head>
   <body>
      <div class="container">
         <h1>WELCOME Mentor</h1>
         <h1>100 điểm nha :3</h1>
         <p>PinShare API is running...</p>
         <div class="spinner"></div>
         <p>Redirecting to API Docs</p>
      </div>

      <script>
         setTimeout(() => {
            window.location.href = '/api-docs'
         }, 2000)
      </script>
   </body>
   </html>
   `)
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
