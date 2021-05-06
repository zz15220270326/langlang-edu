/**
 * @description
 * @restruct
 * @example (1-个人相关)
 */
import {
  getPersonReport,
  getPersonDetail,
  getPersonalStaticInfo,
  getInfoByType
} from './1-peronal';
/**
 * @description
 * @restruct
 * @example (2-全员相关)
 */
import {
  getFullReport,
  getStaticTableInfo,
  getAttdenceAnalyze,
  getPunchRecord
} from './2-all-garden';
/**
 * @description
 * @restruct
 * @example (3-设置相关)
 */
import {
  getAttdanceRule,
  editAttdanceRule,
  getHolidayType,
  addHolidayType,
  editHolidayType,
  deleteHolidayType
} from './3-attdence-setting';
/**
 * @description 
 * @restruct
 * @example (4-班次管理)
 */
import {
  getClassesList,
  addClasses,
  editClasses,
  deleteClasses,
  getClassesInfo,
  arrangeClasses,
} from './4-classtime-management';
/**
 * @description
 * @restruct
 * @example (5-排班表)
 */
import { getScheduleList, editSchedule, editSchedules } from './5-arrange-classes';

export {
  // ? 报表统计
  getStaticTableInfo,
  getPersonalStaticInfo,
  getInfoByType,
  // ? 报告明细
  getFullReport,
  getPersonReport,
  getPersonDetail,
  getAttdenceAnalyze,
  getPunchRecord,
  // ? 考勤报表
  // ? attdanceRule
  getAttdanceRule,
  editAttdanceRule,
  // ? holidayType
  getHolidayType,
  addHolidayType,
  editHolidayType,
  deleteHolidayType,
  // ? 班次管理
  getClassesList,
  addClasses,
  editClasses,
  deleteClasses,
  getClassesInfo,
  arrangeClasses,
  // ? 排班表
  getScheduleList,
  editSchedules,
  editSchedule,
}