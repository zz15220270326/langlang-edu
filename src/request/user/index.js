import {
  postRequest,
  getRequest,
  putRequest
} from '@/request/request';

/**
 * @description
 * * 用户登录
 * @param { userType } string 登录类型
 * @param { account } string 账号
 * @param { password } string 密码
 * @param { alwaysOnline } string (记住密码 ('0'/'1'))
 * @param { code } string 验证密码
 */
export function postLoginRequest(params) {
  return postRequest('/workplace/pub/login', params);
}

/**
 * @description 
 * * 获取手机验证码
 * @param { phone } string 手机号
 * @param { msgType } string/number 类型
 */
export function getPhoneCode(params) {
  return getRequest({
    url: '/workplace/pub/get_code',
    params
  });
}

/**
 * @description
 * * 激活账号
 * @param {phone} string 手机号
 * @param {regType} string 激活类型
 * @param {code} number 验证码
 * @param {password} string 密码
 */
export function activateAccount(params) {
  return postRequest('/workplace/pub/register', params);
}

/**
 * @description
 * * 修改用户密码
 * @param {phone}  numberString 手机号
 * @param {phone}  numberString 手机号
 * ! code (int / string) 手机号验证码
 * ! password (string) 密码
 * ! confirmPassword (string) 确认密码
 */
export function changePassword(params = {}) {
  return putRequest('/workplace/pub/forget', params);
}

/**
 * @description 
 * * 用户登出
 * @param {} null
 */
export function handleLogout(params = {}) {
  return getRequest({
    url: '/workplace/pub/logout',
    params
  });
}
