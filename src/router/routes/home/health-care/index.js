export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'GardenRecipes',
  },
  {
    path: 'GardenRecipes',
    name: 'GardenRecipes',
    showName: '每周食谱',
    component: () => import('HomePage/HealthCare/GardenRecipes')
  },
  {
    path: 'GardenPharmcay',
    name: 'GardenPharmcay',
    showName: '用药服药记录',
    component: () => import('HomePage/HealthCare/GardenPharmcay')
  },
  {
    path: 'GardenOutburst',
    name: 'GardenOutburst',
    showName: '突发状况',
    component: () => import('HomePage/HealthCare/GardenOutburst')
  }
]