// ? login
import {
  handleUser,
  checkUserInfo,
  setUserInfo,

  handleToken,
  handleRoutes,

  crtUrl,
  getCrtIdx,
  checkUsername,
  handleCheckPassword,
} from './login';

// ? times
import {
  dateToMs,
  transformTimeStamp,
  transformToYMD,
  transformToYM,
  getDays,
  getHMS,
  getWeekDays,
  getMondayDate,
  getDayKey,
  isAddZero,
  getAgeByBirthday,
  getAge,
  getNearDate,
} from './changeTime';

import htmlToText from './htmlToText';

import {
  chokeUse,
  antiShake
} from './better';

// ? echarts
import {
  getLineOption,
  formatObjList,
  getCookiesData,
  setOptions,
} from './echarts';

// ? render
import {
  renderStatus,
  renderNoon,
  renderNoonTime,
  renderDayInfo,

  // ? worker-attdence-color
  workerAttdenceColor,
  healthStatus,
  handleChildType,
} from './render';

// ? regexp
import {
  checkPhoneNumber,
  checkPassword,
  handleIsSamePwd,
  checkVrCode
} from './regexp';

// ? request
import {
  getDataSource,
  checkDataSource,
  handleOpResult
} from './request';

// ? error
import {
  handleErrorCode,
} from './handleError';

// ? 对象
import {
  filterParams,
  deepCopyObj
} from './object';
// ? 数组
import {
  uniqueArr,
  uniObjArr,
} from './array';

// ? 存储
import {
  localSave,
  localSet,
  localRemove,
  localGet,
} from './storage';

// ? 资源
import {
  getIcon
} from './qiniu';

// ? 加密
import {
  encryptedParams,
  decryptedParams,
  encrtptedStr,
  decrtptedStr,

  ePassword,
  dPassword,
} from './encrypt';

import { downloadFile } from './download';

export {
  /**
   * @用户相关的方法
   */
  handleUser,
  checkUserInfo,
  setUserInfo,

  handleToken,
  handleRoutes,

  crtUrl,
  getCrtIdx,
  checkUsername,
  handleCheckPassword,
  /**
   * @时间相关的方法
   */
  dateToMs,
  transformTimeStamp,
  transformToYMD,
  transformToYM,
  getDays,
  getHMS,
  getWeekDays,
  getMondayDate,
  getDayKey,
  isAddZero,
  getAgeByBirthday,
  getAge,
  getNearDate,
  /**
   * @将HTML转换成文本
   */
  htmlToText,
  /**
   * @Echarts图
   */
  getLineOption,
  formatObjList,
  getCookiesData,
  setOptions,
  /**
   * @防抖函数和节流函数
   */
  antiShake,
  chokeUse,
  /**
   * @渲染相关
   */
  renderStatus,
  renderNoon,
  renderNoonTime,
  renderDayInfo,
  workerAttdenceColor,
  healthStatus,
  handleChildType,
  /**
   * @正则表达式相关
   */
  checkPhoneNumber,
  checkPassword,
  handleIsSamePwd,
  checkVrCode,
  /**
   * @请求相关
   */
  getDataSource,
  checkDataSource,
  handleOpResult,
  /**
   * @错误相关
   */
  handleErrorCode,
  /**
   * @对象方法
   */
  filterParams,
  deepCopyObj,
  /**
   * @数组方法
   */
  uniqueArr,
  uniObjArr,
  /**
   * @description
   * * 存储相关
   */
  localSave,
  localSet,
  localRemove,
  localGet,
  /**
   * @description 
   * * 资源
   */
  getIcon,
  /**
   * @description 
   * * 导出下载
   */
   downloadFile,
  /**
   * @description 
   * * 加密/解密
   */
  encryptedParams,
  decryptedParams,
  encrtptedStr,
  decrtptedStr,
  ePassword,
  dPassword
};