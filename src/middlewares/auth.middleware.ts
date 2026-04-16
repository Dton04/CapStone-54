import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../common/helpers/jwt.helper.js'
import { errorResponse } from '../common/helpers/response.helper.js'

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
   const authHeader = req.headers['authorization']

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      errorResponse(res, 'Access token required', 401)
      return
   }

   const token = authHeader.split(' ')[1]

   try {
      req.user = verifyAccessToken(token)
      next()
   } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
         errorResponse(res, 'Token expired', 401)
      } else {
         errorResponse(res, 'Invalid token', 401)
      }
   }
}
