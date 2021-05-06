import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

/**
 * * 1.获取教师列表
 * @param {获取教师列表参数: name, classId} params
 * ! name (string) 教师名称
 * ! classId (string) 班级id
 */
export function getTeacherList(params) {
  return getRequest({
    // url: '/workplace/staff/mien_teacher_list',
    url: '/workplace/mien_of_teacher/index',
    params
  });
}

/**
 * !!!!! 2.获取编辑 (x)
 * @param {获取编辑 参数}
 * ! id (int / stirng) 列表id
 */
export function getTeacherEdit(params) {
  return getRequest({
    url: '/workplace/staff/get_mien_edit',
    params
  });
}

/**
 * * 3.编辑
 * @param {编辑 参数}
 * ! id (string / int) 列表id
 * ? motto (string) 座右铭
 * ? honor (string) 荣誉
 * ? images (string) 图片
 * ? icon (string) 图标 
 */

export function editTeacherMien(body) {
  // return postRequest('/workplace/staff/get_mien_edit', body);
  return putRequest('/workplace/mien_of_teacher/edit', body);
}

/**
 * !!!!! 4.获取添加 (x)
 * @param {获取添加 参数}
 */
export function getTeacherAdd(params = {}) {
  return getRequest({
    url: '/workplace/staff/get_mien_add',
    params
  });
}

/**
 * * 5.添加
 * @param {添加 参数}
 * ! uid (string / int) 用户id
 * ? motto (string) 座右铭
 * ? honor (string) 荣誉
 * ? images (string) 图片
 * ? icon (string) 图标
 */
export function addTeacherMian(params) {
  // return postRequest('/workplace/staff/mien_add', params)
  return postRequest('/workplace/mien_of_teacher/add', params);
}

/**
 * * 6. 获取详情
 * @param {获取详情 参数}
 * ! id (string) id
 */
export function getTeacherDetail(params) {
  return getRequest({
    // url: '/workplace/staff/get_mien_detail',
    url: '/workplace/mien_of_teacher/detail',
    params
  });
}

/**
 * * 7.删除
 * @param {删除 参数}
 * ! ids (string) id集合(当有多个时用','隔开)
 */

export function deleteTeacherMien(params) {
  return deleteRequest({
    // url: '/workplace/staff/mien_del',
    url: '/workplace/mien_of_teacher/forbid',
    params
  });
}