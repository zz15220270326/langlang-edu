export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'InfantDailyHealth'
  },
  // ? 1. 幼儿日常保健
  {
    path: 'InfantDailyHealth',
    name: 'InfantDailyHealth',
    showName: '幼儿日常保健',
    component: () => import('HomePage/HealthBorder/InfantDailyHealth')
  },
  // ? 2. 人脸测温记录
  {
    path: 'FaceTemperatureRecord',
    name: 'FaceTemperatureRecord',
    showName: '人脸测温记录',
    component: () => import('HomePage/HealthBorder/FaceTemperatureRecord')
  },
  // ? 3. 职工健康管理
  {
    path: 'StaffHealthRecords',
    name: 'StaffHealthRecords',
    showName: '职工健康管理',
    component: () => import('HomePage/HealthBorder/StaffHealthRecords')
  },
]