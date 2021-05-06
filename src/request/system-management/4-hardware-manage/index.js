import {
  getClassboardList,
  getEditClassboard,
  editClassboard,
  getSetClassboardInfo,
  setClassboardInfo,
  shutdownClassboard
} from './1-class';

import {
  getGardenBoardList,
  getEditGardenBoardInfo,
  editGardenBoard,
} from './2-garden';

import { getMachineList } from './3-machine';

export {
  // ? 1-班牌管理
  getClassboardList,
  getEditClassboard,
  editClassboard,
  getSetClassboardInfo,
  setClassboardInfo,
  shutdownClassboard,
  // ? 2-园牌管理
  getGardenBoardList,
  getEditGardenBoardInfo,
  editGardenBoard,
  // ? 3-闸机列表
  getMachineList
};