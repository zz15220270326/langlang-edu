import { getRequest, postQn } from '@/request/request';
import store from '@/store';

export function getClassList(uid) {
  return getRequest({
    url: '/workplace/garden_class/manage',
    params: { uid } // ? 用户uid
  });
}

export function getStudentList(params) {
  return getRequest({
    url: '/workplace/garden_recipes/name_list',
    params
  });
}

export function getTeacherList(params) {
  return getRequest({
    url: '/workplace/garden_recipes/name_list',
    params
  });
}

/**
 * @description
 * * 上传到七牛云
 * @param
 * ? number (int) 上传的文件数量(凭证个数)
 * ! type (string) 上传的文件类 ('image','video','files','docs')
 * ! action (string) 文件保存的目录名称, 例如: avatar
 */
export function getQnToken(params) {
  return getRequest({
    url: '/common/qiniu/token',
    // url: '/common/pic',
    params
  });
}
/**
 * @description
 * * 获取七牛云资源 
 * @param {key} int 上传凭证key
 * @param {token} string 上传凭证token
 * @param {file} file 上传的文件
 */
export function postQiniu(params = {}) {
  return postQn(store.state.uploadUrl, params);
}

export function getPicById(params) {
  return getRequest({
    // url: '/workplace/pub/get_pic',
    url: '/common/pic',
    params
  });
}