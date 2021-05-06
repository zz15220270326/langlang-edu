import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

// * 1. 获取列表 
export function getGAList(params) {
  return getRequest({
    // url: '/workplace/notice/dynamics',
    url: '/workplace/garden_dynamics/index',
    params
  });
}

/**
 * @param
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

// * 2. 获取七牛云添加 (Common)

// * 3. 添加
export function addGA(params) {
  // return postRequest('/workplace/notice/dynamics_add', params);
  return postRequest('/workplace/garden_dynamics/add', params);
}

/**
 * @param
 * ! title (string) 标题
 * ! content (string) 内容
 * ! isTop (int) 1: 置顶; 0: 不置顶
 * ! summary (string) 概要
 * ? picIds (string) 图片id集合
 */

// * 4. 预览/详情
export function getGADetail(params) {
  return getRequest({
    // url: '/workplace/notice/dynamics_detail',
    url: '/workplace/garden_dynamics/detail',
    params
  });
}

/**
 * @param
 * ! id (int) 记录id
 */

// * 5. 发布
export function putGA(params) {
  // return putRequest('/workplace/notice/public_dynamics', params);
  return putRequest('/workplace/garden_dynamics/publicnotice', params);
}

/**
 * @param
 * ! id (int) 记录id
 */

// * 6. 置顶
export function setTop(params) {
  // return putRequest('/workplace/notice/top_dynamics', params);
  return putRequest('/workplace/garden_dynamics/settop', params);
}

/**
 * @param
 * ! id (int) 记录id
 * ! isTop (int) 0: 不置顶; 1: 置顶
 */

// * 7. 获取编辑
export function getGAEdits(params) {
  return getRequest({
    url: '/workplace/notice/get_dynamics_edit',
    params
  });
}

/**
 * @param
 * ! id (int) 记录id
 */

// * 8. 编辑
export function editGA(params) {
  // return putRequest('/workplace/notice/manage_edit', params);
  return putRequest('/workplace/garden_dynamics/edit', params);
}

/**
 * @param
 * ! id (int) 记录id
 * ! title (string) 标题
 * ! content (string) 内容
 * ! isTop (int) 0: 不置顶; 1: 置顶
 * ! summary (string) 概要
 * ! picIds (string) 图片id集合
 * !
 */

// * 9. 删除
export function deleteGA(params) {
  return deleteRequest({
    // url: '/workplace/notice/forbid_manage',
    url: '/workplace/garden_dynamics/forbid',
    params
  });
}

/**
 * @param
 * ! ids (string) 记录id集合
 */