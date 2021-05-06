import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/request/request';

/**
 * * 1.获取列表
 * @param {获取列表参数}
 */
export function getRoleList(params) {
  return getRequest({
    // url: '/workplace/staff/admin_role_list',
    url: '/workplace/admin_role/index',
    params
  });
}

/**
 * !!!!! 2.获取编辑 (x)
 * @param {获取编辑参数}
 * ! id (int/string) 列表id
 */

export function getAdminEdit(params) {
  return getRequest({
    url: '/workplace/staff/get_admin_role_edit',
    params
  });
}

/**
 * * 3.编辑
 * @param {编辑参数}
 * ! id (int/string) 列表id
 * ! name (string) 名称
 * ! remark (string) 标记
 */

export function editRole(body) {
  // return postRequest('/workplace/staff/admin_role_edit', body);
  return putRequest('/workplace/admin_role/edit', body);
}

/**
 * !!!!! 4.获取添加 (x)
 * @param {null}
 */

export function getRoleAdd(params) {
  return getRequest({
    url: '/workplace/staff/get_admin_role_add',
    params
  });
}

/**
 * * 5.添加
 * @param {添加参数}
 * ! copyId (string) 角色id
 * ! name (string) 名称
 * ! remark (string) 备注
 */
export function addRole(params) {
  // return postRequest('/workplace/staff/admin_role_add', params);
  return postRequest('/workplace/admin_role/add', params);
}

/**
 * * 6.删除
 * @param {删除参数}
 * ! ids (string / int) 列表id
 */
export function deleteRole(params) {
  return deleteRequest({
    // url: '/workplace/staff/admin_role_delete',
    url: '/workplace/admin_role/forbid',
    params
  });
}

/**
 * * 7.获取授权
 * @param {获取授权参数}
 * ! roleId (string) 角色id
 */

export function getRoleAuth(params) {
  return getRequest({
    // url: '/workplace/staff/get_admin_role_auth',
    url: '/workplace/staff/get_admin_role_auth',
    params
  });
}

/**
 * * 8.授权 (启用)
 * @param {编辑授权参数(POST)}
 * ! roleId (string / int) 角色id
 * ! permissionIds (string) 权限id集合(x, x, ...)
 */

export function editRoleAuth(params) {
  // return postRequest('/workplace/staff/admin_role_auth_edit', params);
  // return postRequest('/workplace/admin_role/auth', params);
  return putRequest('/workplace/admin_role/access', params);
}