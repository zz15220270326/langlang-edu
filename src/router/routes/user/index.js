// ? 路由实例 router
// import router from '@/router';
// ? lazy-load children
import Login from 'UserPage/login';
import FindPassword from 'UserPage/find-password';
import AccountActivate from 'UserPage/account-activate';
import Page404 from '@/views/error/404';
// ? utils
import { localSet } from '@/utils';
// ? configs
import { cookies, local } from '@/config';
// ? cookies
import Cookies from 'js-cookie';

/**
 * @description
 * * userChildren (路由登陆后会跳转到权限路由中 --- 使用 handleIsLogin (gn))
 */

export function handleIsLogin(to, from, next) {
  const token = Cookies.get(cookies.TOKEN),
    { menus } = localSet(local.HOME_MENUS);
  if (token && menus) {
    next({ name: 'Overview' });
  } else {
    next();
  }
}

export default [
  // {
  //   path: '/',
  //   redirect: 'login'
  // },
  {
    path: 'login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => handleIsLogin(to, from, next)
    // ,alias: 'login'
  },
  {
    path: 'findPassword',
    name: 'FindPassword',
    component: FindPassword
  },
  {
    path: 'accountActivate',
    name: 'AccountActivate',
    component: AccountActivate
  },
  {
    // ? 设置404页面
    path: '/404',
    name: 'NoFound',
    component: Page404
  },
  {
    // 3.2.0
    // ? 其他不存在的路由 (404)
    path: '*',
    redirect: '/404',
    hidden: true
  }
];