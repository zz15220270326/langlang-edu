import {
  getRequest,
  deleteRequest,
  putRequest
} from '@/request/request';

// ? 1. 用药服药列表
export function getRecordList(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/pharmcay_list',
    url: '/workplace/garden_pharmcay/index',
    params
  });
}

/**
 * @param
 * ? classId (int) 班级id
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

// ? 2. 用药服药记录-详情
export function getRecordInfo(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/pharmcay_detail',
    url: '/workplace/garden_pharmcay/detail',
    params
  });
}
/**
 * @param
 * ! id (int) 记录id
 */

// ? 3. 用药服药记录-记录
export function getRecords(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/medicine_record',
    url: '/workplace/garden_pharmcay/record',
    params
  });
}

/**
 * @param
 * ! id (int) 记录id
 */

// ? 4. 用药服药记录-删除
export function deleteRecords(params) {
  return deleteRequest({
    // url: '/workplace/garden_recipes/del_harmcay',
    url: '/workplace/garden_pharmcay/forbid',
    params
  });
}

/**
 * @param
 * ! id (int) 记录id
 */

// ? 5. 服药记录 - 服药
export function takeMedicine(params) {
  return putRequest(
    // '/workplace/garden_recipes/take_medicine',
    '/workplace/garden_pharmcay/edit',
    params
  );
}

/**
 * @param
 * ! id (int) 列表id
 * ! comment (string) 备注
 * ! dateTime (string) 时间日期
 */