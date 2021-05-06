import { getRequest, putRequest } from '@/request/request';

/**
 * @description
 * * 1. 获取账号信息列表
 * @param null
 */
export function getList(params = {}) {
  return getRequest({
    url: '/workplace/manage_of_account/index',
    params
  });
}

/**
 * @description
 * * 2. 编辑
 * @param { lots }
 * ! realName (string)
 * ! icon (int)
 * ! birthday (string)
 * ! hiredate (string)
 * ! sex (int)
 * ! motto (string)
 * ! albumIds (int)
 * ! education
 * ! work
 * ! card
 */
export function editUser(body = {}) {
  return putRequest(
    '/workplace/manage_of_account/index',
    body
  );
}

/**
 * @description 
 * * 3.修改密码
 * @param { oldpassword|string, password|string, confirmPassword|string }
 */
export function changePwd(body = {}) {
  return putRequest('/workplace/manage_of_account/password', body);
}

/**
 * @description
 * * 4.修改手机
 * @param { oldphone|int, password|string, code|int, phone|int, type|string }
 * ! oldphone (int) 旧手机号
 * ! password (string) 旧密码
 * ! code (int) 手机验证码
 * ! phone (int) 新手机号
 * ! type (string) 修改类型( checkPassword, getCode, changePhone )
 */
export function changePhone(body = {}) {
  return putRequest('/workplace/manage_of_account/phone', body);
}