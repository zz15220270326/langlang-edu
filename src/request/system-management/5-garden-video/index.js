import {
  getRequest,
  putRequest,
  deleteRequest
} from '@/request/request';
/**
 * @description
 * * 1.获取视频播放列表 (√)
 * @param { title|string, page|int, pageSize|int } getByAlot
 * ? title (string) 视频标题
 * ? page (int) 页码
 * ? pageSize (int) 页长
 */
export function getVideoList(params) {
  return getRequest({
    url: '/workplace/langyun_garden_video/index',
    params
  });
}

/**
 * @description
 * * 2.获取编辑 (√)
 * @param { vid }
 * ! vid (int) 当前视频id
 */
export function getEditVideoInfo(params) {
  return getRequest({
    url: '/workplace/langyun_garden_video/moveintoplaylist',
    params
  });
}

/**
 * @description
 * * 3.编辑 (√)
 * @param { id|string, classBoardIds|string, gardenBoards|string }
 * ! id: 当前视频id集合
 * ! classBoardIds: 当前班牌id集合
 * ! gardenBoards: 当前园牌id集合
 */
export function editVideoInfo(body) {
  return putRequest(
    '/workplace/langyun_garden_video/moveintoplaylist',
    body
  );
}
/**
 * @description 
 * * 4. 获取添加 (bsp接口不稳定) (√)
 * @param { name, typeId }
 * ? typeId (int)
 * ! name (string)
 */
export function getAddVideoInfo(params) {
  return getRequest({
    url: '/workplace/langyun_garden_video/updatevideos',
    params
  });
}

// -------------------------------------------------------------- //
/**
 * @description
 * * 5. 单个视频（暂不需要）
 */
/**
 * @description
 * * 6. 视频列表（暂不需要）
 */
// -------------------------------------------------------------- //

/**
 * @description
 * * 5.删除 (√)
 * @param { vid|string }
 * ! vid (string) 视频id集合
 */
export function deleteVideoInfo(params) {
  return deleteRequest({
    url: '/workplace/langyun_garden_video/forbid',
    params
  });
}

/**
 * @description
 * * 6.园牌列表 (√)
 * @param { thisBoardId|string }
 * ! thisBoardId (string) 选中的园牌id集合
 */
export function getVideoGardenBoardList(params) {
  return getRequest({
    url: '/workplace/langyun_garden_video/playlistofgardenboard',
    params
  });
}

/**
 * @description
 * * 7.班牌列表 (√)
 * @param { thisBoardId|string }
 * ! thisBoardId (string) 选中的班牌id的集合
 */
export function getVideoClassBoardList(params) {
  return getRequest({
    url: '/workplace/langyun_garden_video/playlistofclassboard',
    params
  });
}
/**
 * @description
 * * 8.移除添加的内容
 * @param { id|string, board_id|string, class_id|string }
 * ! id (string) 视频id集合
 * ! board_id (string) 园牌id集合
 * ! class_id (string) 班牌id集合
 * ??? 后面班牌或园牌 (2选1)
 */
export function removeVideoFromList(body) {
  return putRequest(
    '/workplace/langyun_garden_video/moveoutfromplaylist',
    body
  );
}

/**
  interface ISort {
    videoId: number;
    order: number;
  }
 * @description
 * * 9.排序
 * @param { sort: ISort[].toString(), board_id|string, class_id|string }
 * ! sort (ISort[].toString()) 视频id|序号
 * @example 
 * * 246|1,247|3
 * ! board_id (int) 园牌id
 * ! class_id (int) 班牌id
 */
export function orderPlaylist(body) {
  return putRequest(
    '/workplace/langyun_garden_video/orderplaylist',
    body
  );
}

/**
 * @description
 * * 10.播放视频
 * @param { id|int, board_id|int, class_id|int, playType|string(enum) }
 * ! id (int) 视频id(单个视频立即播放必传)
 * ! board_id (int) 园牌id
 * ! class_id (int) 班牌id
 * ! playType (string(enum)) 播放方式('allRepeat','inOrder','shuffle','playNow','repeatOnce','once')
 */
export function playVideo(body) {
  return putRequest(
    '/workplace/langyun_garden_video/playnow',
    body
  );
}

export function getVideoByContent(content) {
  return getRequest({
    url: `/workplace/resources_of_letv/listvideo/${content}`,
    params: {}
  });
}