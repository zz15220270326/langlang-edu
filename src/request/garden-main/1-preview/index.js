import {
  getRequest
} from '@/request/request';

/**
 * @description
 * * 1.获取园所列表
 * @param {} NULL_PARAMS 
 */

export function getPreviewList(params = {}) {
  return getRequest({
    // url: '/workplace/garden_overview/overview',
    url: '/workplace/overview/index',
    params
  });
}

/**
 * @description
 * * 2. 园所总览-班级出勤情况-详情
 * @param { startDate, endDate } PARAMS
 * ? startDate (string) 开始时间
 * ? endDate (string) 结束时间
 */

export function getClassChecking(params = {}) {
  return getRequest({
    // url: '/workplace/garden_overview/class_checking',
    // url: '/workplace/overview/class_checking',
    url: '/workplace/baby_checking/checkingofclass',
    params
  });
}

/**
 * @description
 * * 3. 园所总览-园所出勤情况-详情
 * @param { startDate, endDate } PARAMS
 * ? startDate (string) 开始时间
 * ? endDate (string) 结束时间
 */
export function getGardenChecking(params = {}) {
  return getRequest({
    // url: '/workplace/garden_overview/garden_checking',
    // url: '/workplace/overview/garden_checking',
    url: '/workplace/baby_checking/checkingofgrade',
    params
  });
}