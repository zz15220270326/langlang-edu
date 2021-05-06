export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'Overview',
  },
  {
    path: 'Overview',
    name: 'Overview',
    showName: '园所总览',
    component: () => import('HomePage/GardenMain/Overview')
  },
  {
    path: 'HealthStats',
    name: 'HealthStats',
    showName: '健康看板',
    component: () => import('HomePage/GardenMain/HealthStats')
  }
  // {},
]