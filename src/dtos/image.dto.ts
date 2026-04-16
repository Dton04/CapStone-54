export interface PaginationDto {
   page?: string | number
   limit?: string | number
}

export interface ImageSearchDto extends PaginationDto {
   name?: string
}

export interface CreateImageDto {
   image_name: string
   description?: string
   userId: number
   fileBuffer: Buffer
}

export interface DeleteImageDto {
   imageId: number
   userId: number
}
