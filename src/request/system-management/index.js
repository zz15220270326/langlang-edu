import {
  getList,
  editUser,
  changePwd,
  changePhone,
} from './1-account-manage';

import {
  getGardenInfo,
  editGardenInfo,
} from './2-garden-info';

import {
  getAppearanceList,
  addAppearance,
  getEditApperance,
  editAppearance,
  deleteAppearance,

  getTeamList,
  getAddTeamInfo,
  addTeamInfo,
  getEditTeamInfo,
  editTeamInfo,
  deleteTeamInfo,

  getHonorList,
  addHonor,
  getEditHonorInfo,
  editHonorInfo,
  deleteHonorInfo,
} from './3-garden-mien';

import {
  getClassboardList,
  getEditClassboard,
  editClassboard,
  getSetClassboardInfo,
  setClassboardInfo,
  shutdownClassboard,

  getGardenBoardList,
  getEditGardenBoardInfo,
  editGardenBoard,

  getMachineList,
} from './4-hardware-manage';

import {
  getVideoList,
  getEditVideoInfo,
  editVideoInfo,
  getAddVideoInfo,
  deleteVideoInfo,
  getVideoGardenBoardList,
  getVideoClassBoardList,
  removeVideoFromList,
  orderPlaylist,
  playVideo,
  getVideoByContent
} from './5-garden-video'

import {
  getWeekTimeList,
  editWeekTime,
  getControlList,
  editControl,
} from './6-base-setting';

export {
  // ? 1.账号管理
  getList,
  editUser,
  changePwd,
  changePhone,
  // ? 2.园所信息
  getGardenInfo,
  editGardenInfo,
  // ? 3.园所风采
  getAppearanceList,
  addAppearance,
  getEditApperance,
  editAppearance,
  deleteAppearance,

  getTeamList,
  getAddTeamInfo,
  addTeamInfo,
  getEditTeamInfo,
  editTeamInfo,
  deleteTeamInfo,

  getHonorList,
  addHonor,
  getEditHonorInfo,
  editHonorInfo,
  deleteHonorInfo,
  // ? 4. 硬件管理
  getClassboardList,
  getEditClassboard,
  editClassboard,
  getSetClassboardInfo,
  setClassboardInfo,
  shutdownClassboard,

  getGardenBoardList,
  getEditGardenBoardInfo,
  editGardenBoard,

  // ? 5. 园所视频
  getVideoList,
  getEditVideoInfo,
  editVideoInfo,
  getAddVideoInfo,
  deleteVideoInfo,
  getVideoGardenBoardList,
  getVideoClassBoardList,
  removeVideoFromList,
  orderPlaylist,
  playVideo,
  getVideoByContent,

  getMachineList,
  // ? 5. 视频管理
  // ? 6. 基础设置
  getWeekTimeList,
  editWeekTime,
  getControlList,
  editControl,
};