import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

export function getWorkReportList(params = {}) {
  return getRequest({
    // url: '/workplace/personal_plan/report_of_work',
    url: '/workplace/report_of_work/index',
    // ? 所有的参数均为选填参数
    // ? title (int) 标题关键字
    // ? page (int) 页码
    // ? page_size 页长
    params
  });
}

export function addWorkReport(params) {
  return postRequest(
    // '/workplace/personal_plan/create_report_work',
    '/workplace/report_of_work/add',
    params
  );
}

export function getWorkReportDetail(id) {
  return getRequest({
    // url: '/workplace/personal_plan/report_work_detail',
    url: '/workplace/report_of_work/detail',
    params: {
      id
    }
  });
}

export function editWorkReport(params) {
  return putRequest(
    // '/workplace/personal_plan/edit_report_work',
    '/workplace/report_of_work/edit',
    params
  );
}

export function deleteWorkReport(params) {
  return deleteRequest({
    // url: '/workplace/personal_plan/del_report_work',
    url: '/workplace/report_of_work/forbid',
    params
  });
}

export function exportWorkReport(params) {
  return getRequest({
    url: '/workplace/report_of_work/outputinfo',
    params
  });
}
