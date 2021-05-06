export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'planOfClass'
  },
  {
    path: 'planOfClass',
    name: 'PlanOfClass',
    showName: '班级计划',
    component: () => import('HomePage/PersonalPlan/PlanOfClass')
  },
  {
    path: 'PlanOfSemester',
    name: 'PlanOfSemester',
    showName: '学期计划',
    component: () => import('HomePage/PersonalPlan/PlanOfSemester')
  },
  {
    path: 'PlanOfYear',
    name: 'PlanOfYear',
    showName: '整年计划',
    component: () => import('HomePage/PersonalPlan/PlanOfYear')
  },
  {
    path: 'SummaryOfWork',
    name: 'SummaryOfWork',
    showName: '工作总结',
    component: () => import('HomePage/PersonalPlan/SummaryOfWork')
  },
  {
    path: 'ReportOfWork',
    name: 'ReportOfWork',
    showName: '工作汇报',
    component: () => import('HomePage/PersonalPlan/ReportOfWork')
  }
]