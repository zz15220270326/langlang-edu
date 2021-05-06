// ? import asyncRoutes
// import {} from '@/request/user';
import { localSave } from '@/utils';
import { local } from '@/config';
import store from '@/store';
import router from '@/router';

// ? 权限路由
export default async function handleRoutes({ menus }) {
  // ? 本地存储menus
  localSave(local.HOME_MENUS, { menus });
  // ? 添加到store中
  await store.dispatch('getRoutes', { menus });
  // ? 跳转到首页
  router.replace('/garden');
  // vueElement.$router.replace('/');
  // window.location.replace(window.href);
  // location.reload();
}