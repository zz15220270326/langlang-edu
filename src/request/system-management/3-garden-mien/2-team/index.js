import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

/**
 * @description
 * * 1.管理团队 - 获取列表
 * @param {} null
 */
export function getTeamList(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/team',
    params
  });
}

/**
 * @description
 * * 2. 获取添加 - 获取添加信息
 * @param {} null
 */
export function getAddTeamInfo(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/teamedit',
    params
  });
}

/**
 * @description
 * * 3.管理团队 - 添加
 * @param { img_info(string) }
 * ! img_info (string)
 * @example { "img_info": "7201|desc,7211|" }
 */
export function addTeamInfo(body = {}) {
  return postRequest('/workplace/mien_of_garden/teamedit', body);
}

/**
 * @description
 * * 4.管理团队 - 获取编辑内容
 * @param { id|int }
 * ! id (int) 编辑内容的id
 */
export function getEditTeamInfo(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/teamedit',
    params
  });
}

/**
 * @description
 * * 5.管理团队 - 编辑内容
 * @param { id|int, motto|string, honor|string, icon|string, images|string }
 * ! id (int) 编辑内容id
 * ! motto (string) 座右铭
 * ! honor (string) 荣誉
 * ! icon (int) 图标的七牛云id
 * ! images (string) 相册的七牛云id集合
 */
export function editTeamInfo(body = {}) {
  return putRequest('/workplace/mien_of_garden/teamedit', body);
}

/**
 * @description
 * * 6.管理团队 - 删除内容
 * @param { ids|string }
 * ! ids (string) 删除内容
 */
export function deleteTeamInfo(params = {}) {
  return deleteRequest({
    url: '/workplace/mien_of_garden/mienforbid',
    params
  });
}