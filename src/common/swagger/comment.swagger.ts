/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API để quản lý và hiển thị bình luận của hình ảnh
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentModel:
 *       type: object
 *       properties:
 *         id:          { type: integer, example: 1 }
 *         content:     { type: string, example: "Ảnh đẹp quá bạn ơi!" }
 *         createdAt:   { type: string, format: date-time }
 *         updatedAt:   { type: string, format: date-time }
 *         user:
 *           type: object
 *           properties:
 *             id:        { type: integer, example: 3 }
 *             full_name: { type: string, example: "Tấn Đạt" }
 *             avatar:    { type: string, nullable: true, example: null }
 */

/**
 * @swagger
 * /api/images/{id}/comments:
 *   get:
 *     summary: Lấy danh sách bình luận của một ảnh
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Lấy danh sách bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Lấy danh sách bình luận thành công" }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/CommentModel' }
 *       400:
 *         description: ID ảnh không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 * 
 *   post:
 *     summary: Đăng bình luận mới cho ảnh
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Wow đẹp tuyệt vời!"
 *                 description: Nội dung bình luận
 *     responses:
 *       201:
 *         description: Bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Bình luận thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: integer }
 *                     content: { type: string }
 *                     createdAt: { type: string, format: date-time }
 *                     user:
 *                       type: object
 *                       properties:
 *                         id: { type: integer }
 *                         full_name: { type: string }
 *                         avatar: { type: string, nullable: true }
 *       400:
 *         description: Nội dung bình luận bị bỏ trống
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy ảnh
 */

/**
 * @swagger
 * /api/images/{id}/comments/{commentId}:
 *   delete:
 *     summary: Xóa bình luận (Chỉ cho phép chủ sở hữu bình luận xóa)
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema: { type: integer }
 *         description: ID của bình luận cần xóa
 *     responses:
 *       200:
 *         description: Xóa bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Xoá bình luận thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedId: { type: integer, example: 1 }
 *       403:
 *         description: Không có quyền xóa
 *       404:
 *         description: Không tìm thấy bình luận
 */

export {}
