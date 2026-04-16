import { Response } from 'express'

// ─── Success ─────────────────────────────────────────────────────────────────

export function successResponse<T>(
   res: Response,
   data: T,
   message = 'Success',
   statusCode = 200,
): void {
   res.status(statusCode).json({
      success: true,
      message,
      data,
   })
}

// ─── Error ────────────────────────────────────────────────────────────────────

export function errorResponse(
   res: Response,
   message = 'Internal server error',
   statusCode = 500,
): void {
   res.status(statusCode).json({
      success: false,
      message,
   })
}

// ─── Validation error ────────────────────────────────────────────────────────

export function validationError(res: Response, message: string): void {
   errorResponse(res, message, 400)
}
