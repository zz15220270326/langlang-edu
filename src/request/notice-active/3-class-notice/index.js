import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

// ? 1.获取列表
export function getClassNoticeList(params) {
  return getRequest({
    // url: '/workplace/notice/class',
    url: '/workplace/notice_of_class/index',
    params
  });
}

/**
 * @IParams
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize: (int) 页长
 */

// ? 2.获取添加内容(七牛云)

// ? 3.添加
export function addClassNotice(params) {
  return postRequest(
    // '/workplace/notice/garden_add',
    '/workplace/notice_of_class/add',
    params
  );
}

/**
 * ! content (string) 内容
 * ! title (string) 标题
 * ? picIds (string) 图片id集合
 * ? page (int) 页码
 * ? pageSize: (int) 页长
 */

// ? 4.预览/详情
export function getClassNoticeDetail(params) {
  return getRequest({
    // url: '/workplace/notice/garden_detail',
    url: '/workplace/notice_of_class/detail',
    params
  });
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// ? 5.发布
export function publicClassNotice(params) {
  return putRequest(
    // '/workplace/notice/public_garden',
    '/workplace/notice_of_class/public_notice',
    params
  );
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// ? 6. 删除
export function deleteClassNotice(params) {
  return deleteRequest({
    // url: '/workplace/notice/forbid_garden',
    url: '/workplace/notice_of_class/forbid',
    params
  });
}

/**
 * @IParams
 * ! ids (string) 单个或多个id
 */