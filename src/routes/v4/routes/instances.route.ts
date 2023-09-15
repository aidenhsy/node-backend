import { Request, Response, Router } from 'express';
import { feishu, feishuTokenAttach } from '../../../api/feishu';

const router = Router();

// 发起入职审批
router.post('/new-approval-instances', async (req: Request, res: Response) => {
    const { form, approval_code, open_id, approval } = req.body;
    await feishuTokenAttach()
    try {
        const { data } = await feishu.post('/approval/v4/instances', {
            approval_code,
            open_id,
            form: JSON.stringify(form),
            node_approver_open_id_list: [
                {
                    key: "submit_approver",
                    value: [
                        open_id
                    ]
                },
                {
                    key: "hr_approval",
                    value: [
                        approval
                    ]
                },
                {
                    key: "whether_to_work",
                    value: [
                        open_id
                    ]
                },
                {
                    key: "hr_approval_review",
                    value: [
                        approval
                    ]
                },

            ],

        });
        res.status(200).json({
            code: 200,
            data: data.data.instance_code,
            message: 'success'
        })
    } catch (error) {
        res.status(200).json({
            code: 200,
            status: false,
            message: 'An error occurred',
        });
    }
});

// 发起离职审批
router.post('/new-resign-approval-instances', async (req: Request, res: Response) => {
    const { form, approval_code, open_id, approver } = req.body;
    await feishuTokenAttach()
    try {
        const { data } = await feishu.post('/approval/v4/instances', {
            approval_code,
            open_id,
            form: JSON.stringify(form),
            node_approver_open_id_list: [
                {
                    key: "submit_approver",
                    value: [
                        open_id
                    ]
                },
                {
                    key: "hr_approval",
                    value: [
                        approver
                    ]
                }
            ],
        });
        res.status(200).json({
            code: 200,
            data: data.data.instance_code,
            message: 'success'
        })
    } catch (error) {
        res.status(200).json({
            code: 200,
            status: false,
            message: 'An error occurred',
        });
    }
});


export { router as newInstancesRoute };
