export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'ManageOfAccount',
  },
  // ? 1. 账户管理
  {
    path: 'ManageOfAccount',
    name: 'ManageOfAccount',
    showName: '账户管理',
    component: () => import('HomePage/SystemManagement/ManageOfAccount')
  },
  // ? 2. 园所信息
  {
    path: 'ManageOfGarden',
    name: 'ManageOfGarden',
    showName: '园所信息',
    component: () => import('HomePage/SystemManagement/ManageOfGarden')
  },
  // ? 3. 园所风采
  {
    path: 'MienOfGarden',
    name: 'MienOfGarden',
    showName: '园所风采',
    component: () => import('HomePage/SystemManagement/MienOfGarden')
  },
  // ? 4. 硬件管理
  {
    path: 'ManageOfGardenHardware',
    name: 'ManageOfGardenHardware',
    showName: '硬件管理',
    component: () => import('HomePage/SystemManagement/ManageOfGardenHardware')
  },
  // ? 5. 园所视频
  {
    path: 'LangyunGardenVideo',
    name: 'LangyunGardenVideo',
    showName: '园所视频',
    component: () => import('HomePage/SystemManagement/LangyunGardenVideo')
  },
  // ? 6. 基础设置
  {
    path: 'gardenSet',
    name: 'gardenSet',
    showName: '基础设置',
    component: () => import('HomePage/SystemManagement/gardenSet')
  }
]