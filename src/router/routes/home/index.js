// ? left-menu-routes
import main__Children from './main'
import childrenProfile__Children from './children-profile'
import attdance__Children from './attdance'
import classManagement__Children from './class-management'
import plan__Children from './plan'
import workerManagement__Children from './worker-management'
import gardenApprove__Children from './garden-approve'
import healthCare__Children from './health-care'
import healthBorder__Children from './health-border'
import noticeActive__Children from './notice-active'
import systemManagement__Children from './system-management'

// ? Store-Icons
import store from '@/store'
const {
  projectIcon,
  platformName
} = store.state

export default [{
    path: '/',
    redirect: 'GardenMain',
    showName: platformName,
    iconUrl: projectIcon,
  },
  // ? 1. 概况 -> Main
  {
    path: 'GardenMain',
    children: [...main__Children],
    component: () => import('HomePage/GardenMain'),
    // ? 显示名称
    showName: '概况',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-8.png'
  },
  // ? 2. 幼儿档案 -> ChildrenProfile
  {
    path: 'ChildrenProfile',
    children: [...childrenProfile__Children],
    component: () => import('HomePage/ChildrenProfile'),
    showName: '幼儿档案',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-9.png'
  },
  // ? 3. 职工管理 -> WorkerManagement
  {
    path: 'WorkerManagement',
    component: () => import('HomePage/WorkerManagement'),
    children: [...workerManagement__Children],
    showName: '职工管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-10.png'
  },
  // ? 4. 职工考勤 -> Attdance
  {
    path: 'StaffAttdence',
    component: () => import('HomePage/StaffAttdence'),
    children: [...attdance__Children],
    showName: '职工考勤',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-25.png'
  },
  // ? 5. 班级管理 -> ClassManagement
  {
    path: 'ClassManagement',
    children: [...classManagement__Children],
    component: () => import('HomePage/ClassManagement'),
    showName: '班级管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-11.png'
  },
  // ? 6. 个人计划 -> Plan
  {
    path: 'PersonalPlan',
    component: () => import('HomePage/PersonalPlan'),
    children: [...plan__Children],
    showName: '个人计划',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-12.png'
  },
  // ? 7. 园务审批 -> GardenApprove
  {
    path: 'GardenApprove',
    component: () => import('HomePage/GardenApprove'),
    children: [...gardenApprove__Children],
    showName: '园务审批',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-21.png'
  },
  // ? 8. 卫生保健 -> HealthCare
  {
    path: 'HealthCare',
    component: () => import('HomePage/HealthCare'),
    children: [...healthCare__Children],
    showName: '卫生保健',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-13.png'
  },
  // ? 9. 健康防疫 -> HealthBorder
  {
    path: 'HealthBorder',
    children: [...healthBorder__Children],
    component: () => import('HomePage/HealthBorder'),
    showName: '健康防疫',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-26.png'
  },
  // ? 10. 通知动态 -> NoticeActive
  {
    path: 'NoticeActive',
    component: () => import('HomePage/NoticeActive'),
    children: [...noticeActive__Children],
    showName: '通知动态',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-15.png'
  },
  // ? 11. 系统通知 -> SystemManagement
  {
    path: 'SystemManagement',
    component: () => import('HomePage/SystemManagement'),
    children: [...systemManagement__Children],
    showName: '系统管理',
    iconUrl: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/nav/icon-16.png'
  }
]