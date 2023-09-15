import { Request, Response, Router } from 'express';
import { feishu, feishuTokenAttach } from '../../../api/feishu';
import prisma from '../../../config/prisma';

const router = Router();
const approvalCode = {
    '入职审批': '20122797-D0CA-4343-9132-440AF7164FE6',
    '离职审批': '9CF7DFD1-3166-4EDF-932F-14408986743C'
}

// 飞书审批-入职申请流程-通过/拒绝事件监听
// approval_code  20122797-D0CA-4343-9132-440AF7164FE6
router.post('/feishu-approval-instance', async (req: Request, res: Response) => {
    const { challenge, event } = req.body
    await feishuTokenAttach()
    try {
        if (event.type === 'approval_instance') {
            const { status, approval_code, instance_code } = req.body.event
            if (!Object.values(approvalCode).includes(approval_code) || status === 'PENDING') {
                return
            }
            const { data } = await feishu.get(`/approval/v4/instances/${instance_code}`);
            const { form, task_list } = data.data
            if (approval_code === '20122797-D0CA-4343-9132-440AF7164FE6') {
                let id_number = null // 入职人员身份证
                JSON.parse(form).forEach((item) => {
                    // 获取审批实例人员信息
                    if (item.custom_id === 'id_number') {
                        id_number = item.value
                    }
                })
                const employee = await prisma.employees.findFirst({
                    where: {
                        id_number: {
                            equals: id_number
                        }
                    }
                })
                const taksList = task_list.filter((one) => one.custom_node_id === 'hr_approval_review')
                const approval = taksList[taksList.length - 1]
                // 6 审核通过必要信息未填写 9 人事审核拒绝
                await prisma.employees.updateMany({
                    where: {
                        id_number: {
                            equals: id_number
                        }
                    },
                    data: {
                        status: approval?.status === 'APPROVED' ? 6 : approval?.status === 'REJECTED' ? 9 : employee.status
                    }
                })
                return
            } else if (approval_code === '9CF7DFD1-3166-4EDF-932F-14408986743C') {
                let name = null
                let department_id = null
                JSON.parse(form).forEach((item) => {
                    // 获取审批实例人员信息
                    if (item.custom_id === 'name') {
                        name = item.value
                    } else if (item.custom_id === 'department') {
                        department_id = item.value[0]?.open_id
                    }
                })

                const employee = await prisma.employees.findFirst({
                    where: {
                        name: {
                            equals: name
                        },
                        status: {
                            equals: 4
                        },
                        department_id: {
                            equals: department_id
                        }
                    }
                })
                const taksList = task_list.filter((one) => one.custom_node_id === 'hr_approval')
                const approval = taksList[taksList.length - 1]
                await prisma.employees.updateMany({
                    where: {
                        name: {
                            equals: name
                        },
                        status: {
                            equals: 4
                        },
                        department_id: {
                            equals: department_id
                        }
                    },
                    data: {
                        status: approval?.status === 'APPROVED' ? 5 : employee.status
                    }
                })
                return
            }

        }
    } catch (error) {
        console.log(error)
    } finally {
        //当请求地址收到开放平台推送的 POST 验证请求时，需要解析出 challenge 值，并在 1 秒内原样返回该值作为响应。 
        res.status(200).send({ challenge });
    }
});

export { router as feishuApprovalInstanceRoute };
