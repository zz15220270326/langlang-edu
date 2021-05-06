import { getRequest } from '@/request/request';

/**
 * @param { content|string, page|int, pageSize|int }
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

export function getSystemList(params) {
  return getRequest({
    // url: '/workplace/notice/system',
    url: '/workplace/notice_of_system/index',
    params
  });
}

/**
 * @description
 * @param { id }
 * ! id (int) 记录id
 */
export function getSystemDetail(params) {
  return getRequest({
    // url: '/workplace/notice/system_detail',
    url: '/workplace/notice_of_system/detail',
    params
  });
}
