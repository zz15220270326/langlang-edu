import {
  getRequest,
  deleteRequest,
} from '@/request/request'

/**
 * @param
 * ? healthCondition (int) 健康状态:（1：正常，2：异常）
 * ? teacherName (string) 幼儿姓名
 * ? startTime (string) 开始时间
 * ? endTime (string) 结束时间
 * ? page (int) 页码
 * ? page_size (int) 页长
 */
export function getStaffManagementList(params) {
  return getRequest({
    // url: '/workplace/health_prevent/staff_health_record',
    url: '/workplace/staff_health_records/index',
    params
  })
}
/**
 * @param
 * ! id (int) 列表id
 */
export function getStaffManagementInfo(params) {
  return getRequest({
    // url: '/workplace/health_prevent/',
    url: '/workplace/staff_health_records/index',
    params
  })
}

/**
 * @param
 * ! id (int) 列表id
 */
export function deleteStaffManagement(params) {
  return deleteRequest({
    // url: '/workplace/health_prevent/del_staff_health',
    url: '/workplace/staff_health_records/forbid',
    params
  })
}