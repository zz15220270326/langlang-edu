/**
 * @之前的静态路由表
 */
import userChildren from './routes/user'
import homeChildren from './routes/home'

export const routes = [{
    path: '/',
    redirect: '/user'
  },
  {
    // ? User-page
    path: '/user',
    component: () => import('@/views/user'),
    children: [...userChildren]
  },
  // ? 跳转首页 (权限路由)
  {
    path: '/garden',
    component: () => import('@/views/home'),
    children: [...homeChildren]
  },
  {
    // ? 设置404页面
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/error/404')
  },
  {
    // ? 其他不存在的路由 (404)
    path: '*',
    redirect: '/404'
  },
]