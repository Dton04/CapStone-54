/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API để quản lý thông tin tài khoản và xem hoạt động của người dùng
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:          { type: integer, example: 1 }
 *         full_name:   { type: string, example: "Tấn Đạt" }
 *         email:       { type: string, example: "dat@gmail.com" }
 *         avatar:      { type: string, nullable: true, example: "https://cloudinary.com/avatar.jpg" }
 *         age:         { type: integer, nullable: true, example: 25 }
 *         createdAt:   { type: string, format: date-time }
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Lấy thông tin cá nhân của người dùng hiện tại
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string }
 *                 data: { $ref: '#/components/schemas/UserProfile' }
 *       401:
 *         description: Chưa đăng nhập
 * 
 *   put:
 *     summary: Cập nhật thông tin cá nhân
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name: { type: string, example: "Tên Mới" }
 *               age: { type: integer, example: 30 }
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/users/avatar:
 *   post:
 *     summary: Cập nhật ảnh đại diện (Upload lên Cloudinary)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: File ảnh avatar mới
 *     responses:
 *       200:
 *         description: Upload thành công
 *       400:
 *         description: File không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/users/{id}/created-images:
 *   get:
 *     summary: Danh sách ảnh do một người dùng cụ thể đăng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PaginationResponse' }
 */

/**
 * @swagger
 * /api/users/{id}/saved-images:
 *   get:
 *     summary: Danh sách ảnh mà một người dùng đã lưu
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PaginationResponse' }
 */

export {}
