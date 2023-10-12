import multer from 'multer';
import { env } from '../utils/helper.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, env.UPLOAD_MULTER);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
export default upload;
