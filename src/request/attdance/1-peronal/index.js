import {
  getRequest,
} from '@/request/request'

/**
 * @description
 * ? 1.个人报表明细 - 表格
 * @param { start_time, end_time }
 * ? start_time (string) 开始时间 (2021-01-01)
 * ? end_time (string) 结束时间 (2021-01-31)
 */
export function getPersonReport(params) {
  const { uid } = params;
  return getRequest({
    // url: `/workplace/teacher_checking/report/${uid}`,
    url: `/workplace/teacher_checking_one/index/${uid}`,
    params,
  })
}

/**
 * @description
 * ? 2.个人报表明细 - 详情
 * @param { teacher_uid, date }
 * ? teacher_uid (int) 个人id
 * ? date (string) 当天日期
 */
export function getPersonDetail(params) {
  return getRequest({
    url: '/workplace/teacher_checking_one/detail',
    params
  })
}

/**
 * @description
 * ? 3.个人报表统计 - 表格
 * @param { teacher_uid, date }
 * ? teacher_uid (int) 个人id
 * ? date (string) 当天日期
 */
export function getPersonalStaticInfo(params) {
  const { uid } = params;
  return getRequest({
    // ? 请求路径: 需要加上用户的uid: Number  + uid
    url: `/workplace/teacher_checking_one/report/${uid}`,
    params
  })
}

export function getInfoByType(params) {
  return getRequest({
    url: '/workplace/teacher_checking_one/reportdetail',
    params
  })
}