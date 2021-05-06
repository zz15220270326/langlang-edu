import {
  GET_UID,
  GET_CLASS_IDS,
  // ! 上传信息
  GET_USERNAME,
  GET_IS_LOGIN,
  GET_USER_TOKEN,
  GET_AVATAR,
  GET_PHONE,
  GET_GARDEN_ID,
  // ? 用户七牛云上传
  HANDLE_UPLOAD_URL,
  GET_SELECT_MONTH,
  GET_DEFAULT_YEAR,
  GET_DEFAULT_MONTH,
  GET_DEFAULT_DAY,
  GET_DAYS,

  GET_ROUTES
} from '@/store/storeType';
// ? router
import router from '@/router';
import { formatRoutes } from '@/router/asyncRoutes';
// ? request
import { postLoginRequest } from '@/request/user';
import {
  // ? request-utils
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj,
  // ? storage
  localSave
} from '@/utils';
import { handleUser, handleToken } from '@/utils';
// ? configs
import { local } from '@/config';
// ? iview
import { Message } from 'view-design';

export default {
  /**
   * @description
   * * 用户相关
   */
  [GET_UID](context, paramUid) {
    context.commit(GET_UID, paramUid);
  },
  [GET_CLASS_IDS](context, selectClassIds) {
    context.commit(GET_CLASS_IDS, selectClassIds);
  },
  [GET_USERNAME](context, userName) {
    context.commit(GET_USERNAME, userName);
  },
  [GET_IS_LOGIN](context, isLogin = true) {
    context.commit(GET_IS_LOGIN, isLogin);
  },
  [GET_USER_TOKEN](context, userToken = '') {
    context.commit(GET_USER_TOKEN, userToken);
  },
  [GET_AVATAR](context, avatar) {
    context.commit(GET_AVATAR, avatar);
  },
  [GET_PHONE](context, phoneNumber) {
    context.commit(GET_PHONE, phoneNumber);
  },
  [GET_GARDEN_ID](context, gardenId) {
    context.commit(GET_GARDEN_ID, gardenId);
  },
  [HANDLE_UPLOAD_URL](context, uploadUrl) {
    context.commit(HANDLE_UPLOAD_URL, uploadUrl);
  },
  /**
   * @description
   * 日期相关 
   */
  [GET_SELECT_MONTH](context, inputValue) {
    context.commit(GET_SELECT_MONTH, inputValue);
  },
  [GET_DEFAULT_YEAR](context, inputDefaultYear) {
    context.commit(GET_DEFAULT_YEAR, inputDefaultYear);
  },
  [GET_DEFAULT_MONTH](context, inputDefaultMonth) {
    context.commit(GET_DEFAULT_MONTH, inputDefaultMonth);
  },
  [GET_DEFAULT_DAY](context, inputDefaultDay) {
    context.commit(GET_DEFAULT_DAY, inputDefaultDay);
  },
  [GET_DAYS](context, inputDays) {
    context.commit(GET_DAYS, inputDays);
  },
  /**
   * @description
   * * 登录相关
   */
  async [GET_ROUTES](ctx, loginParams) {
    if (!loginParams.menus) {
      const result = await postLoginRequest(loginParams),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        Message.success({
          content: '登录成功!',
          duration: 3
        });
        const data = deepCopyObj(dataSource);
        const userInfo = {
          ...loginParams,
          alwaysOnline: loginParams.alwaysOnline
        };
        handleUser(data, userInfo);
        handleToken(data, loginParams);
        const { menus } = data;
        localSave(local.HOME_MENUS, { menus });
        /**处理路由 */
        const homeChildren = formatRoutes(menus),
          routes = {
            path: '/garden',
            component: () => import('@/views/home'),
            children: [...homeChildren],
            beforeEnter(to, from, next) {
              next();
            },
            meta: { requireAuth: true }
          };
        await ctx.commit(GET_ROUTES, routes);
        router.addRoute(ctx.state.routes);
        router.replace('/garden');
      } else {
        Message.error({
          content: `登录失败, 原因: ${result.msg}`,
          duration: 3
        })
      }
    } else {
      const { menus } = loginParams;
      const homeChildren = formatRoutes(menus),
        routes = {
          path: '/garden',
          component: () => import('@/views/home'),
          children: [...homeChildren],
          // beforeEnter(to, from, next) {
          //   next();
          // },
          meta: {
            requireAuth: true
          }
        };
      await ctx.commit(GET_ROUTES, routes);
      router.addRoute(ctx.state.routes);
      // router.replace('/garden');
    }
  }
}

// function simplyRoutes() {
// console.log(routes)
// debugger
// }

// if (menus.length) {
//   const homeChildren = formatRoutes(menus),
//     routes = {
//       path: '/garden',
//       component: () => import('@/views/home'),
//       children: [...homeChildren],
//       beforeEnter(to, from, next) {
//         next();
//       },
//       meta: {
//         requireAuth: true
//       }
//     };
//     // console.log(routes);
//   await commit(GET_ROUTES, routes);
// } else {
//   return;
// }
// else {
//   simplyRoutes(routes)
//   for (let k in routes) {
//     if (routes[k] === 'children') {
//       uniqueArr(routes[k]['children'])
//     }
//   }
//   context.commit(GET_ROUTES, routes)
// }