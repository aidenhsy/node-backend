import { Router } from 'express';
import prisma from '../../../config/prisma';

const router = Router();

// router.get('/v1/store-dept-tree', async (req, res) => {
//   const brands = await prisma.brands.findMany({
//     where: {
//       status: 2,
//       is_operation: true,
//     },
//     select: {
//       department_id: true,
//       name: true,
//     },
//   });
//   for (let brand of brands) {
//     const stores = await prisma.departments.findMany({
//       where: { parent_department_id: brand.department_id },
//       select: { id: true, name: true },
//     });
//     for (let store of stores) {
//       const children = await prisma.departments.findMany({
//         where: { parent_department_id: store.id },
//         select: { id: true, name: true },
//       });
//       if (children.length > 0) {
//         store['children'] = children;
//       }
//     }
//     brand['children'] = stores;
//   }
//   console.log(JSON.stringify(brands, null, 2));
//   res.send(brands);
// });

router.post('/v1/store-dept-tree', async (req, res) => {
  try {
    const brands = await prisma.brands.findMany({
      where: {
        status: 2,
        is_operation: true,
      },
      select: {
        id: true,
        department_id: true,
        name: true,
      },
    });

    const departmentIdsForBrands = brands.map((b) => b.id);

    const stores = await prisma.stores.findMany({
      where: { brand_id: { in: departmentIdsForBrands }, status: 2 },
      select: {
        id: true,
        name: true,
        departments_stores: {
          select: {
            departments: true,
          },
        },
        brand_id: true,
      },
    });

    const result = brands.map((brand) => ({
      value: brand.id,
      title: brand.name,
      is_dept: false,
      children: stores
        .filter((store) => store.brand_id === brand.id)
        .map((store) => ({
          value: store.id,
          title: store.name,
          is_dept: false,
          children: store.departments_stores.map((d) => ({
            value: d.departments.id,
            title: d.departments.name,
            is_dept: true,
          })),
        })),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching store dept tree:', error);
    res.status(500).send('Internal server error');
  }
});

export { router as storeDepartmentTreeRouter };
