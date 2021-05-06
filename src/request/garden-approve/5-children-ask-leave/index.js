import {
  getRequest,
  postRequest,
} from '@/request/request'

/**
 * @description 
 * * 获取幼儿请假列表
 * @param { lots } choosable
 * ? isRemarked (int) --- 审批状态（1.已经审批，默认待审批）
 * ? classId (int) --- 班级id
 * ? infantName (string) --- 幼儿名称
 * ? page (int) --- 页码
 * ? page_size (int) --- 页长
 */

export function childrenAskLeaveListRequest(params = {}) {
  return getRequest({
    // url: '/workplace/garden_review/infant_leave_list',
    url: '/workplace/ask_of_leave_for_review/index',
    params
  })
}

/**
 * @description 
 * * 获取幼儿请假详情
 * @param { id|int }
 * ! id (int) (记录id)
 */
export function getChildrenLeaveInfo(params) {
  return getRequest({
    url: '/workplace/ask_of_leave_for_review/remark',
    params
  })
}

export function approveChild(body) {
  return postRequest('/workplace/ask_of_leave_for_review/remark', body)
}
