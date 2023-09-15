import { Router } from 'express';
import { AppDataSource, Department } from '@yousico/yousi-orm';

const router = Router();

router.get('/departments', async (_req, res) => {
  try {
    const departmentRepo = await AppDataSource.getRepository(Department);
    const departments = await departmentRepo.find({
      select: {
        id: true,
        name: true,
        parent_department_id: true,
      },
    });

    const data = {};

    departments.forEach((dept: any) => {
      data[dept.id] = dept;
    });

    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      const current_id = keys[i];
      if (data[current_id].parent_department_id) {
        const current_parent_id = data[current_id].parent_department_id;
        if (data[current_parent_id] === undefined) {
          continue;
        }
        if (data[current_parent_id].children === undefined) {
          data[current_parent_id].children = [];
        }
        data[current_parent_id].children.push(data[current_id]);
      }
    }

    return res.json(data['od-6eed5b2c7fe5a4126becd35c5b66c57f']);
  } catch (err) {
    console.log(err);
  }
});

export { router as departmentsRouter };
