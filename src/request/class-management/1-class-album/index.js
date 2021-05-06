import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from '@/request/request';

/**
 * @description
 * * 1.列表
 * @param
 * ? type (string) 类型
 * ? classId (int / string) 班级id
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */
export function getAlbumList(params) {
  return getRequest({
    // url: '/workplace/class/album_list',
    url: '/workplace/langyun_class_album/index',
    params
  });
}

/**
 * @description
 * * 2.获取编辑信息
 * @param
 * ! id (int) 列表id
 */
export function getAlbumEdit(params) {
  return getRequest({
    // url: '/workplace/class/get_album_edit',
    url: '/workplace/langyun_class_album/addalbum',
    params
  });
}

/**
 * @description
 * * 3.编辑信息
 * @param
 * ! id (int) 列表id
 * ! title (string) 标题
 * ! type (string / int) 类型
 * ! classId (int / string) 班级id
 * ? classBoardIds (string) 班牌
 * ? gardenBoardIds (string) 园牌
 * ! isShowInClassBoard (int) 班牌是否展示
 * ! isShowInGardenBoard (int) 园牌是否展示
 */
export function editAlbum(params) {
  // return postRequest('/workplace/class/album_edit', params)
  return putRequest('/workplace/langyun_class_album/addalbum', params);
}

/**
 * @description
 * * 4.获取添加信息
 * @param {}
 */

export function getAlbumAdd(params = {}) {
  return getRequest({
    // url: '/workplace/class/get_album_add',
    url: '/workplace/langyun_class_album/addalbum',
    params
  });
}

/**
 * @description
 * * 5.添加
 * @param
 * ! uid (int / string) 用户id
 * ! title (string) 标题
 * ! type (int / string) 类型
 * ! classId (int / string) 班级id
 * ? classBoardIds (string) 班牌id
 * ? gardenBoardIds (string) 园牌id
 * ! isShowInClassBoard (string) 班牌是否展示
 * ! isShowInGardenBoard (string) 园牌是否展示
 */

export function addAlbum(params) {
  // return postRequest('/workplace/class/album_add', params)
  return postRequest('/workplace/langyun_class_album/addalbum', params);
}

/**
 * @description
 * * 6.详情
 * @param
 * ! id (int) 列表id
 */
export function getAlbumDetail(params) {
  return getRequest({
    // url: '/workplace/class/album_detail',
    url: '/workplace/langyun_class_album/infoalbum',
    params
  });
}

/**
 * @description
 * * 7.删除相册
 * @param
 * ! id (int) id(相册id)
 */

export function deleteAlbum(params) {
  return deleteRequest({
    // url: '/workplace/class/album_forbid',
    url: '/workplace/langyun_class_album/forbid',
    params
  });
}

/**
 * @description
 * * 8.获取相片素材
 * @param
 * ! id (int) 相册id
 */
export function getAddImage(params) {
  return getRequest({
    url: '/workplace/langyun_class_album/addpicture',
    params
  });
}

/**
 * @description
 * * 9.添加图片
 * ! albumId (int) 相册id
 * ! isSave (boolean (? 0/1)) 是否保存到相册中 true/false
 * ! coverId (int) 是否作为封面图片 (0/1)
 * ! up_img_info (string) 上传的图片的信息("pId|desc, ...") "7201|desc,7211|"
 */
export function addImage(body) {
  return postRequest(
    '/workplace/langyun_class_album/addpicture',
    body
  );
}

/**
 * @description
 * * 10.删除图片 (√)
 * @param
 * ! ids (string) id(相册id集合)
 * ! albumId (int) 相册id
 */

export function deletePic(params) {
  return deleteRequest({
    // url: '/workplace/class/album_pic_forbid',
    url: '/workplace/langyun_class_album/deletepicture',
    params
  });
}

/* -----------!新增接口!------------ */
/**
 * @description
 * * 11. 获取编辑图片
 * @param { pic_id, album_id }
 */
export function getEditPic(params) {
  return getRequest({
    url: '/workplace/langyun_class_album/editpicture',
    params
  });
}

/**
 * @description
 * * 12. 编辑图片
 * @param { id, oldAlbumId, oldIsCover, albumId, isCover, info }
 */
export function editPic(data) {
  return putRequest('/workplace/langyun_class_album/editpicture', data);
}
