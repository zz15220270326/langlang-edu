import { getRequest } from '@/request/request';

/**
 * @param
 * ? content (string) 关键字
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */
export function getEduList(params) {
  return getRequest({
    // url: '/workplace/notice/edu',
    url: '/workplace/notice_of_edubureau_of_garden/index',
    params
  });
}

/**
 * @param
 * ! id (string) 记录id
 */
export function getEduDetail(params) {
  return getRequest({
    // url: '/workplace/notice/edu_detail',
    url: '/workplace/notice_of_edubureau_of_garden/detail',
    params
  });
}
