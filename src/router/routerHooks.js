import VueRouter from 'vue-router';
import { constantRoutes } from './routes.js';

export const createRouter = routes => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // routes: [
  //   ...routes,
  // ]
});

export const resetRouter = router => {
  const newRouter = createRouter(constantRoutes);
  console.log(newRouter);
  console.log(newRouter.getRoutes());
  router.matcher = newRouter.matcher;
  router.matcher.match = newRouter.matcher.match;
}

/* router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = Cookies.get(cookies.TOKEN),
    menus = localSet(local.HOME_MENUS);
  // ? before
  if (from.path === '/') {
    if (token && menus) {
      const { menus } = localSet(local.HOME_MENUS);
      if (to.path.indexOf('garden') === -1) {
        await store.dispatch('getRoutes', { menus });
        router.addRoute(store.state.routes);
        // router.replace('/garden');
        if (toPath === '/') {
          router.replace('/garden');
        } else {
          router.replace(toPath);
        }
      } else next();
      next();
      return;
    } else {
      if (to.path.indexOf('user') === -1) {
        router.replace('/user/login');
      } else next();
      return;
    }
  }
  if (from.path === '/user/login' || to.path === '/user/login') {
    const { menus } = localSet(local.HOME_MENUS);
    if (menus && to.path.indexOf('garden') === -1) {
      await store.dispatch('getRoutes', {
        menus
      });
      router.addRoute(store.state.routes);
      // router.addRoutes([store.state.routes])
      router.replace('/garden');
    } else next();
    return;
  }
  if (to.path === '/') {
    router.replace('/user/login');
    return;
  }
  next();
}); */
