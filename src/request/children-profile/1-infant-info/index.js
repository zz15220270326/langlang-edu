import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request'

// import qs from 'qs'

/**
 * @description
 * * 1.获取列表
 * @param
 * ? classId (int) 班级id
 * ? infantName (string) 幼儿名称
 * ? idCard (string) 卡号
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

export function getInfantInfoList(params = {}) {
  return getRequest({
    // url: '/workplace/baby_manage/infant_info_list',
    // url: '/workplace/baby/list',
    url: '/workplace/baby_manage/index',
    params
  })
}

/**
 * @description
 * * 2.获取添加
 * @param
 */

export function getInfantAdd(params = {}) {
  return getRequest({
    url: '/workplace/baby/get_baby_add',
    params
  })
}

/**
 * @description 
 * * 3.添加
 * @param {a lots}
 * ! username (string) 幼儿姓名
 * ! sex (int) 性别(1男2女)
 * ! nation (string) 民族
 * ! birthday (string) 生日 (2021-03-11)
 * ! gardenDate (string) 入园日期 (2021-03-11)
 * ! classId (int) 班级id
 * ! parent[relation][] (string) 家长关系
 * ! parent[name][] (string) string 家长姓名
 * ! parent[phone][] (string) 家长手机号
 * ! parent[card][]	(string) 家长考勤号
 * ! parent[sex][] (string) 家长性别
 * ? icon (int) 头像id(七牛云id)
 */
export function addInfant(data = {}) {
  // return postRequest('/workplace/baby/baby_add', params)
  return postRequest('/workplace/baby_manage/add', data)
}

/**
 * @description
 * * 4.获取编辑
 * @param { id }
 * ! id (int) 记录id
 */
export function getInfantEdit(params = {}) {
  return getRequest({
    url: '/workplace/baby/get_baby_edit',
    params
  })
}

/**
 * @description 
 * * 5.编辑
 * @param {a lots}
 * ! id (int) 幼儿id
 * ! username (string) 幼儿姓名
 * ! sex (int) 性别(1男2女)
 * ! nation (string) 民族
 * ! birthday (string) 生日 (2021-03-11)
 * ! gardenDate (string) 入园日期 (2021-03-11)
 * ! classId (int) 班级id
 * ! parent[id][] (string) 家长id
 * ! parent[relation][] (string) 家长关系
 * ! parent[name][] (string) string 家长姓名
 * ! parent[phone][] (string) 家长手机号
 * ! parent[card][]	(string) 家长考勤号
 * ! parent[sex][] (string) 家长性别
 * ? icon (int) 头像id(七牛云id)
 * ? parent[sex][] (string) 家长性别
 */

export function editInfant(data = {}) {
  // return putRequest('/workplace/baby/bady_edit', params)
  return postRequest('/workplace/baby_manage/edit', data)
}

/**
 * @description
 * * 6.获取详情
 * @param
 * ! infantId (int) 幼儿id
 */

export function getInfantDetail(params = {}) {
  return getRequest({
    // url: '/workplace/baby_manage/infant_detail',
    // url: '/workplace/baby/baby_detail',
    url: '/workplace/baby_manage/detail',
    params
  })
}

/**
 * @description
 * * 7.删除/离园
 * @param { ids, away }
 * ! ids (string) 记录id集合
 * ! away (int) 离园标志 (0, 1:离园)
 */
export function deleteInfant(params) {
  return deleteRequest({
    // url: '/workplace/baby/forbid_baby',
    url: '/workplace/baby_manage/forbid',
    params
  })
}

/**
 * @description
 * * 8.获取人脸审核
 * @param { id, type }
 * ! id (int) 幼儿id/家长id
 * ! type (string) 类型 (infant, parent)
 */
export function getAuditFace(params = {}) {
  return getRequest({
    url: '/workplace/baby/get_audit_face',
    params
  })
}

/**
 * @description
 * * 9.人脸审核
 * @param { id, type, audit }
 * ! id (int) 幼儿id/家长id
 * ! type (string) 类型 (infant, parent)
 * ! audit (int) 审核状态(1审核通过2审核拒绝)
 */
export function auditFace(params = {}) {
  // return putRequest('/workplace/baby/audit_face', params)
  return putRequest('/workplace/baby_manage/audit_face', params)
}

/**
 * @description 
 * * 10. 入园接口
 * @param { id|int }
 */