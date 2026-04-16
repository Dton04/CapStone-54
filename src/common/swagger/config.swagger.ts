import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application } from 'express'


const swaggerDefinition: swaggerJSDoc.OAS3Definition = {
   openapi: '3.0.0',
   info: {
      title: 'PinShare API',
      version: '1.0.0',
      description: 'Pinterest-clone REST API – Built with Express.js + Prisma + PostgreSQL',
      contact: {
         name: 'Tấn Đạt',
         url: 'https://github.com/Dton04/CapStone-54',
      },
   },
   servers: [
      {
         url: 'https://capstone-54-production.up.railway.app',
         description: 'Production Server (Railway)',
      },
      {
         url: `http://localhost:${process.env.PORT || 9090}`,
         description: 'Local Development Server',
      },
   ],
   components: {
      securitySchemes: {
         BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Nhập access_token vào đây (không cần "Bearer " prefix)',
         },
      },
      schemas: {
         SuccessResponse: {
            type: 'object',
            properties: {
               success: { type: 'boolean', example: true },
               message: { type: 'string', example: 'Success' },
               data: { type: 'object' },
            },
         },
         ErrorResponse: {
            type: 'object',
            properties: {
               success: { type: 'boolean', example: false },
               message: { type: 'string', example: 'Error message' },
            },
         },
      },
   },
   paths: {},
}

const swaggerOptions: swaggerJSDoc.Options = {
   definition: swaggerDefinition,
   apis: [
      './src/common/swagger/*.ts',
      './src/routes/*.ts'
   ],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)

/**
 * Gắn Swagger UI vào Express app
 */
export function setupSwagger(app: Application): void {
   app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
         customSiteTitle: 'PinShare API Docs',
         swaggerOptions: {
            persistAuthorization: true, // giữ token sau khi reload trang
            displayRequestDuration: true,
            filter: true,
         },
      }),
   )
}
