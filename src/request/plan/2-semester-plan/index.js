import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

export function getSemesterPlanList(params = {}) {
  return getRequest({
    // url: '/workplace/personal_plan/plan_of_semester',
    url: '/workplace/plan_of_semester/index',
    /**
     * ? 所有的参数均为选填
     * ? 1. classId (int): 班级id【示例：128,123,111】
     * ? 2. year (int): 	年份【示例：2020】
     * ? 3. semester (int) 第几学期
     * ? 4. week (int) 第几周
     * ? 5. isRemarked (int) 点评状态 (0, 1)
     * ? 6. page (int) 页码
     * ? 7. page_size (int) 页长
     **/
    params
  });
}

export function addSemesterPlan(params) {
  return postRequest(
    // '/workplace/personal_plan/create_semester_plan',
    '/workplace/plan_of_semester/add',
    params
  );
}

export function getSemesterPlanInfo(id) {
  return getRequest({
    // url: '/workplace/personal_plan/semester_plan_detail',
    url: '/workplace/plan_of_semester/detail',
    params: {
      // ! 列表id (int)
      id
    }
  })
}

export function editSemesterPlan(
  params
) {
  return putRequest(
    '/workplace/plan_of_semester/edit',
    params
  );
}

export function deleteSemesterPlan(params) {
  return deleteRequest({
    url: '/workplace/plan_of_semester/forbid',
    params
  });
}

/**
 * @description
 * * 导出学期计划
 * @param {id} numberString 记录id
 */
export function getExportPlan(params) {
  return getRequest({
    url: '/workplace/plan_of_semester/outputinfo',
    params
  });
}
