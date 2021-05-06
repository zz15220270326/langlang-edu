import {
  getAlbumList,
  getAlbumAdd,
  addAlbum,
  getAlbumDetail,
  getAlbumEdit,
  editAlbum,
  getAddImage,
  addImage,
  deletePic,
  deleteAlbum,
  getEditPic,
  editPic
} from './1-class-album'

import {
  getClassInfoList,
  getClassAdd,
  addClassInfo,
  getClassEdit,
  editClassInfo,
  deleteClassInfo,
  upgradeClass,
  graduateClass,
} from './2-class-info'

import {
  getBabyCheckings,
  changeInfants,
  changeInfant,
  getClassAnalyze,
  getGradeAnalyze,
} from './3-infant-attdence'

export {
  // * 1.幼儿考勤
  getBabyCheckings,
  changeInfants,
  changeInfant,
  getClassAnalyze,
  getGradeAnalyze,
  // * 2.班级相册
  getAlbumList,
  getAlbumAdd,
  addAlbum,
  getAlbumDetail,
  getAlbumEdit,
  editAlbum,
  getAddImage,
  addImage,
  deletePic,
  deleteAlbum,
  getEditPic,
  editPic,
  // * 3.班级信息
  getClassInfoList,
  getClassAdd,
  addClassInfo,
  getClassEdit,
  editClassInfo,
  deleteClassInfo,
  upgradeClass,
  graduateClass,
}