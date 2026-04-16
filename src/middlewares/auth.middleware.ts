import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../common/helpers/jwt.helper.js'
import { responseError } from '../common/helpers/response.helper.js'

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
   let token = req.cookies?.access_token

   if (!token) {
      const authHeader = req.headers['authorization']
      if (authHeader && authHeader.startsWith('Bearer ')) {
         token = authHeader.split(' ')[1]
      }
   }

   if (!token) {
      const resp = responseError('Access token required', 401)
      res.status(resp.statusCode).json(resp)
      return
   }

   try {
      req.user = verifyAccessToken(token)
      next()
   } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
         const resp = responseError('Token expired', 401)
         res.status(resp.statusCode).json(resp)
      } else {
         const resp = responseError('Invalid token', 401)
         res.status(resp.statusCode).json(resp)
      }
   }
}
