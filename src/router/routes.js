import userChildren from './routes/user';

import User from '@/views/user';
import Page404 from '@/views/error/404';

// ? 静态路由
const constantRoutes = [
  // ? constant
  // {
  //   path: '/',
  //   redirect: '/user'
  // },
  {
    // ? User-page
    path: '/user',
    component: User,
    children: [...userChildren]
  },
  // ? 跳转首页 (权限路由)
  {
    // ? 设置404页面
    path: '/404',
    name: 'notFound',
    component: Page404
  },
  {
    // 3.2.0
    // ? 其他不存在的路由 (404)
    path: '*',
    redirect: '/404',
    hidden: true
  },
];
// ? 园所内的路由
const gardenInitList = [
  {
    path: '/',
    showName: '朗云幼教智慧管理平台',
    iconUrl: require('@/assets/images/garden/garden.png'),
    redirect: 'GardenMain',
  },
  {
    path: 'GardenMain',
    showName: '概况',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-8.png',
    component: () => import(`HomePage/GardenMain`)
  },
  {
    path: 'ChildrenProfile',
    showName: '幼儿档案',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-9.png',
    component: () => import(`HomePage/ChildrenProfile`)
  },
  {
    path: 'WorkerManagement',
    showName: '职工管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-10.png',
    component: () => import(`HomePage/WorkerManagement`)
  },
  {
    path: 'StaffAttdence',
    showName: '职工考勤',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-25.png',
    component: () => import(`HomePage/StaffAttdence`)
  },
  {
    path: 'ClassManagement',
    showName: '班级管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-11.png',
    component: () => import(`HomePage/ClassManagement`)
  },
  {
    path: 'PersonalPlan',
    showName: '个人计划',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-12.png',
    component: () => import(`HomePage/PersonalPlan`)
  },
  {
    path: 'GardenApprove',
    showName: '园务审批',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-21.png',
    component: () => import(`HomePage/GardenApprove`)
  },
  {
    path: 'HealthCare',
    showName: '卫生保健',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-13.png',
    component: () => import(`HomePage/HealthCare`)
  },
  {
    path: 'HealthBorder',
    showName: '健康防疫',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-26.png',
    component: () => import(`HomePage/HealthBorder`)
  },
  {
    path: 'NoticeActive',
    showName: '通知动态',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-15.png',
    component: () => import(`HomePage/NoticeActive`)
  },
  {
    path: 'SystemManagement',
    showName: '系统管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-16.png',
    component: () => import(`HomePage/SystemManagement`)
  },
];

/**
 * @GroupId
 * ! 概况 8 
 * ! 幼儿档案 9
 * ! 职工管理 10
 * ! 职工考勤 25
 * ! 班级管理 11
 * ! 个人计划 12
 * ! 园务审批 21
 * ! 卫生保健 13
 * ! 健康防疫 26
 * ! 通知动态 15
 * ! 系统管理 16
 */
gardenInitList.forEach(item => item.children = []);

export {
  constantRoutes,
  gardenInitList
};