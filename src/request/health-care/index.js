import {
  getMenuList,
  addMenuInfo,
  deleteMenuInfo,
  getMenuInfo,
  editMenuInfo,
} from './1-menu';

import {
  getRecordList,
  getRecordInfo,
  getRecords,
  deleteRecords,
  takeMedicine,
} from './2-record';

import {
  getOutBurstList,
  getOutBurstDetail,
  editOutBurst,
  getNameByClassId,
  deleteOutBurst,
  addOutBurst,
  getTcrAndIftByClass
} from './3-accident';

export {
  // ? 卫生保健-每周食谱
  getMenuList,
  addMenuInfo,
  deleteMenuInfo,
  getMenuInfo,
  editMenuInfo,

  // ? 卫生保健-用药服药记录
  getRecordList,
  getRecordInfo,
  getRecords,
  deleteRecords,
  takeMedicine,

  // ? 卫生保健-突发状况
  getOutBurstList,
  getOutBurstDetail,
  editOutBurst,
  getNameByClassId,
  deleteOutBurst,
  addOutBurst,
  getTcrAndIftByClass
};