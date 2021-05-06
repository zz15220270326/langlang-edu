import {
  getRequest,
  postRequest,
} from '@/request/request'


// * 1. 获取整年计划列表
export function getAllYearPlanList(params) {
  return getRequest({
    // url: '/workplace/garden_review/plan_year',
    url: '/workplace/plan_of_year_for_review/index',
    params
  })
}

/**
 * @IParams
 * ? isRemarked (int) 点评状态（1为已点评，0待点评）
 * ? year (int) 学年
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

// * 2. 获取整年计划-点评详情
export function getCommentDetail(params) {
  return getRequest({
    // url: '/workplace/garden_review/year_plan_detail',
    url: '/workplace/plan_of_year_for_review/remark',
    params
  })
}
/**
 * @Iparams
 * ! id (int) 记录id
 */

// * 3. 整年计划-点评计划
export function commentAllYearPlan(params) {
  // return postRequest('/workplace/garden_review/remark_plan_year', params)
  return postRequest('/workplace/plan_of_year_for_review/remark', params)
}