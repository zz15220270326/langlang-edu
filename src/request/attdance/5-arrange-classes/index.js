import { getRequest, putRequest } from '@/request/request'

/**
 * @description 
 * * 1.获取排班表内容 (GET)
 * @param { page_size|int, start_time|string, end_time|string } params 
 */
export function getScheduleList(params) {
  return getRequest({
    url: '/workplace/teacher_schedule/index',
    params
  })
}

/**
 * @description 
 * * 2.单个编辑排班 (PUT)
 * @param { shift_id|int, data:string, uid|int }
 */
 export function editSchedule(body) {
  // const {
  //   date,
  //   uid
  // } = body
  return putRequest(
    // `/workplace/teacher_checking/schedule/${date}/${uid}/`, body)
    `/workplace/teacher_schedule/edit`, body)
}

/**
 * @description
 * * 3.批量编辑排班
 * @param { date|string }
 */
 export function editSchedules(body) {
  // const {
  //   date
  // } = params
  // return putRequest('/workplace/teacher_checking/schedule/' + date)
  return putRequest('/workplace/teacher_schedule/arrange', body)
}