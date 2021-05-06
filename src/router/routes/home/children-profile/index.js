export default [{
    path: '/',
    redirect: 'BabyManage',
  },
  {
    path: 'BabyManage',
    name: 'BabyManage',
    showName: '幼儿信息',
    component: () => import('HomePage/ChildrenProfile/BabyManage')
  },
  {
    path: 'Growup',
    name: 'Growup',
    showName: '成长档案',
    component: () => import('HomePage/ChildrenProfile/Growup')
  }
];