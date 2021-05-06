import { getRequest, putRequest } from '@/request/request';

/**
 * @description 
 * * 1.获取园所信息列表
 * @param {} null
 */
export function getGardenInfo(params = {}) {
  return getRequest({
    url: '/workplace/manage_of_garden/index',
    params
  });
}

/**
 * @description 
 * * 2.编辑园所信息
 * @param { ...body } 
 */
export function editGardenInfo(body = {}) {
  return putRequest(
    '/workplace/manage_of_garden/edit',
    body
  );
}
