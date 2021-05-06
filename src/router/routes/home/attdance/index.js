export default [{
    // ? 默认跳转到全员考勤报表
    path: '/',
    name: '',
    showName: '',
    redirect: 'TeacherCheckingReport',
  },
  {
    path: 'TeacherCheckingReport',
    name: 'TeacherCheckingReport',
    showName: '全员报表',
    component: () => import('HomePage/StaffAttdence/TeacherCheckingReport')
  },
  {
    path: 'TeacherCheckingOne',
    name: 'TeacherCheckingOne',
    showName: '个人报表',
    component: () => import('HomePage/StaffAttdence/TeacherCheckingOne')
  },
  {
    path: 'TeacherCheckingRole',
    name: 'TeacherCheckingRole',
    showName: '考勤设置',
    component: () => import('HomePage/StaffAttdence/TeacherCheckingRole')
  },
  {
    // ? 班次管理
    path: 'TeacherWorkShift',
    name: 'TeacherWorkShift',
    showName: '班次管理',
    component: () => import('HomePage/StaffAttdence/TeacherWorkShift')
  },
  {
    // ? 排班管理 (还没有节点)
    path: 'TeacherSchedule',
    name: 'TeacherSchedule',
    showName: '排班表',
    component: () => import('HomePage/StaffAttdence/TeacherSchedule')
  },
]