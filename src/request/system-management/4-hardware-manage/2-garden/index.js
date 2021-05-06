import { getRequest, putRequest } from '@/request/request';

/**
 * @description
 * * 1.获取园牌列表 (√: ? 缺少`登录账号`, `登录用户`字段 ;条件查询不生效)
 * @param {} null
 */
export function getGardenBoardList(params) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/indexofgardenboard',
    params
  });
}

/**
 * @description 
 * * 2.获取园牌信息
 * @param { id|int }
 * ! id (int) 记录id
 */
export function getEditGardenBoardInfo(params) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/eidtofgardenboard',
    params
  });
}
/**
 * @description
 * * 编辑园牌信息
 * @param { id|int, name|string, remark|string }
 * ! id (int) 记录id
 * ! name (string) 园牌名称
 * ! remark (string) 园牌内容
 */
export function editGardenBoard(body) {
  return putRequest(
    '/workplace/manage_of_garden_hardware/eidtofclassboard',
    body
  );
}