import jwt from 'jsonwebtoken'
import type { AuthUserPayload, TokenPair } from '../../dtos/auth.dto.js'
import {
   JWT_ACCESS_SECRET,
   JWT_REFRESH_SECRET,
   JWT_ACCESS_EXPIRES,
   JWT_REFRESH_EXPIRES,
} from '../constants/app.constant.js'


// Tạo cặp access token + refresh token từ user payload

export function generateTokens(payload: AuthUserPayload): TokenPair {
   const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
      expiresIn: (JWT_ACCESS_EXPIRES as any) ?? '15m',
   })
   const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
      expiresIn: (JWT_REFRESH_EXPIRES as any) ?? '7d',
   })
   return { accessToken, refreshToken }
}


// Verify access token – trả về payload hoặc throw nếu invalid/expired

export function verifyAccessToken(token: string): AuthUserPayload {
   return jwt.verify(token, JWT_ACCESS_SECRET as string) as AuthUserPayload
}


//Verify refresh token – trả về payload hoặc throw nếu invalid/expired

export function verifyRefreshToken(token: string): AuthUserPayload {
   return jwt.verify(token, JWT_REFRESH_SECRET as string) as AuthUserPayload
}
