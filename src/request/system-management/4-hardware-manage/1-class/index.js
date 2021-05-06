import { getRequest, putRequest } from '@/request/request';
/**
 * @description
 * * 1. 获取班牌列表 (√ 缺少`登录账号`, `登录教师`, `绑定班级字段`字段;条件查询不生效)
 * @param {} null
 */
export function getClassboardList(params) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/indexofclassboard',
    params
  });
}

/**
 * @description
 * * 2. 获取编辑班牌信息 (√)
 * @param { id|int }
 * ! id (int) 记录id
 */
export function getEditClassboard(params) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/eidtofclassboard',
    params
  });
}

/**
 * @description
 * * 3. 编辑班牌信息 (√)
 * @param { id|int, name|string, remark|string }
 * ! id (int) 记录id
 * ! name (string) 班牌名称
 * ! remark (string) 班牌内容
 */
export function editClassboard(body) {
  return putRequest(
    '/workplace/manage_of_garden_hardware/eidtofclassboard',
    body
  );
}
/**
 * @description
 * * 4. 获取设置 (√)
 * @param { id|int }
 * ! id (int) 设置id
 */
export function getSetClassboardInfo(params) {
  return getRequest({
    url: '/workplace/manage_of_garden_hardware/eidtofclassboard',
    params
  });
}
/**
 * @description 
 * * 5. 设置班牌信息 (√)
 * @param { ids|string, type|string, open_time|Array }
 * ! ids (string) 班牌id集合
 * ! type (string) 班牌类型
 * ! open_time (Array) 班牌开关时间段
 * *"open_time" : {
 * *  "start":["06:00","","","","","",""],
 * *  "end":["09:00","","","","","",""]
 * *}
 */
export function setClassboardInfo(body) {
  return putRequest(
    '/workplace/manage_of_garden_hardware/eidtofclassboard',
    body
  );
}
/**
 * @description
 * * 6. 关机 (√)
 * @param { ids|string }
 * ! ids (string) 关机班牌集合
 */
export function shutdownClassboard(body) {
  return putRequest(
    '/workplace/manage_of_garden_hardware/shutdownofclassboard',
    body
  );
}