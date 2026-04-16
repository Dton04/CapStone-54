import { Request, Response } from 'express'
import {
   registerService,
   loginService,
   refreshTokenService,
   logoutService,
} from '../services/auth.service.js'
import {
   responseSuccess,
   responseError,
} from '../common/helpers/response.helper.js'
import type { RegisterDto, LoginDto, RefreshTokenDto } from '../dtos/auth.dto.js'
import { setAuthCookies, clearAuthCookies } from '../common/helpers/cookie.helper.js'


export async function register(req: Request, res: Response): Promise<void> {
   try {
      const { full_name, email, password, age }: RegisterDto = req.body

      if (!full_name || !email || !password) {
         const resp = responseError('full_name, email and password are required', 400)
         res.status(resp.statusCode).json(resp)
         return
      }

      const result = await registerService({ full_name, email, password, age })

      // Set cookies
      setAuthCookies(res, result.accessToken, result.refreshToken)

      const resp = responseSuccess({ user: result.user }, 'User registered successfully', 201)
      res.status(resp.statusCode).json(resp)
   } catch (error: any) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
         const resp = responseError('Email already exists', 409)
         res.status(resp.statusCode).json(resp)
      } else {
         const resp = responseError('Internal server error', 500)
         res.status(resp.statusCode).json(resp)
      }
   }
}


export async function login(req: Request, res: Response): Promise<void> {
   try {
      const { email, password }: LoginDto = req.body

      if (!email || !password) {
         const resp = responseError('Email and password are required', 400)
         res.status(resp.statusCode).json(resp)
         return
      }

      const result = await loginService({ email, password })

      // Set cookies
      setAuthCookies(res, result.accessToken, result.refreshToken)

      const resp = responseSuccess({ user: result.user }, 'Login successful')
      res.status(resp.statusCode).json(resp)
   } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
         const resp = responseError('Invalid email or password', 401)
         res.status(resp.statusCode).json(resp)
      } else {
         const resp = responseError('Internal server error', 500)
         res.status(resp.statusCode).json(resp)
      }
   }
}

export async function refresh(req: Request, res: Response): Promise<void> {
   try {
      const refresh_token = req.cookies?.refresh_token || (req.body as RefreshTokenDto).refresh_token

      if (!refresh_token) {
         const resp = responseError('refresh_token is required', 400)
         res.status(resp.statusCode).json(resp)
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

      const resp = responseSuccess(null, 'Token refreshed')
      res.status(resp.statusCode).json(resp)
   } catch {
      const resp = responseError('Invalid or expired refresh token', 401)
      res.status(resp.statusCode).json(resp)
   }
}


export async function logout(req: Request, res: Response): Promise<void> {
   try {
      await logoutService(req.user!.id)

      clearAuthCookies(res)

      const resp = responseSuccess(null, 'Logged out successfully')
      res.status(resp.statusCode).json(resp)
   } catch {
      const resp = responseError('Internal server error', 500)
      res.status(resp.statusCode).json(resp)
   }
}
