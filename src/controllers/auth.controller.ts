import { Request, Response } from 'express'
import {
   registerService,
   loginService,
   refreshTokenService,
   logoutService,
} from '../services/auth.service.js'
import {
   successResponse,
   errorResponse,
   validationError,
} from '../common/helpers/response.helper.js'
import type { RegisterDto, LoginDto, RefreshTokenDto } from '../dtos/auth.dto.js'
import { setAuthCookies, clearAuthCookies } from '../common/helpers/cookie.helper.js'


export async function register(req: Request, res: Response): Promise<void> {
   try {
      const { full_name, email, password, age }: RegisterDto = req.body

      if (!full_name || !email || !password) {
         validationError(res, 'full_name, email and password are required')
         return
      }

      const result = await registerService({ full_name, email, password, age })

      // Set cookies
      setAuthCookies(res, result.accessToken, result.refreshToken)

      successResponse(
         res,
         {
            user: result.user,
         },
         'User registered successfully',
         201,
      )
   } catch (error: any) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
         errorResponse(res, 'Email already exists', 409)
      } else {
         errorResponse(res, 'Internal server error', 500)
      }
   }
}


export async function login(req: Request, res: Response): Promise<void> {
   try {
      const { email, password }: LoginDto = req.body

      if (!email || !password) {
         validationError(res, 'Email and password are required')
         return
      }

      const result = await loginService({ email, password })

      // Set cookies
      setAuthCookies(res, result.accessToken, result.refreshToken)

      successResponse(res, {
         user: result.user,
      }, 'Login successful')
   } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
         errorResponse(res, 'Invalid email or password', 401)
      } else {
         errorResponse(res, 'Internal server error', 500)
      }
   }
}

export async function refresh(req: Request, res: Response): Promise<void> {
   try {
      const refresh_token = req.cookies?.refresh_token || (req.body as RefreshTokenDto).refresh_token

      if (!refresh_token) {
         validationError(res, 'refresh_token is required')
         return
      }

      const result = await refreshTokenService(refresh_token)

      // Set cookies for the new access token
      res.cookie('access_token', result.accessToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 15 * 60 * 1000,
      })

      successResponse(res, null, 'Token refreshed')
   } catch {
      errorResponse(res, 'Invalid or expired refresh token', 401)
   }
}


export async function logout(req: Request, res: Response): Promise<void> {
   try {
      await logoutService(req.user!.id)

      clearAuthCookies(res)

      successResponse(res, null, 'Logged out successfully')
   } catch {
      errorResponse(res, 'Internal server error', 500)
   }
}
