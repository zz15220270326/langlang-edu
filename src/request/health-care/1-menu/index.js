import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request'

// TODO 1. 每周食谱列表
export function getMenuList(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/recipes_list',
    url: '/workplace/garden_recipes/index',
    params,
  })
}

/**
 * @IParams
 * ? year (int) 学年
 * ? semester (int) 学期
 * ? week (int) 第几周
 * ? page (int) 页码
 * ? page_size (int) 页长
 */

// TODO 2. 每周食谱详情
export function getMenuInfo(params) {
  return getRequest({
    // url: '/workplace/garden_recipes/recipes_detail',
    url: '/workplace/garden_recipes/detail',
    params,
  })
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// TODO 3. 编辑每周食谱
export function editMenuInfo(params) {
  return putRequest(
    // '/workplace/garden_recipes/edit_recipes', 
    '/workplace/garden_recipes/edit', 
    params
  )
}

/**
 * @Iparams
 * ! id (int) 记录id
 * ! year (int) 年份
 * ! semester (int) 学期
 * ! week (int) 周
 * ! content (string) 食谱内容
 */

// TODO 4. 每周食谱删除
export function deleteMenuInfo(params) {
  return deleteRequest({
    // url: '/workplace/garden_recipes/del_recipes',
    url: '/workplace/garden_recipes/forbid',
    params
  })
}

/**
 * @IParams
 * ! id (int) 记录id
 */

// TODO 5. 添加每周食谱
export function addMenuInfo(params) {
  return postRequest(
    // '/workplace/garden_recipes/create_recipes',
    '/workplace/garden_recipes/add',
    params
  )
}