import { getRequest, putRequest } from '@/request/request';

/**
 * @description
 * * 1.获取周次列表
 * @param {} null
 */
export function getWeekTimeList(params) {
  return getRequest({
    url: '/workplace/gardenset/index',
    params
  });
}

/**
 * @description 
 * * 2.编辑周次
 * @param { id|int, year|int, first-term|string, second_term|string }
 * ! id 记录id
 * ! year 年 2020
 * ! first-term 第一学期开始时间
 * ! second_term 第二学期开始时间
 */
export function editWeekTime(body) {
  return putRequest('/workplace/gardenset/index', body);
}

/**
 * @description 
 * * 3. 管控列表
 * @param {} null
*/
export function getControlList(params = {}) {
  return getRequest({
    url: '/workplace/gardenset/numberofparentset',
    params
  })
}

export function editControl(body) {
  return putRequest('/workplace/gardenset/numberofparentset', body)
}

