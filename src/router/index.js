import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

import store from '@/store';
import {
  localSet,
  // localGet,
  // ? path
  crtUrl,
} from '@/utils';
import { cookies, local } from '@/config';

import { constantRoutes } from './routes.js';
import { createRouter } from './routerHooks'
// ? store.state.isLogin

Vue.use(VueRouter);

// * 修改原push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// * 修改原replace方法
const origionReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return origionReplace.call(this, location).catch(err => err);
}

const router = createRouter(constantRoutes);

let toPath = crtUrl();
// console.log(toPath);

router.beforeEach(async (to, from, next) => {
  // console.log(from.path, to.path);
  const token = Cookies.get(cookies.TOKEN),
    { menus } = localSet(local.HOME_MENUS);
  if (token && menus) { // ? 已登录
    // console.log(`登录之后: 跳转前的路由: ${from.path}; 跳转后的路由: ${to.path}`);
    if (!Object.keys(store.state.routes).length) {
      await store.dispatch('getRoutes', { menus });
      to.redirectedFrom && router.replace(to.redirectedFrom);
      if (to.path.slice(0, 5) !== '/user') {
        return;
      } else {
        router.replace('/garden');
        return;
      }
    }
    if (from.path === '' || from.path === '/') {
      if (to.path === '/404') {
        router.replace('/garden');
      } else {
        next();
      }
    }
    if (
      to.path === '' ||
      to.path === '/' ||
      to.path === '/garden'
    ) {
      router.replace(to.redirectedFrom);
      return;
    } else {
      next();
    }
  } else { // ? 未登录
    if (
      toPath === '' ||
      toPath === '/' ||
      // ? 加一个生产环境配置 (/ly是容器名称)
      toPath.slice(0, 3) === '/ly' ||
      to.path === '/user'
    ) {
      toPath = '/user/login';
      router.replace(toPath);
    }
    if (
      to.path === '/user/login' ||
      to.path === '/user/findPassword' ||
      to.path === '/user/accountActivate'
    ) {
      next();
    } else { // ? 直接跳转404
      next();
    }
  }
  if (to.path === '/404') {
    if (token && menus) {
      router.replace('/garden');
    } else {
      next();
    }
  }
});

router.afterEach(() => {});

export default router;

