import {
  getRequest,
  postRequest
} from '@/request/request'

// * 1. 获取工作总结列表
export function getSummaryList(params) {
  return getRequest({
    // url: '/workplace/garden_review/summary_list',
    url: '/workplace/summary_of_work_for_review/index',
    params
  })
}

/**
 * @IParams
 * ? isRemarked (int) 点评状态（1为已点评，0待点评）
 * ? classId (int) 班级id
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

// * 2. 工作总结-点评详情
export function workSummaryInfo(params) {
  return getRequest({
    // url: '/workplace/garden_review/summary_detail',
    url: '/workplace/summary_of_work_for_review/remark',
    params
  })
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// * 点评-工作总结
export function commentWorkSummary(params) {
  // return postRequest('/workplace/garden_review/remark_summary', params)
  return postRequest(
    '/workplace/summary_of_work_for_review/remark',
    params
  )
}

/**
 * @IParams
 * ! id (int) 记录id
 * ! content (string) 点评内容
 */