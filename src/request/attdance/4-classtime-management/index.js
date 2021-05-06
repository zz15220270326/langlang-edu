import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request'

// ** 1. 获取班次
export function getClassesList(params) {
  return getRequest({
    // url: '/workplace/teacher_checking/work_shift',
    url: '/workplace/teacher_work_shift/index',
    params
  })
}

/**
 * @IParams
 *  * 无请求参数
 */

// * 2. 添加班次
export function addClasses(params) {
  // return postRequest('/workplace/teacher_checking/work_shift', params)
  return postRequest('/workplace/teacher_work_shift/edit', params)
}

/**
 * @IParams
 * ! name (string) 班次名称
 * ! start_time (string) 班次启动时间
 * ! punch_card_time (int) 班次打卡次数
 * ! weekday (string) 班次每周需打卡日
 * ! work_time (string) 班次打卡时间
 */

// * 3. 编辑班次
export function editClasses(params) {
  // const {
  //   id
  // } = params
  return postRequest('/workplace/teacher_work_shift/edit', params);
  // return putRequest('/workplace/teacher_work_shift/edit', params);
}

/**
 * @IParams
 * ! id (int) 列表id
 * ! name (string) 班次名称
 * ! start_time (string) 班次启动时间
 * ! punch_card_time (int) 班次打卡次数
 * ! weekday (string) 班次每周需打卡日
 * ! work_time (string) 班次打卡时间
 */

// * 4. 删除班次
export function deleteClasses(params) {
  // const {
  //   id
  // } = params
  return deleteRequest({
    // url: '/workplace/teacher_checking/work_shift/' + id
    url: '/workplace/teacher_work_shift/forbid',
    params
  })
}

/**
 * @IParams
 * ! id (int) 列表id
 */

// * 5. 获取班次信息
export function getClassesInfo(params) {
  const {
    id
  } = params
  return getRequest({
    // url: '/workplace/teacher_checking/arrange/' + id,
    url: '/workplace/teacher_checking/arrange/' + id,
  })
}

/**
 * @IParams
 * ! id (int) 列表id
 */

// * 6. 排班操作

export function arrangeClasses(params) {
  // const {
  //   id
  // } = params
  // return putRequest('/workplace/teacher_checking/arrange/' + id, params)
  return putRequest('/workplace/teacher_work_shift/arrange', params)
}

/**
 * @IParams
 * ! ids (string) 需排班教师ids
 * ! week (string) 班次设置周数
 */