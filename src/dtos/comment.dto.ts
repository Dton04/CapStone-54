export interface CreateCommentDto {
   content: string
   imageId: number
   userId: number
}

export interface DeleteCommentDto {
   commentId: number
   userId: number
}
