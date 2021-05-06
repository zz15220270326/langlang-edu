/**
 * @一级路由要自己手写
 * @OK
 */

import { gardenInitList } from './routes.js';

export function formatRoutes(routes = []) {
  const filterRoutes = routes.filter(item => item.pid === 63);

  // console.log(filterRoutes);
  filterRoutes.forEach(item => {
    const { group_id } = item;
    switch (group_id) {
      case 8:
        setChildren(gardenInitList, 1, item);
        break;
      case 9:
        setChildren(gardenInitList, 2, item);
        break;
      case 10:
        setChildren(gardenInitList, 3, item);
        break;
      case 25:
        setChildren(gardenInitList, 4, item);
        break;
      case 11:
        setChildren(gardenInitList, 5, item);
        break;
      case 12:
        setChildren(gardenInitList, 6, item);
        break;
      case 21:
        setChildren(gardenInitList, 7, item);
        break;
      case 13:
        setChildren(gardenInitList, 8, item);
        break;
      case 26:
        setChildren(gardenInitList, 9, item);
        break;
      case 15:
        setChildren(gardenInitList, 10, item);
        break;
      case 16:
        setChildren(gardenInitList, 11, item);
        break;
    }
  });
  // ? 返回过滤之后的路由
  return gardenInitList.filter((item, index) => {
    if (index === 0) {
      return item;
    } else {
      return item.children.length > 0;
    }
  });
}

function setChildren(list, idx = 0, item) {
  // ? 处理重定向
  if (!list[idx]['children'].length) {
    list[idx]['children'][0] = {
      path: '/',
      name: '',
      showName: '',
      redirect: item.name
    };
  }
  list[idx]['children'].push({
    path: item.name,
    name: item.name,
    showName: item.title,
    meta: {
      name: item.name,
      cName: item.title,
      isUsed: true
    },
    component: () => import(`HomePage/${list[idx].path}/${item.name}`),
  });
}