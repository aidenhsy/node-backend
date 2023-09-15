import { Request, Response, Router } from 'express';
import multer from 'multer';
import OSS from 'ali-oss';
import dotenv from 'dotenv';

dotenv.config({ path: '/var/www/yousi-my/back/.env' });
const router = Router();

// 初始化 OSS Client
let client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: `${process.env.OSS_ACCESSKEYID}`,
  accessKeySecret: `${process.env.OSS_ACCESSKEYSECRET}`,
  bucket: 'yousi-shanghai',
});

const upload = multer();
router.post(
  '/upload-photo',
  upload.single('image'),
  async (req: Request, res: Response) => {
    if (req.file) {
      console.log(req.file.buffer);
      await client.put('employeeinfo/asdf.jpeg', req.file.buffer);
    }
    res.send('success');
  }
);

export { router as uploadRouter };
