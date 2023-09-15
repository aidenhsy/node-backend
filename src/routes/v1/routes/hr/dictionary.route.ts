import { Router } from 'express';
import { hrDictionary, hrKeyReverse } from '../../../../lib/mapping';
import { AppDataSource, Department, Employee } from '@yousico/yousi-orm';

const router = Router();

router.get('/hr/dictionary', async (_req, res) => {
  const departments = await AppDataSource.getRepository(Department).find({
    select: ['id', 'name'],
  });
  const managers = await AppDataSource.getRepository(Employee).find({
    select: ['id', 'name'],
  });

  const departmentValues = departments.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  const managerValues = managers.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  res.json({
    hrDictionary: {
      ...hrDictionary,
      department_id: { label: '部门', values: departmentValues },
      manager: { label: '直属上级', values: managerValues },
    },
    hrKeyReverse,
  });
});

export { router as hrDictionaryRouter };
