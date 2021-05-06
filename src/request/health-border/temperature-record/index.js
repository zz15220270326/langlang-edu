import { getRequest } from '@/request/request';

// ? 1. 幼儿测温列表
/**
 * @param
 * ? classId (int) 班级id
 * ? temperatureStatus (int) 健康状态:(1：正常，2：异常)
 * ? infantName (string) 幼儿姓名
 * ? startTime (string) 开始时间
 * ? endTime (string) 结束时间
 * ? page (int) 页码
 * ? page_size (int) 页长
 */
export function getInfantList(params) {
  return getRequest({
    // url: '/workplace/health_prevent/infant_temperature_record',
    url: '/workplace/face_temperature_record/infant',
    params
  });
}

// ? 2. 职工测温列表
/**
 * @param
 * ? roleId (int) 角色id
 * ? temperatureStatus (int) 健康状态:（1：正常，2：异常）
 * ? teacherName (string) 职工姓名
 * ? startTime (string) 开始时间
 * ? endTime (string) 结束时间
 * ? page (int) 页码
 * ? page_size (int) 页长
 */
export function getStaffList(params) {
  return getRequest({
    // url: '/workplace/health_prevent/staff_temperature_record',
    url: '/workplace/face_temperature_record/staff',
    params
  });
}