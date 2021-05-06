import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/request/request';

/**
 * * 1.获取列表
 * @param {获取职工信息列表}
 * ? classId (int / stirng) 分组名称
 * ? realName (string) 职工姓名
 * ? card (string) 添加类型
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

export function getStaffInfoList(params) {
  return getRequest({
    // url: '/workplace/staff/list',
    url: '/workplace/staff_manage/index',
    params
  });
}

/**
 * * 2.获取编辑内容 (该接口鉴权后失效)
 * @param {获取编辑}
 * ! uid (string / int) 用户id
 */
export function getStaffEdit(params) {
  return getRequest({
    url: '/workplace/staff/get_staff_edit',
    params
  });
}

/**
 * * 3.编辑内容
 * @param {编辑}
 * ! uid (string / int) 用户id
 * ! username (string) 用户名
 * ! phone (int / string) 手机号码
 * ! sex (string) 性别
 * ! class (string) 班级id集合
 * ! role (string) 角色id
 * ! card (string) 考勤卡卡号
 * ! icon (string) 图标
 * ! birthday (string) birthday
 * ! hiredate (string) 入职日期
 * ! motto (string) 座右铭
 * ! honor (string) 荣誉
 * ! album (string) 相册
 */

export function editStaff(params) {
  // return putRequest('/workplace/staff/staff_edit', params);
  return putRequest('/workplace/staff_manage/edit', params);
}

/**
 * * 4.添加职工
 * @param {添加职工}
 * ! username (string) 用户名
 * ! phone (int) 手机号码
 * ! sex () 性别
 * ! class (string) 班级id集合
 * ! role (string) 角色id
 */

export function addStaff(params) {
  // return postRequest('/workplace/staff/staff_add', params);
  return postRequest('/workplace/staff_manage/add', params);
}

/**
 * * 5.获取详情
 * @param {获取详情}
 * ! uid (string / int) 用户id
 */

export function getStaffDetail(params) {
  return getRequest({
    // url: '/workplace/staff/detail',
    url: '/workplace/staff_manage/detail',
    params
  });
}

/**
 * * 6.删除职工
 * @param {删除职工}
 * ! uid (string / int) 用户id
 */

export function deleteStaff(params) {
  return deleteRequest({
    // url: '/workplace/staff/staff_forbid',
    url: '/workplace/staff_manage/forbid',
    params
  });
}