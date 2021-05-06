export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'AskOfLeaveForReview'
  },
  {
    path: 'AskOfLeaveForReview',
    name: 'AskOfLeaveForReview',
    showName: '幼儿请假',
    component: () => import('HomePage/GardenApprove/AskOfLeaveForReview')
  },
  {
    path: 'PlanOfClassForReview',
    name: 'PlanOfClassForReview',
    showName: '班级计划',
    component: () => import('HomePage/GardenApprove/PlanOfClassForReview')
  },
  {
    path: 'PlanOfSemesterForReview',
    name: 'PlanOfSemesterForReview',
    showName: '学期计划',
    component: () => import('HomePage/GardenApprove/PlanOfSemesterForReview')
  },
  {
    path: 'PlanOfYearForReview',
    name: 'PlanOfYearForReview',
    showName: '整年计划',
    component: () => import('HomePage/GardenApprove/PlanOfYearForReview')
  },
  {
    path: 'SummaryOfWorkForReview',
    name: 'SummaryOfWorkForReview',
    showName: '工作总结',
    component: () => import('HomePage/GardenApprove/SummaryOfWorkForReview')
  }
]