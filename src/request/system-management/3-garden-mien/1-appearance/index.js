import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

/**
 * @description 
 * * 1.园所风貌 - 列表
 * @param {} null
 */
export function getAppearanceList(params = {}) {
  return getRequest({
    url: '/workplace/mien_of_garden/mien',
    params
  });
}

/**
 * @description 
 * * 2.园所风貌 - 添加
 * @param {img_info: string}
 * ! "img_info": "7201|desc,7211|"
 */
export function addAppearance(body = {}) {
  return postRequest('/workplace/mien_of_garden/mienedit', body);
}

/**
 * @description
 * * 3.园所风貌 - 获取编辑
 * @param { id|int }
 * ! id (int)
 */
export function getEditApperance(params) {
  return getRequest({
    url: '/workplace/mien_of_garden/mienedit',
    params
  });
}

/**
 * @description
 * * 4.园所风貌 - 编辑
 * @param {id|int, title|string}
 * ! id (int) 列表id
 * ! title (string) 标题内容
 */
export function editAppearance(body = {}) {
  return putRequest(
    '/workplace/mien_of_garden/mienedit',
    body
  );
}

/**
 * @description
 * *5.园所风貌 - 删除
 * @param { ids|string }
 * ! ids (string) id集合
 */
export function deleteAppearance(params = {}) {
  return deleteRequest({
    url: '/workplace/mien_of_garden/mienforbid',
    params
  });
}




