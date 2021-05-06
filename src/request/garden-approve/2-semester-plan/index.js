import {
  getRequest,
  postRequest
} from '@/request/request'

export function getSemesterPlanList(params) {
  return getRequest({
    // url: '/workplace/garden_review/plan_semester',
    url: '/workplace/plan_of_semester_for_review/index',
    params
  })
}

export function getSemesterPlanInfo(params) {
  return getRequest({
    // url: '/workplace/garden_review/semester_plan_detail',
    url: '/workplace/plan_of_semester_for_review/remark',
    params
  })
}

export function postSemesterPlan(params) {
  return postRequest(
    // '/workplace/garden_review/remark_plan_semester',
    '/workplace/plan_of_semester_for_review/remark',
    params
  )
}


