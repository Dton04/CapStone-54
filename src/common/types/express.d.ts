// Mở rộng kiểu Request của Express để thêm field `user`
// File này được TypeScript tự động pick up khi include trong tsconfig

declare namespace Express {
   interface Request {
      user?: {
         id: number
         email: string
         full_name: string
      }
   }
}
