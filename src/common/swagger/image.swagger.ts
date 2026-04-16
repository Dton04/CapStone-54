/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API để quản lý và hiển thị ảnh
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ImageModel:
 *       type: object
 *       properties:
 *         id:          { type: integer, example: 1 }
 *         image_name:  { type: string, example: "Hoàng hôn trên biển" }
 *         url:         { type: string, example: "https://example.com/sunset.jpg" }
 *         created_at:  { type: string, format: date-time }
 *         user:
 *           type: object
 *           properties:
 *             id:        { type: integer, example: 3 }
 *             full_name: { type: string, example: "Tấn Đạt" }
 *             avatar:    { type: string, nullable: true, example: null }
 *
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:        { type: integer, example: 1 }
 *         limit:       { type: integer, example: 10 }
 *         total_items: { type: integer, example: 45 }
 *         total_pages: { type: integer, example: 5 }
 *
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string, example: "Success" }
 *         data:
 *           type: object
 *           properties:
 *             images:
 *               type: array
 *               items: { $ref: '#/components/schemas/ImageModel' }
 *             pagination: { $ref: '#/components/schemas/PaginationMeta' }
 */

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Lấy danh sách ảnh (Hỗ trợ phân trang và tìm kiếm theo tên)
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *         description: Tên ảnh cần tìm kiếm (bỏ trống nếu muốn xem tất cả)
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Số trang hiện tại
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Số lượng item trên một trang
 *     responses:
 *       200:
 *         description: Trả về danh sách ảnh
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PaginationResponse' }
 *       500:
 *         description: Lỗi máy chủ
 * 
 *   post:
 *     summary: Upload ảnh mới lên Cloudinary
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image_name
 *               - file
 *             properties:
 *               image_name:
 *                 type: string
 *                 description: Tên hiển thị của ảnh
 *               description:
 *                 type: string
 *                 description: Mô tả chi tiết (không bắt buộc)
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File ảnh tải lên
 *     responses:
 *       201:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Upload ảnh thành công" }
 *                 data: { $ref: '#/components/schemas/ImageModel' }
 *       400:
 *         description: Yêu cầu file hoặc tên không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Lấy chi tiết một ảnh bằng ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Chi tiết ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy chi tiết ảnh thành công" }
 *                 data:
 *                   $ref: '#/components/schemas/ImageModel'
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy ảnh
 * 
 *   delete:
 *     summary: Xóa ảnh đã đăng (Chỉ cho phép người tạo tự xóa)
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh cần xóa
 *     responses:
 *       200:
 *         description: Xóa ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Xoá ảnh thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedId: { type: integer, example: 1 }
 *       403:
 *         description: Không có quyền xóa (không phải người tạo)
 *       404:
 *         description: Không tìm thấy ảnh
 */

// File này chỉ để Swagger JSDoc parse
export {}
