import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request.js';

export function getAllYearPlanList(params = {}) {
  return getRequest({
    // url: '/workplace/personal_plan/plan_of_semester',
    url: '/workplace/plan_of_year/index',
    /*
    ? 所有的参数均为选填
    * classId: 班级id (string)
    * year: 年份 (int)
    * semester: 第几学期 (int)
    * week: 第几周(int)
    * isRemarked: 点评状态(0, 1) (int)
    * page: 页码 (int)
    * page_size: 页长 (int)
    */
    params
  });
}

export function addAllYearPlan(params) {
  return postRequest(
    // '/workplace/personal_plan/create_year_plan',
    '/workplace/plan_of_year/add',
    params
  );
}

export function getYearPlanDetail(id) {
  return getRequest({
    // url: '/workplace/personal_plan/year_plan_detail',
    url: '/workplace/plan_of_year/detail',
    params: {
      // ! 列表id
      id
    }
  });
}

export function editYearPlan(params) {
  return putRequest(
    // '/workplace/personal_plan/edit_year_plan',
    '/workplace/plan_of_year/edit',
    params
  );
}

export function deleteYearPlan(params) {
  return deleteRequest({
    url: '/workplace/plan_of_year/forbid',
    params
  });
}

export function exportYearPlan(params) {
  return getRequest({
    url: '/workplace/plan_of_year/outputinfo',
    params
  });
}
