import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/request/request'

/**
 * @description
 * @获取班级信息列表
 * @param { grade, page, pageSize } paramsDescription
 * ? grade (string) 年级
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */

export function getClassInfoList(params) {
  return getRequest({
    // url: '/workplace/class/list',
    url: '/workplace/langyun_class/index',
    params
  })
}

/**
 * @description
 * @获取编辑信息
 * @param { id } params
 * ! id (int) 列表id
 */
export function getClassEdit(params) {
  return getRequest({
    // url: '/workplace/class/get_edit',
    url: '/workplace/langyun_class/edit',
    params
  })
}

/**
 * @description
 * @编辑内容
 * @param { id, teacher_ids, class_name, grade, infant_num, entrance_date } params
 * ! id (int) 列表id
 * ! teacher_ids (string) 教师id集合
 * ! class_name (string) 班级名称
 * ! grade (string) 年级
 * ! infant_num (int) 幼儿数量
 * ! entrance_date (string) 入学日期
 */

export function editClassInfo(params) {
  // return putRequest('/workplace/class/edit', params)
  return putRequest('/workplace/langyun_class/edit', params)
}

/**
 * @description 
 * @获取添加
 * @param {} nullParams
 */
export function getClassAdd(params = {}) {
  return getRequest({
    // url: '/workplace/class/get_add',
    url: '/workplace/langyun_class/add',
    params
  })
}

/**
 * @description 
 * @添加
 * @param { teacher_ids, class_name, grade, infant_num, entrance_date, slogan } params有5个
 * ! teacher_ids (string) 教师id集合
 * ! class_name (string) 班级名称
 * ! grade (string / int) 年级
 * ! infant_num (int / string) 幼儿数量
 * ! entrance_date (string) 入学日期
 * ! slogan (string) 口号
 */

export function addClassInfo(params) {
  // return postRequest('/workplace/class/add', params)
  return postRequest('/workplace/langyun_class/add', params)
}

/**
 * @description
 * @删除
 * @param { ids }
 * ! ids (string) id集合(当有多个时用','隔开)  
 */
export function deleteClassInfo(params) {
  return deleteRequest({
    // url: '/workplace/class/forbid',
    url: '/workplace/langyun_class/forbid',
    params
  })
}

/**
 * @description 
 * @升班
 * @param { id } oneParam
 * ! id (int) 班级id 
 */
export function upgradeClass(params) {
  // return putRequest('/workplace/class/class_upgrade', params)
  return putRequest('/workplace/langyun_class/upgrade', params)
}

/**
 * @description 
 * @毕业
 * @param { id } oneParam
 * ! id (int) 班级id 
 */
export function graduateClass(params) {
  // return putRequest('/workplace/class/graduation', params)
  return putRequest('/workplace/langyun_class/graduation', params)
}