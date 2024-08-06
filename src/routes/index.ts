import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer'
import { uploadImage, getAssetInfo, createImageTag, fileUpload } from '../controllers/upload';
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send("GET HOMEPAGE")
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), fileUpload );

export default router;
