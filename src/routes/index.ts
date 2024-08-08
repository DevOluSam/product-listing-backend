import express from 'express';
import multer from 'multer'
import { createProduct } from '../controllers/products';
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/product/create', upload.single('image'), createProduct );

export default router; 
