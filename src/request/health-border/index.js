// * 健康防疫

import {
  getInfantHealthList,
  getInfantHealthDetail,
  deleteInfantHealth,
} from './infant-daily-care'

import {
  getInfantList,
  getStaffList,
} from './temperature-record'

import {
  getStaffManagementList,
  getStaffManagementInfo,
  deleteStaffManagement,
} from './health-management'

export {
  // ? 1. 幼儿日常健康列表
  getInfantHealthList,
  getInfantHealthDetail,
  deleteInfantHealth,

  // ? 2.人脸测温记录
  getInfantList,
  getStaffList,

  // ? 3.职工健康管理
  getStaffManagementList,
  getStaffManagementInfo,
  deleteStaffManagement,
}