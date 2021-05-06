export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'NoticeOfGarden',
  },
  // ? 1. 园务通知
  {
    path: 'NoticeOfGarden',
    name: 'NoticeOfGarden',
    showName: '园务通知',
    component: () => import('HomePage/NoticeActive/NoticeOfGarden')
  },
  // ? 2. 园内通知
  {
    path: 'NoticeOfGardenIncludeParents',
    name: 'NoticeOfGardenIncludeParents',
    showName: '园内通知',
    component: () => import('HomePage/NoticeActive/NoticeOfGardenIncludeParents')
  },
  // ? 3. 班级通知
  {
    path: 'NoticeOfClass',
    name: 'NoticeOfClass',
    showName: '班级通知',
    component: () => import('HomePage/NoticeActive/NoticeOfClass')
  },
  // ? 4. 主管部门
  {
    path: 'NoticeOfEdubureauOfGarden',
    name: 'NoticeOfEdubureauOfGarden',
    showName: '主管部门通知',
    component: () => import('HomePage/NoticeActive/NoticeOfEdubureauOfGarden')
  },
  // ? 5. 系统消息
  {
    path: 'NoticeOfSystem',
    name: 'NoticeOfSystem',
    showName: '系统消息',
    component: () => import('HomePage/NoticeActive/NoticeOfSystem')
  },
  // ? 6. 院所动态
  {
    path: 'gardenDynamics',
    name: 'gardenDynamics',
    showName: '园所动态',
    component: () => import('HomePage/NoticeActive/gardenDynamics')
  }
]