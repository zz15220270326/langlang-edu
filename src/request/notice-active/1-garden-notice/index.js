import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/request/request';

// ? 1. 获取列表
export function getGNList(params) {
  return getRequest({
    // url: '/workplace/notice/garden',
    url: '/workplace/notice_of_garden/index',
    params
  });
}

/**
 * @param 
 * ! (接口废弃)
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

// ? 2. 获取添加 (七牛云)
export function getAddInfo(params) {
  return getRequest({
    url: '/workplace/notice/get_garden_add',
    params
  });
}

/**
 * @param
 * * 无
 */

// ? 3. 添加动态
export function addGardenNotice(params) {
  // return postRequest('/workplace/notice/garden_add', params);
  return postRequest('/workplace/notice_of_garden/add', params);
}

/**
 * @param
 * ! content (string) 添加内容
 * ! title (string) 添加的标题
 * ? picIds (string) 图片id集合
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

// ? 4. 预览通知详情
export function getGardenDetail(params) {
  return getRequest({
    // url: '/workplace/notice/garden_detail',
    url: '/workplace/notice_of_garden/detail',
    params
  });
}

/**
 * @param
 * ! id (string) 记录id
 */

// ? 5. 发布园所通知
export function releaseGNotice(params) {
  // return putRequest('/workplace/notice/public_garden', params);
  return putRequest('/workplace/notice_of_garden/publicnotice', params);
}

/**
 * @param
 * ! id (string) 记录id
 */

// ? 6. 删除园所通知
export function deleteGNotice(params) {
  return deleteRequest({
    // url: '/workplace/notice/forbid_garden',
    url: '/workplace/notice_of_garden/forbid',
    params
  });
}

// ? 7. 编辑

// ? 8. 上传