import { Router } from 'express';
import { pgSql } from '../../../config/db';
import { currentUser, requireAuth } from '@yousico/common';

const router = Router();

router.post('/v3/navitems', currentUser, requireAuth, async (req, res) => {
  const { resolvedUrl } = req.body;
  const sql = `
  SELECT 
    nsc.id AS nsc_id,
    nsc.name AS nsc_name,
    nsc_distinct.url AS nsc_url,
    nsc.side_nav_visible as nsc_side_nav_visible,
    nbc.id AS nbc_id,
    nbc.name AS nbc_name,
    nxl.name AS nxl_name,
    nxl.url AS nav_xl_url,
    nxl.id AS nxl_id
  FROM (
    SELECT DISTINCT nsc.url
    FROM employees
      JOIN employees_roles ON employees.id = employees_roles.employee_id
      JOIN role_nav_sm_categories rns ON employees_roles.role_id = rns.role_id
      JOIN nav_sm_categories nsc ON rns.nav_sm_category_id = nsc.id
    WHERE employees.id = $1
  ) AS nsc_distinct
  JOIN nav_sm_categories nsc ON nsc_distinct.url = nsc.url
  JOIN nav_bg_categories nbc ON nsc.nav_bg_categories_id = nbc.id
  JOIN nav_xl_categories nxc ON nbc.nav_xl_categories_id = nxc.id
  JOIN nav_xl_categories nxl ON nxc.id = nxl.id;
`;

  const { rows: response } = await pgSql.query(sql, [req.currentUser.id]);

  console.log(req.currentUser.id);

  const uniqueXls = [];

  response.forEach((item) => {
    const nxlIndex = uniqueXls.findIndex((x) => x.nxl_name === item.nxl_name);
    if (nxlIndex === -1) {
      uniqueXls.push({
        nxl_name: item.nxl_name,
        nav_xl_url: item.nav_xl_url,
        nxl_id: item.nxl_id,
        nbc: [
          {
            label: item.nbc_name,
            key: item.nbc_name,
            children: [
              {
                label: item.nsc_name,
                key: item.nsc_name,
                url: item.nsc_url,
                side_nav_visible: item.nsc_side_nav_visible,
              },
            ],
          },
        ],
      });
    } else {
      const existingNbc = uniqueXls[nxlIndex].nbc.find(
        (x) => x.label === item.nbc_name
      );
      if (!existingNbc) {
        uniqueXls[nxlIndex].nbc.push({
          label: item.nbc_name,
          key: item.nbc_name,
          children: [
            {
              label: item.nsc_name,
              key: item.nsc_name,
              url: item.nsc_url,
              side_nav_visible: item.nsc_side_nav_visible,
            },
          ],
        });
      } else {
        existingNbc.children.push({
          label: item.nsc_name,
          key: item.nsc_name,
          url: item.nsc_url,
          side_nav_visible: item.nsc_side_nav_visible,
        });
      }
    }
  });

  const currentNav = response.find((item) => item.nsc_url === resolvedUrl);

  res.status(200).json({
    navItems: uniqueXls,

    currentNav: currentNav
      ? currentNav
      : {
          ...response.find((item) => item.nav_xl_url === resolvedUrl),
          nbc_name: null,
          nsc_name: null,
          nxl_name:
            resolvedUrl === '/dashboard'
              ? '控制板'
              : response.find((item) => item.nav_xl_url === resolvedUrl)
                  ?.nxl_name,
        },
    userInfo: req.currentUser,
  });
});

export { router as navItemsRouterV3 };
