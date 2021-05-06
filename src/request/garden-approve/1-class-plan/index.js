import {
  getRequest,
  postRequest
} from '@/request/request';

export function getTeachPlanList(params) {
  return getRequest({
    // url: '/workplace/garden_review/plan_week',
    url: '/workplace/plan_of_class_for_review/planofweek',
    params
  });
}

export function getOtherPlanList(params) {
  return getRequest({
    // url: '/workplace/garden_review/other_plan_class',
    url: '/workplace/plan_of_class_for_review/planofclass',
    params
  });
}

export function getTeachCommentInfo(params) {
  return getRequest({
    // url: '/workplace/garden_review/remark_plan_class_detail',
    url: '/workplace/plan_of_class_for_review/remark',
    params
  })
}

export function getOtherCommentInfo(params) {
  return getRequest({
    // url: '/workplace/garden_review/other_plan_detail',
    url: '/workplace/plan_of_class_for_review/remarkplanofclass',
    params
  });
}

export function commentTeachPlan(params) {
  // return postRequest('/workplace/garden_review/remark_plan_class', params);
  return postRequest('/workplace/plan_of_class_for_review/remark', params);
}

export function commentOtherPlan(params) {
  return postRequest(
    '/workplace/plan_of_class_for_review/remarkplanofclass',
    params
  );
}
