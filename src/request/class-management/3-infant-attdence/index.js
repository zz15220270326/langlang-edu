import {
  getRequest,
  putRequest
} from '@/request/request'

/**
 * @description
 * * 1.获取幼儿考勤列表
 * @param { a lot ... }
 * ? classId (int) 班级id
 * ? yearMonth (string) 年-月
 * 
 */
export function getBabyCheckings(params = {}) {
  return getRequest({
    url: '/workplace/baby_checking/babychecking',
    params
  })
}

/**
 * @description
 * * 2.当天批量考勤修改
 * ! infantIds (string) 幼儿id集合
 * ! status (int) 0：取消签到(并恢复请假)；1：签到（并取消之前的请假状态）；2：事假；3：病假；4：取消签退；5：签退；6：取消请假(不恢复考勤)
 */
export function changeInfants(body) {
  return putRequest('/workplace/baby_checking/change_students', body)
}

/**
 * @description
 * * 3.特定考勤修改
 * ! schoolTime (string) 指定修改日期
 * ! status (int) 0：取消签到(并恢复请假)；1：签到（并取消之前的请假状态）；2：事假；3：病假；4：取消签退；5：签退；6：取消请假(不恢复考勤)
 * ! infantId (int) 幼儿id
 */
export function changeInfant(body) {
  return putRequest('/workplace/baby_checking/change_student', body)
}

/**
 * @description
 * * 4.班级考勤分析
 * ? startDate (string) 开始日期
 * ? endDate (string) 结束日期
 */
export function getClassAnalyze(params) {
  return getRequest({
    url: '/workplace/baby_checking/checkingofclass',
    params
  })
}

/**
 * @description
 * * 5.年级考勤分析
 * ? startDate (string) 开始日期
 * ? endDate (string) 结束日期
 */
export function getGradeAnalyze(params) {
  return getRequest({
    url: '/workplace/baby_checking/checkingofgrade',
    params
  })
}