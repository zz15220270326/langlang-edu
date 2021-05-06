import {
  getRequest,
  putRequest,
  deleteRequest,
  postRequest,
} from '@/request/request';

// ? 1. 获取突发状况列表
export function getOutBurstList(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/outburst_list',
    url: '/workplace/garden_outburst/index',
    params
  });
}
/**
 * @param
 * ? classId (int) 班级id
 * ? infantName (string) 幼儿名称
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

// ? 获取突发状况详情
export function getOutBurstDetail(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/outburst_detail',
    url: '/workplace/garden_outburst/detail',
    params
  });
}
/**
 * @param
 * ! id (int) 记录id
 */

// ? 3. 编辑突发状况
export function editOutBurst(params) {
  return putRequest(
    // '/workplace/garden_recipes/edit_outburst',
    '/workplace/garden_outburst/edit',
    params
  );
}
/**
 * @param
 * ! id (int) 列表id
 * ! classId (int) 班级id
 * ! infant (int) 幼儿id
 * ! outBurstName (string) 状况名称
 * ! outBurstScene (string) 发生场景
 * ! outBurstContent (string) 处理情况
 * ! teacher (int) 教师id
 * ! pictures (string) 图片 [示例：6779,6780,]
 */

// ? (3.1) 根据班级id获取教师幼儿名称
export function getNameByClassId(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/name_list',
    url: '/workplace/garden_outburst/listteacher',
    params
  });
}
/**
 * @param
 * ! classId (int) 班级id
 */

// ? 4 删除突发状况
export function deleteOutBurst(params) {
  return deleteRequest({
    // url: '/workplace/garden_recipes/del_outburst',
    url: '/workplace/garden_outburst/forbid',
    params
  });
}
/**
 * @param
 * ! id (string) 列表id (示例 1, 2)
 */

// ? 5. 添加突发状况
export function addOutBurst(params) {
  return postRequest(
    // '/workplace/garden_recipes/add_outburst',
    '/workplace/garden_outburst/add',
    params
  );
}
/**
 * @param
 * ! classId (int) 班级id
 * ! infant (int) 幼儿id
 * ! outBurstName (string) 状况名称
 * ! outBurstScene (string) 发生场景
 * ! outBurstContent (string) 处理情况
 * ! teacher (int) 教师id
 * ! pictures (string) 图片【示例：6779,6780,】
 */

// ? 6.根据班级获取教师和幼儿
export function getTcrAndIftByClass(params) {
  return getRequest({
    url: '/workplace/garden_outburst/listteacher',
    params
  });
}