import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

// ? 1. 获取园内通知列表
export function getInsideInfo(params) {
  return getRequest({
    // url: '/workplace/notice/ingarden',
    url: '/workplace/notice_of_garden_include_parents/index',
    params
  })
}

/**
 * @IParams
 * ! 此接口废弃 X
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

// ? 2. 获取添加园内通知资源
export function getInsideAdd(params) {
  return getRequest({
    // url: '/workplace/notice/get_ingarden_add',
    url: '/workplace/notice_of_garden_include_parents/add',
    params
  })
}

/**
 * @param {}
 **/

// ? 3. 添加园内通知
export function addInsideInfo(body) {
  return postRequest(
    // '/workplace/notice/ingarden_add',
    '/workplace/notice_of_garden_include_parents/add',
    body
  )
}

/**
 * @IParams
 * ! title (string) 标题
 * ! content (string) 内容
 * ? picIds (string) 图片id集合
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

// ? 4. 获取园内通知详情
export function getInsideDetail(params) {
  return getRequest({
    // url: '/workplace/notice/ingarden_detail',
    url: '/workplace/notice_of_garden_include_parents/detail',
    params
  })
}

/**
 * @param { id|int }
 * ! id (int) 记录id
 */

// ? 5. 发布园内通知
export function announceInsideDetail(params) {
  return putRequest(
    // '/workplace/notice/public_ingarden',
    '/workplace/notice_of_garden_include_parents/publicnotice',
    params
  )
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// ? 6. 删除园内通知
export function deleteInsideDetail(params) {
  return deleteRequest({
    // url: '/workplace/notice/forbid_ingarden',
    url: '/workplace/notice_of_garden_include_parents/forbid',
    params
  })
}

/**
 * @IParams
 * ! ids (int) 记录id
 */