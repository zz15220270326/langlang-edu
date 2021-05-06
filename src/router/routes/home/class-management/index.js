export default [{
    path: '/',
    name: '',
    showName: '',
    redirect: 'babyChecking'
  },
  {
    path: 'babyChecking',
    name: 'babyChecking',
    showName: '幼儿考勤',
    component: () => import('HomePage/ClassManagement/babyChecking')
  },
  {
    path: 'LangyunClassAlbum',
    name: 'LangyunClassAlbum',
    showName: '班级相册',
    component: () => import('HomePage/ClassManagement/LangyunClassAlbum')
  },
  {
    path: 'LangyunClass',
    name: 'LangyunClass',
    showName: '班级信息',
    component: () => import('HomePage/ClassManagement/LangyunClass')
  }
]