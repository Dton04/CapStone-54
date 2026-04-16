// pagination.helper.ts
export const getPaginationOptions = (pageStr?: string | number, limitStr?: string | number) => {
   const page = Number(pageStr) || 1
   const limit = Number(limitStr) || 10
   const skip = (page - 1) * limit

   return { page, limit, skip }
}

export const getPaginationResult = (data: any[], totalItems: number, page: number, limit: number) => {
   return {
      items: data,
      pagination: {
         page,
         limit,
         total_items: totalItems,
         total_pages: Math.ceil(totalItems / limit),
      }
   }
}
