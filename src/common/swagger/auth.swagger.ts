/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication – Register, Login, Refresh Token, Logout
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterBody:
 *       type: object
 *       required: [full_name, email, password]
 *       properties:
 *         full_name:
 *           type: string
 *           example: TanDatDZ
 *         email:
 *           type: string
 *           format: email
 *           example: dat@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password123@
 *         age:
 *           type: integer
 *           example: 25
 *
 *     LoginBody:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: dat@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password123@
 *
 *     RefreshTokenBody:
 *       type: object
 *       required: [refresh_token]
 *       properties:
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:           { type: integer, example: 1 }
 *         full_name:    { type: string, example: TanDatDZ }
 *         email:        { type: string, example: dat@gmail.com }
 *         avatar:       { type: string, nullable: true, example: null }
 *         age:          { type: integer, nullable: true, example: 25 }
 *         createdAt:    { type: string, format: date-time }
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:       { type: boolean, example: true }
 *         message:       { type: string, example: Login successful }
 *         data:
 *           type: object
 *           properties:
 *             user:          { $ref: '#/components/schemas/UserProfile' }
 *             access_token:  { type: string }
 *             refresh_token: { type: string }
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterBody'
 *     responses:
 *       201:
 *         description: Đăng ký thành công – trả về user info + JWT tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Thiếu trường bắt buộc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập – (JWT được lưu trong HttpOnly Cookies)
 *     description: >
 *       Xác thực người dùng và trả về access token + refresh token thông qua HttpOnly cookies.
 *       Client không cần lưu token trong localStorage.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Thiếu email hoặc password
 *       401:
 *         description: Sai email hoặc password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Làm mới Access Token bằng Refresh Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenBody'
 *     responses:
 *       200:
 *         description: Access token mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Token refreshed }
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token: { type: string }
 *       401:
 *         description: Refresh token không hợp lệ hoặc đã hết hạn
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất – vô hiệu hóa Refresh Token
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Logged out successfully }
 *                 data:    { type: 'null', example: null }
 *       401:
 *         description: Chưa đăng nhập hoặc token hết hạn
 */

// File này chỉ chứa Swagger JSDoc comments – không export code
export { }
