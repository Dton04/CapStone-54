import { prisma } from '../common/prisma/connect.prisma.js'
import { hashPassword, comparePassword } from '../common/helpers/password.helper.js'
import { generateTokens, verifyRefreshToken } from '../common/helpers/jwt.helper.js'
import type { RegisterDto, LoginDto, AuthResult } from '../dtos/auth.dto.js'
import { NotfoundException, UnauthorizedException } from '../common/helpers/exception.helper.js'



export async function registerService(dto: RegisterDto): Promise<AuthResult> {
   const { full_name, email, password, age } = dto

   const existingUser = await prisma.user.findUnique({ where: { email } })
   if (existingUser) throw new Error('EMAIL_ALREADY_EXISTS')

   const hashedPassword = await hashPassword(password)

   const user = await prisma.user.create({
      data: { full_name, email, password: hashedPassword, age: age ?? null },
      select: {
         id: true,
         full_name: true,
         email: true,
         avatar: true,
         age: true,
         created_at: true
      },
   })

   const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
   })

   await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
   })

   return { user, accessToken, refreshToken }
}


export async function loginService(dto: LoginDto): Promise<AuthResult> {
   const { email, password } = dto

   const user = await prisma.user.findUnique({ where: { email } })
   if (!user) throw new NotfoundException("Không tìm thấy user")

   const isValid = await comparePassword(password, user.password)
   if (!isValid) throw new UnauthorizedException("Sai mật khẩu")

   const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
   })

   await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
   })

   // Loại bỏ sensitive fields trước khi trả về
   const { password: _, refresh_token: __, ...safeUser } = user

   return { user: safeUser, accessToken, refreshToken }
}

export async function refreshTokenService(token: string): Promise<{ accessToken: string }> {
   let decoded: { id: number; email: string; full_name: string }

   try {
      decoded = verifyRefreshToken(token)
   } catch {
      throw new Error('INVALID_REFRESH_TOKEN')
   }

   // Checking token còn trong DB không (chống reuse sau logout)
   const user = await prisma.user.findUnique({ where: { id: decoded.id } })
   if (!user || user.refresh_token !== token) throw new Error('INVALID_REFRESH_TOKEN')

   const { accessToken } = generateTokens({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
   })

   return { accessToken }
}


export async function logoutService(userId: number): Promise<void> {
   await prisma.user.update({
      where: { id: userId },
      data: { refresh_token: null },
   })
}
