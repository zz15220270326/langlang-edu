export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'StaffManage',
  },
  {
    path: 'StaffManage',
    name: 'StaffManage',
    showName: '职工信息',
    component: () => import('HomePage/WorkerManagement/StaffManage')
  },
  {
    path: 'AdminRole',
    name: 'AdminRole',
    showName: '职位权限',
    component: () => import('HomePage/WorkerManagement/AdminRole')
  },
  {
    path: 'MienOfTeacher',
    name: 'MienOfTeacher',
    showName: '教师风采',
    component: () => import('HomePage/WorkerManagement/MienOfTeacher')
  }
]

// `@/${path1}/${path2}/....`