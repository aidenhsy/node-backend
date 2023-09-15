import { Request, Response, Router } from 'express';
import multer from 'multer';
import OSS from 'ali-oss';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { userAttachmentIsMulti } from '../../../lib/mapping';
import convert from 'heic-convert';
import prisma from '../../../config/prisma';

const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

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
  '/upload-employee-photo',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { id, kind } = req.query;
    const imageId = nanoid();
    const imageName = `${imageId}.jpeg`;

    if (req.file) {
      // get user info
      const userRepo = await prisma.employees
      const updateUser = await userRepo.findFirst({
        where: {
          id: {
            equals: id.toString(),
          }
        }
      });
      if (!updateUser) {
        return res.status(400).json({ message: '未找到输入的员工id' });
      }
      let imageBuffer = req.file.buffer;
      if (req.file.mimetype === 'image/heic') {
        imageBuffer = await convert({
          buffer: imageBuffer, // the HEIC file buffer
          format: 'JPEG', // output format
          quality: 1, // the jpeg compression quality, between 0 and 1
        });
      }

      // image upload
      try {
        const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();
        await client.put(`employeeinfo/${imageName}`, jpegBuffer);
      } catch (err) {
        console.log('image conversion err', err);
        await client.put(`employeeinfo/${imageName}`, req.file.buffer);
      }

      //check if kind isMulti
      //if isMulti=false then check count, if count>1, delete all the attachments
      if (!userAttachmentIsMulti[`${kind}`]) {
        const count = await prisma.employee_attachments.count({
          where: {
            employee_id: { equals: id.toString() },
            kind: { equals: kind.toString() }
          }
        })
        if (count > 0) {
          await prisma.employee_attachments.deleteMany({
            where: {
              employee_id: { equals: id.toString() },
              kind: { equals: kind.toString() }
            }
          })
        }
      }
      await prisma.employee_attachments.create({
        data: {
          id: imageId,
          path: `employeeinfo/${imageName}`,
          employee_id: id.toString(),
          file_name: imageName,
          kind: kind.toString()
        }
      })
      return res.json({ path: `employeeinfo/${imageName}` });
    }
    res.status(400).json({ message: '未找到图片' });
  }
);

export { router as uploadEmployeePhotoRouter };
