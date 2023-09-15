import axios from 'axios';
import { Router } from 'express';
import { feishuTokenAttach, feishu } from '../../../api/feishu';

const router = Router();

router.get('/v4/approvals', async (req: any, res) => {
    await feishuTokenAttach()
    const { definitionCode } = req.query
    try {
        const response = await feishu.get(`/approval/v4/approvals/${definitionCode}?locale=zh-CN`);
        const { data } = response
        const dataSource = []
        JSON.parse(data?.data?.form).forEach(({ type, id, option, custom_id }) => {
            dataSource.push({
                id,
                type,
                ...(option !== undefined && { option }),
                ...(custom_id !== undefined && { custom_id })
            })
        })
        res.status(200).json({
            code: 200,
            data: dataSource,
            message: 'success'
        })
    } catch (error) {
        res.status(400).json({ code: 400, data: null, message: 'An error occurred' })
    }

});

export { router as approvalsRoute };
