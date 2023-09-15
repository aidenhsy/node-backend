import { Router } from 'express';
import prisma from '../../../../config/prisma';

const router = Router();

router.post('/v1/hr/verifyfields', async (req, res) => {
  const { input } = req.body;
  const limit = input?.limit !== undefined ? Number(input.limit) : undefined;
  const offset = input?.offset !== undefined ? Number(input.offset) : undefined;

  const employees: any = await prisma.$queryRaw`
SELECT employees.*, 
       ARRAY(
               SELECT employee_attachments.kind
               FROM employee_attachments
               WHERE employee_attachments.employee_id = employees.id
           ) as attachment_kinds
FROM employees
WHERE 
  (
    (
        id_number IS NULL
        OR LENGTH(id_number) != 18
        OR bank_account_number IS NULL
        OR bank_name IS NULL
        OR basic_salary IS NULL
        OR salary_type IS NULL
        OR salary_type NOT IN ('日薪', '月薪', '时薪')
    )
    OR
    (
        NOT EXISTS(
            SELECT 1
            FROM employee_attachments
            WHERE employee_attachments.employee_id = employees.id
            AND (
                    employee_attachments.kind != 'id_photo_em_side'
                OR  employee_attachments.kind != 'id_photo_po_side'
            )
        )
    )
  )
  AND 
  EXISTS(
    SELECT 1
    FROM attendance
    WHERE attendance.employee_id = employees.id
  )
LIMIT ${limit} OFFSET ${offset};
  `;

  for (const employee of employees) {
    const {
      id_number,
      bank_account_number,
      basic_salary,
      salary_type,
      bank_name,
      attachment_kinds,
    } = employee;

    const type: string[] = [
      !id_number
        ? '身份证号码为空'
        : id_number.length !== 18
          ? '身份证号码长度不等于18'
          : null,

      !bank_name ? '银行名称空' : null,
      !bank_account_number ? '银行卡号空' : null,

      !basic_salary ? '基本工资空' : null,

      !salary_type
        ? '薪资类型空'
        : salary_type !== '日薪' &&
        salary_type !== '时薪' &&
        salary_type !== '月薪' &&
        '薪资类型不正确',
    ].filter(Boolean); // This will remove falsey values

    // Check for the existence of each attachment type separately
    if (!attachment_kinds.includes('id_photo_em_side')) {
      type.push('缺少身份证照片（国徽面）');
    }

    if (!attachment_kinds.includes('id_photo_po_side')) {
      type.push('缺少身份证照片（人像面）');
    }

    employee['types'] = type;
  }

  res.json(employees);
});

export { router as verifyFieldsRouter };
