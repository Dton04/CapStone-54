import { Request, Response, NextFunction } from 'express'
import { responseSuccess, responseError } from '../common/helpers/response.helper.js'
import { prisma } from '../common/prisma/connect.prisma.js'

export const commentService = {
   async findAll(id: number) {
      const comments = await prisma.comment.findMany({
         where: {
            image_id: id
         }
      })
      return comments
   }
}