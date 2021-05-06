import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/request/request';

/**
 * @description
 * * 1. 获取教学计划列表 (1)
 * @param { * } underside
 * ? classId (int) --- 班级id
 * ? year (int) --- 年份 [ 示例：2020 ]
 * ? semester (int) --- 第几学期
 * ? week (int) --- 第几周
 * ? isRemarked (int) --- 点评状态 (1,2)
 * ? page (int) --- 页码
 * ? page_size (int) --- 页长
 */
export function getTeachPlanList(params = {}) {
  return getRequest({
    // url: '/workplace/personal_plan/plan_of_week/',
    url: '/workplace/plan_of_class/planofweek',
    params
  });
}
/**
 * @description
 * * 2. 获取教学计划详情 (11)
 * @param { id|int }
 * ! id (int) 记录id
 */
// ? 获取教学计划详情
export function getTeachPlanInfo(id) {
  return getRequest({
    // url: '/workplace/personal_plan/work_plan_detail',
    url: '/workplace/plan_of_class/detail',
    params: {
      id,
    }
  });
}
/**
 * @description
 * * 3. 添加教學計劃 (2.nd 2)
 * @param { lots }
 * ! year: 年份 (int)
 * ! semester: 学期 (int)
 * ! week: 周 (int)
 * ! classId 班级id (string)
 * ! title 计划类型 (int) 
 * ! content 计划内容 (string)
 */
/**
 * @description
 * @param { * }
 * * 3.1 获取添加教学计划的内容
 */
export function getTeacherPlan() {
  return getRequest({
    url: '/workplace/plan_of_class/add'
  });
}
/**
 * @param { * } _添加教学计划
 * * 3.2 添加教学计划的内容
 */
export function addClassWeekPlan(params) {
  return postRequest(
    // '/workplace/personal_plan/create_teaching_plan',
    '/workplace/plan_of_class/add',
    params
  );
}
/**
 * @description
 * * 4. 编辑教学计划 (12)
 * @param { id|int, year|int, semester|int, week|int, classId|int, title|string, content|string }
 * ! 记录id (int)
 * ! 年份 (int)
 * ! 学期 (int)
 * ! 周 (int)
 * ! 班级id (int)
 * ! 计划类型 (int)
 * ! 计划内容 (string)
 */
export function putClassWeekPlan(data) {
  return putRequest(
    // '/workplace/personal_plan/edit_plan_of_class', 
    '/workplace/plan_of_class/edit', data);
}
/**
 * @description
 * * 5. 删除教学计划
 * ! id (int) 列表id
 */
export function deleteTeachPlan(id) {
  return deleteRequest({
    // url: '/workplace/personal_plan/del_plan',
    url: '/workplace/plan_of_class/forbid',
    params: { id }
  });
}
/* ----------------------------------------------------------------------- */
/**
 * @description
 * * 6. 获取时间方案列表
 * @param { page, page_size }
 * ? page: 页码 (int)
 * page_size: 页长 (int)
 */
export function getTimePlanList(params = {}) {
  return getRequest({
    // url: '/workplace/personal_plan/list_time_case',
    url: '/workplace/plan_of_class/listtimecase',
    // ? 所有的参数均为选填
    // ? page: 页码 (int)
    // ? page_size: 页长 (int)
    params
  });
}

/**
 * @description
 * * 7. 添加时间方案
 * @param { start_time|string, end_time|string, name|string }
 * ! start_time (string) 开始时间
 * ! end_time (string) 结束时间
 * ! name (string) 方案名称
 */
export function setTimePlan(params) {
  return postRequest(
    // '/workplace/personal_plan/set_time_case',
    '/workplace/plan_of_class/settimecase',
    params
  );
}

/**
 * @description
 * * 8. 获取时间方案详情
 * @param { id|int }
 */
export function getTimePlanDetail(id) {
  return getRequest({
    // url: '/workplace/personal_plan/time_case_detail',
    url: '/workplace/plan_of_class/settimecase',
    params: { id }
  });
}

/**
 * @description
 * * 9. 编辑时间方案
 * @param { id, start_time, end_time, name }
 * ! id (int) 列表id
 * ! start_time (string) 开始时间
 * ! end_time (string) 结束时间
 * ! name (string) 方案名称
 */
export function editTimePlan(body) {
  return putRequest(
    // '/workplace/personal_plan/edit_time_case',
    '/workplace/plan_of_class/settimecase',
    body
  );
}

/**
 * @description
 * * 10. 删除时间方案
 * @param { id|int }
 */
export function deleteTimePlan(params) {
  return deleteRequest({
    // url: '/workplace/personal_plan/del_time_case',
    url: '/workplace/plan_of_class/deletetimecase',
    params
  });
}
/* -------------------------------------------------------------------- */
/**
 * @description
 * * 11.计划类型列表
 * @param null
 */
export function getPlanTypeInfo() {
  return getRequest({
    // url: '/workplace/personal_plan/get_plan_type'
    url: '/workplace/plan_of_class/setweekplantype'
  });
}
/**
 * @description
 * * 12. 添加计划类型
 * @param { typeName|string }
 * ! typeName (string) 计划类型名称(当有多个时用','隔开)
 *  
 */
export function setPlanTypes(typeName) {
  return postRequest(
    // '/workplace/personal_plan/set_week_plan_type',
    '/workplace/plan_of_class/setweekplantype', {
    typeName
  })
}
/**
 * @description
 * * 13.获取计划类型详情
 * @param
 */
export function getPlanType(params) {
  return getRequest({
    url: '',
    params
  });
}
/**
 * @description
 * * 13.编辑计划类型
 * @param { typeId|int, typeName|string }
 * ! typeId (int) 计划类型id
 * ! typeName (string) 名称
 */
export function editPlanType(typeId, typeName) {
  return putRequest(
    // '/workplace/personal_plan/edit_week_plan_type',
    '/workplace/plan_of_class/setweekplantype', {
    typeId,
    typeName
  });
}
/**
 * @description
 * * 14.删除计划类型
 * @param { id|int }
 */
export function deletePlanType(params) {
  return deleteRequest({
    // url: '/workplace/personal_plan/del_week_plan_type',
    url: '/workplace/plan_of_class/setweekplantype',
    params
  });
}
/* ----------------------------------------------------------------------- */
/**
 * @description 
 * * 15. 获取其他计划列表
 * @param { classId|int, isRemarked|int }
 * ! classId (int) 班级id
 * ! isRemarked (int) 点评状态
 */
export function getOtherPlanList(params) {
  return getRequest({
    // url: '/workplace/personal_plan/other_plan_class',
    url: '/workplace/plan_of_class/planofclass',
    // ? 请求班级列表时参数为选填
    params
  });
}
/**
 * @description
 * * 16. 添加其他计划
 * @param { classId|int, content|string, title|string }
 * ! classId (int) 班级id
 * ! content (string) 内容
 * ! title (string) 标题
 */
export function addOtherPlan(body = {}) {
  return postRequest(
    // '/workplace/personal_plan/create_other_plan',
    '/workplace/plan_of_class/editplanofclass',
    body);
}
/**
 * @description 
 * * 17. 获取其他计划详情
 * @param { id }
 * ! id (int) 列表id
 */
export function getOtherPlanInfo(id) {
  return getRequest({
    // url: '/workplace/personal_plan/other_plan_detail',
    url: '/workplace/plan_of_class/detailplanofclass',
    params: {
      id
    }
  });
}
/**
 * @description
 * * 18. 编辑其他计划
 * @param { id|int, classId|int, title|int, content|string }
 * ! 列表id (int)
 * ! 班级id (int)
 * ! 标题 (string)
 * ! 计划内容 (string)
 */
export function editOtherPlan(body) {
  return putRequest(
    // '/workplace/personal_plan/edit_other_plan/',
    '/workplace/plan_of_class/editplanofclass', body);
}

/**
 * @description
 * * 19 导出计划内容
 * @param
 */
export function exportClassPlan(params) {
  return getRequest({
    url: '/workplace/plan_of_class/outputinfo',
    params,
    responseType: 'blob'
  });
}