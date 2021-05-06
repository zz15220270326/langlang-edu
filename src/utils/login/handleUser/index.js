import {
  encryptedParams,
  decryptedParams,
  decrtptedStr
} from '@/utils';

import { cookies } from '@/config';
import Cookies from 'js-cookie';

export function handleUser({ detail, garden_info, uid, role_id }, params = {}) {
  // ? 之前缓存相关信息
  // ? 登录相关信息
  const { icon_url, real_name, phone } = detail;
  const gardenId = garden_info.garden_id;
  const pwd = Cookies.get('user___pwd');

  const newParams = {
    // ...userInfo,
    ...params,
    gardenId,
    icon_url: icon_url ? icon_url : require('@/assets/images/error/error-401.svg'),
    real_name,
    phone,
    uid: uid || role_id || 0,
    pwd: pwd || ''
  };
  // setUserIntoStore(vueComponent, newParams)
  setUserInfo(newParams);
}

// ? 加密存储个人信息
export async function setUserInfo(params = {}) {
  if (parseInt(params.alwaysOnline) > 0) {
    const eParams = await encryptedParams(params, cookies.USER_INFO);
    Cookies.set(
      cookies.USER_INFO,
      eParams, {
      expires: 1
    });
  } else Cookies.remove(cookies.USER_INFO);
}

// ? 检测是否存储了用户信息并设置
export function checkUserInfo(vueComponent) {
  if (Cookies.getJSON(cookies.USER_INFO)) {
    const cookieStr = cookies.USER_INFO,
      userInfo = decryptedParams(Cookies.get(cookieStr), cookieStr);
    setUserIntoStore(vueComponent, userInfo);
    // console.log(userInfo);
    // if (userInfo.userType === 'garden') {}
    // vueComponent.registerList && vueComponent.registerList.forEach(item => {
    //   if (item.userType === userInfo.userType) {
    //     item.type = 'primary';
    //   } else item.type = 'default';
    // });
  }
}

function setUserIntoStore(vueComponent, {
  icon_url,
  phone,
  gardenId,
  uid,
  real_name,

  account,
  pwd,
  alwaysOnline
}) {
  // ? Login.vue & Home.vue // vueComponent.loginParams.account
  if (vueComponent.loginParams && 'account' in vueComponent.loginParams) {
    vueComponent.loginParams.account = account;
  }
  if (vueComponent.loginParams && 'password' in vueComponent.loginParams) {
    vueComponent.loginParams.password =
      decrtptedStr(pwd).length ? decrtptedStr(pwd) : '123456';
  }
  vueComponent.isRememberPwd = parseInt(alwaysOnline) ? true : false;

  vueComponent.setUsername(real_name);
  vueComponent.setUserAvatar(icon_url);
  vueComponent.setUserPhone(phone);
  vueComponent.setGardenId(gardenId);
  vueComponent.setUid(uid);
}