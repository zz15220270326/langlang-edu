import {
  getRequest,
  postRequest,
  putRequest,
  // deleteRequest
} from '@/request/request'

/**
 * @description
 * ? 1.获取考勤规则
 * @param {gardenId|int} gardenId
 * ? garden_id (int) 园所id
 */
export function getAttdanceRule(gardenId) {
  return getRequest({
    // url: '/workplace/teacher_checking/rule',
    url: '/workplace/teacher_checking_role/index',
    params: {
      // ? 园所id: (int) (eg: 19)
      garden_id: gardenId
    }
  })
}

/**
 * @description
 * ? 2.编辑考勤规则
 * @param {a lot of params}
 * ! ruleId,
 * ! intervalMinutesBetweenAttendance,
 * ! lateLimit,
 * ! earlyLimit,
 * ! absentEarlyLimit,
 * ! absentLateLimit,
 * ! overtimeMinLimit,
 * ! reissueCardLimit
 */
export function editAttdanceRule(
  body
) {
  return putRequest(
    // '/workplace/teacher_checking/rule/' + body.ruleId, body
    '/workplace/teacher_checking_role/edit',
    body
  )
}

/**
 * @description
 * ? 3.获取假类列表
 * @param {gardenId|int} gardenId
 * ? garden_id (int) 园所id
 */
export function getHolidayType(params) {
  return getRequest({
    url: '/workplace/teacher_checking_role/type',
    params,
  })
}

/** // !!! (后面三个都是相同的)
 * @description
 * ? 4.新增假类
 * @param { name, comment, type } gardenId
 * ? name (string)
 * ? comment (string)
 * ? type (string) add
 */
export function addHolidayType(body) {
  return postRequest('/workplace/teacher_checking_role/edit_type', body)
}

/**
 * @description
 * ? 5.编辑假类
 * @param {gardenId|int} gardenId
 * ? name (string)
 * ? comment (string)
 * ? type (string) add
 * ? id (string) 
 */
export function editHolidayType(body) {
  // return putRequest('/workplace/teacher_checking/leave/' + body.id, body)
  return postRequest('/workplace/teacher_checking_role/edit_type', body)
}

/**
 * @description
 * ? 6.删除假类
 * @param {gardenId|int} gardenId
 * ? garden_id (int) 园所id
 */
export function deleteHolidayType(body) {
  return postRequest('/workplace/teacher_checking_role/edit_type/', body)
}