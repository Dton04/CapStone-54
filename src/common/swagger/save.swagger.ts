/**
 * @swagger
 * tags:
 *   name: Save
 *   description: API để quản lý việc người dùng lưu hoặc bỏ lưu hình ảnh
 */

/**
 * @swagger
 * /api/images/{id}/saved:
 *   get:
 *     summary: Kiểm tra xem người dùng hiện tại đã lưu ảnh này chưa
 *     tags: [Save]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Kiểm tra trạng thái lưu thành công" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     isSaved: { type: boolean, example: true }
 *       401:
 *         description: Chưa đăng nhập
 */

/**
 * @swagger
 * /api/images/{id}/save:
 *   post:
 *     summary: Lưu hình ảnh vào danh sách yêu thích
 *     tags: [Save]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh cần lưu
 *     responses:
 *       201:
 *         description: Lưu ảnh thành công
 *       400:
 *         description: Ảnh đã được lưu trước đó
 *       404:
 *         description: Không tìm thấy ảnh
 * 
 *   delete:
 *     summary: Bỏ lưu hình ảnh
 *     tags: [Save]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID của ảnh cần bỏ lưu
 *     responses:
 *       200:
 *         description: Bỏ lưu ảnh thành công
 *       400:
 *         description: Người dùng chưa từng lưu ảnh này
 */

export {}
