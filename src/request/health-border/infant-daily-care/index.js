import {
  getRequest,
  deleteRequest,
} from '@/request/request'

// ? 1. 幼儿日常健康列表
/**
 * @param
 * ? classId (int) 班级id
 * ? healthCondition (int) 健康状态 (1: 正常，2: 需要观察，3: 传染病风险)
 * ? infantName (string) 幼儿姓名
 * ? startTime (string) 开始时间
 * ? endTime (string) 结束时间
 * ? page (int) 页码
 * ? page_size (int) 页长
 */
export function getInfantHealthList(params) {
  return getRequest({
    // url: '/workplace/health_prevent/infant_health_list',
    url: '/workplace/infant_daily_health/index',
    params
  })
}

// ? 2. 幼儿日常健康-详情
/**
 * @param {id}
 */
export function getInfantHealthDetail(params) {
  return getRequest({
    // url: '/workplace/health_prevent/infant_health_detail',
    url: '/workplace/infant_daily_health/detail',
    params
  })
}

// ? 3. 幼儿日常保健-删除
/**
 * @param {id}
 */
export function deleteInfantHealth(params) {
  return deleteRequest({
    // url: '/workplace/health_prevent/del_infant_health',
    url: '/workplace/infant_daily_health/forbid',
    params
  })
}
