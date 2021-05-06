import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request.js';

export function getWorkSummaryList(params) {
  return getRequest({
    // url: '/workplace/personal_plan/summary_of_work',
    url: '/workplace/summary_of_work/index',
    // ?? 所有的参数均为选填
    // ? classId (string) (班级id)
    // ? title (string) 搜索的标题关键字
    // ? page (int) 页码
    // ? page_size (int) 页长
    params
  });
}

export function addWorkSummary(params) {
  return postRequest(
    // '/workplace/personal_plan/create_summary_work',
    '/workplace/summary_of_work/add',
    params
  );
}

export function getWorkSummaryDetail(id) {
  return getRequest({
    // url: '/workplace/personal_plan/summary_wofk_detail',
    url: '/workplace/summary_of_work/detail',
    params: {
      // ! 列表id (int)
      id
    }
  });
}

export function editWorkSummary(params) {
  return putRequest(
    // '/workplace/personal_plan/edit_summary_wofk',
    '/workplace/summary_of_work/edit',
    params
  );
}

export function deleteWorkSummary(params) {
  return deleteRequest({
    url: '/workplace/summary_of_work/forbid',
    params
  });
}

export function exportWorkSummary(params) {
  return getRequest({
    url: '/workplace/summary_of_work/outputinfo',
    params
  });
}