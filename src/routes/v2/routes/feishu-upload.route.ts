import axios from 'axios';
import { Router } from 'express';
import { getToken } from '@yousico/feishu';
import multer from 'multer';

const FormData = require('form-data');
const router = Router();
const upload = multer();
router.post('/v2/feishu_upload', upload.single('file'), async (req: any, res) => {
    try {
        const buffer = Buffer.from(req.file.buffer);
        const formData = new FormData();
        formData.append('name', req.file.originalname);
        formData.append('type', 'image');
        formData.append('file', buffer, { filename: req.file.originalname });
        const headers = formData.getHeaders();
        headers['Authorization'] = `Bearer ${await getToken()}`;

        const { data } = await axios.post('https://www.feishu.cn/approval/openapi/v2/file/upload', formData, {
            headers: headers
        });
        res.status(200).json({
            code: 200,
            data: data.data,
            message: 'success'
        })
    } catch (error) {
        res.status(200).json({ status: false, message: error })
    }
});

export { router as feishuUploadRoute };
