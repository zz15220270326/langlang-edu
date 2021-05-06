import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request'

/**
 * @description
 * * 1.获取列表
 * @param { page, pageSize, name, date, classId }
 * ? page (int) 页码
 * ? pageSize (int) 页长
 * ? name (string) 幼儿姓名
 * ? date (string) 创建日期 (2021-03-11) 
 * ? classId (int) 班级id
 */

export function getGrowupList(params = {}) {
  return getRequest({
    // url: '/workplace/baby/growup_list',
    url: '/workplace/growup/index',
    params
  })
}

/**
 * @description
 * * 2.获取添加 (此接口已失效)
 * @param {} null
 */

export function getGrowupAdd(params = {}) {
  return getRequest({
    url: '/workplace/baby/get_growup_add',
    params
  })
}

/**
 * @description
 * * 3.添加档案
 * @param { ... }
 * ! classId (int) 班级id
 * ! infantId (int) 幼儿id
 * ! name (string) 幼儿姓名
 * ! date (string) 日期
 * ! honor (int) 荣誉评(1,2,3,4,5)
 * ! comment (string) 教师评语
 * ! grade (int / string) 年级
 * ! picIds (string) 图片集合
 */
export function addGrowup(params = {}) {
  // return postRequest('/workplace/baby/growup_add', params)
  return postRequest('/workplace/growup/add', params)
}

/**
 * @description
 * * 4.获取编辑 (此接口失效)
 * @param { id }
 * ! id (int) 记录id
 */
export function getGrowupEdit(params = {}) {
  return getRequest({
    url: '/workplace/baby/get_growup_edit',
    params
  })
}

/**
 * @description
 * * 5.编辑
 * @param { ... }
 * ! id (int) 记录id
 * ! classId (int) 班级id
 * ! infantId (int) 幼儿id
 * ! name (string) 幼儿姓名
 * ! date (string) 日期
 * ! honor (int) 荣誉评(1,2,3,4,5)
 * ! honor (int) 荣誉评(1,2,3,4,5)
 * ! comment (string) 教师评语
 * ! grade (int / string) 年级
 * ! picIds (string) 图片集合
 */
export function editGrowup(params) {
  // return putRequest('/workplace/baby/growup_edit', params)
  return putRequest('/workplace/growup/edit', params)
}

/**
 * @description
 * * 6.详情
 * @param { id }
 * ! id (int) 记录id
 */
export function getGrowupDetail(params = {}) {
  return getRequest({
    // url: '/workplace/baby/growup_detail',
    url: '/workplace/growup/detail',
    params
  })
}

/**
 * @description
 * * 7.删除
 * ! ids (string) 记录id集合
 */
export function deleteGrowup(params = {}) {
  return deleteRequest({
    // url: '/workplace/baby/forbid_growup',
    url: '/workplace/growup/forbid',
    params
  })
}
