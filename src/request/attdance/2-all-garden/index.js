import {
  getRequest
} from '@/request/request'

/**
 * @description 
 * ? 1.报表明细-表格
 * @param { start_time, end_time } params 
 * ? start_time (string) 开始时间 2021-01-01
 * ? end_time (string) 结束时间 2021-01-31
 */
export function getFullReport(params) {
  return getRequest({
    url: '/workplace/teacher_checking_report/index',
    params,
  })
}

// ? 2.报表明细-详情(同1.2)

/**
 * @description
 * ? 3.报表统计-表格
 */
export function getStaticTableInfo(params) {
  return getRequest({
    url: '/workplace/teacher_checking_report/report',
    params,
  })
}

/**
 * @description
 * ? 4. 报表统计-详情(同1.4)
 */

/**
 * @description
 * ? 5. 出勤率分析
 * @param { start_time, end_time, url: '/workplace/teacher_checking_report/attendancerate' } params 
 * @url
 * ? start_time (string) 开始时间 2021-01-01
 * ? end_time (string) 结束时间 2021-01-31
 */
export function getAttdenceAnalyze(params) {
  return getRequest({
    url: '/workplace/teacher_checking_report/attendancerate',
    params
  })
}

export function getPunchRecord(params) {
  return getRequest({
    url: '/workplace/teacher_checking_report/checkingrecord',
    params
  })
}