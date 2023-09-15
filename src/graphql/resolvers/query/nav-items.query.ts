import { NavXlCategory, Resolvers } from '../../codegen/__generated__/graphql';
import { AppDataSource, NavSmCategory } from '@yousico/yousi-orm';
import { unauthorizedError } from '@yousico/common';

export const naviQueryResolvers: Resolvers = {
  Query: {
    navTree: async (_root: any, input: any, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const navs = await AppDataSource.getRepository(NavSmCategory).find({
        relations: ['nav_bg_category', 'nav_bg_category.nav_xl_category'],
      });
      const transformedNavs = transformData(navs);
      return transformedNavs as NavXlCategory[];
    },
  },
};

export const transformData = (data) => {
  // Initialize an empty map to hold nav_xl_category items
  const map = {};

  // Iterate over each item in the original data
  data.forEach((item) => {
    const navXlCategory = item.nav_bg_category.nav_xl_category;
    const navBgCategory = item.nav_bg_category;

    // Create new nav_xl_category if it does not exist in the map
    if (!map[navXlCategory.id]) {
      map[navXlCategory.id] = {
        id: navXlCategory.id,
        key: navXlCategory.id.toString(),
        title: navXlCategory.name,
        url: navXlCategory.url,
        children: [],
      };
    }

    // Look for existing nav_bg_category under the current nav_xl_category
    let navBgCategoryEntry = map[navXlCategory.id].children.find(
      (nbc) => nbc.id === navBgCategory.id
    );

    // If nav_bg_category does not exist, create new entry and add it to the children array of current nav_xl_category
    if (!navBgCategoryEntry) {
      navBgCategoryEntry = {
        id: navBgCategory.id,
        key: navBgCategory.id.toString(),
        title: navBgCategory.name,
        nav_xl_categories_id: navBgCategory.nav_xl_categories_id,
        children: [],
      };
      map[navXlCategory.id].children.push(navBgCategoryEntry);
    }

    // Add the current item to the children array of the current nav_bg_category
    navBgCategoryEntry.children.push({
      id: item.id,
      key: item.id.toString(),
      title: item.name,
      url: item.url,
    });
  });

  // Convert the map into an array and return it
  return Object.values(map);
};
