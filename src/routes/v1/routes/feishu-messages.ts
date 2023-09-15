import { Request, Response, Router } from 'express';
import { feishu, feishuTokenAttach } from '../../../api/feishu';

const router = Router();

router.post(
    '/v1/feishu-messages',
    async (req: Request, res: Response) => {
        await feishuTokenAttach()
        try {
            const { receive_id_type, receive_id, msg_type, content } = req.body
            console.log(req.body)
            const { data } = await feishu.post(`/im/v1/messages?receive_id_type=${receive_id_type}`, {
                receive_id,
                msg_type,
                content: JSON.stringify(content)
            })
            if (data?.msg === 'success') {
                res.status(200).json({ message: 'success', status: true })
            } else {
                res.status(200).json({ message: 'error', status: false })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'something went wrong' });
        }
    }
);

export { router as feishuMessages };
