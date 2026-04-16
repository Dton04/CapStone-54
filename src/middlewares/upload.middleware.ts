import multer from 'multer'

// Sử dụng memoryStorage để đưa buffer vào xử lý (upload stream) thay vì lưu file ra ổ cứng
const storage = multer.memoryStorage()

export const uploadConfig = multer({ 
   storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
   fileFilter: (req, file, cb) => {
      // Chỉ cho phép định dạng ảnh
      if (file.mimetype.startsWith('image/')) {
         cb(null, true)
      } else {
         cb(new Error('INVALID_FILE_TYPE'))
      }
   }
})
