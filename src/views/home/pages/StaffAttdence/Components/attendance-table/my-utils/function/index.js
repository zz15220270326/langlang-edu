/**
 * @IParams
 * ! 考勤明细相关的函数(方法)
 */
/**
 * @Import
 */
import { getPersonDetail } from '@/request/attdance'

import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? time
  transformTimeStamp,
} from '@/utils'

/**
 * @Public
 */
export function renderWeekDay(createElement, params, crtEl) {
  const {
    row,
    column
  } = params
  if (shouldReturnEvent(row, column)) {
    return createElement('a', {
      style: {
        color: 'orange',
        'text-decoration': 'underline',
        'font-size': '0.72rem'
      },
      props: {},
      on: {
        click: () => openInfoModal(row, column, crtEl)
      }
    }, row[column.key])
  } else {
    return createElement('List', {
      style: {
        color: (row[column.key] === '周六' || row[column.key] === '周日') ? 'deepskyblue' : '#666',
        'font-size': '0.72rem'
      },
      props: {}
    }, row[column.key])
  }
}

/**
 * @Private
 */
// row[column.key] === '周一' || row[column.key] === '周二' || row[column.key] === '周三' || row[column.key] === '周四' || row[column.key] === '周五' || row[column.key] === '周六' || row[column.key] === '周日' || row[column.key] === '休' || row[column.key] === '无'
function shouldReturnEvent(row, column) {
  const content = row[column.key]
  if (
    content === '周一' ||
    content === '周二' ||
    content === '周三' ||
    content === '周四' ||
    content === '周五' ||
    content === '周六' ||
    content === '周日' ||
    content === '休'
  ) {
    return false
  } else {
    return true
  }
}

async function openInfoModal(row, column, crtEl) {
  const params = {
    teacher_uid: row.id,
    date: `${crtEl.currentYm}-${column.title}`
  }
  const result = await getPersonDetail(params)
  const dataSource = getDataSource(result)
  if (checkDataSource(dataSource)) {
    const info = JSON.parse(JSON.stringify(dataSource))
    handleSetInfo(crtEl, info)
    handleOpenReminder(crtEl, params)
  } else crtEl.$Message.error(`请求失败, 原因${handleErrorCode(result.code)}`)
}

function handleSetInfo(crtEl, info) {
  // ? 先判断checkResult -> 再判断applyStatistics
  const {
    checkResult,
    applyStatistics,
  } = info,
    infos = []
  setCheckResult(infos, checkResult)
  setCheckStatistics(applyStatistics, infos)
  crtEl.infos = infos
  // console.log(crtEl.infos)
}

function setCheckResult(infos, checkResult) {
  // ! checkIn1, checkOut1
  const {
    checkIn1,
    checkOut1
  } = checkResult,
    checkTime1 = checkIn1.time > 0 ? transformTimeStamp(checkIn1.time) : '',
    workTime1 = transformTimeStamp(checkIn1.work_time),
    checkTime2 = checkOut1.time > 0 ? transformTimeStamp(checkOut1.time) : '',
    workTime2 = transformTimeStamp(checkOut1.work_time)
  infos[0] = {
    info: `打卡时间: ${checkTime1.length > 0 ? checkTime1 : '无'}  (${workTime1})`,
    type: checkIn1.type && handleAttdanceInfoType(checkIn1.type)
  }
  infos[1] = {
    info: `打卡时间: ${checkTime2.length > 0 ? checkTime2 : '无'}  (${workTime2})`,
    type: checkOut1.type && handleAttdanceInfoType(checkOut1.type)
  }
  // ? checkIn2, checkOut2
  if (checkResult.checkIn2 && checkResult.checkOut2) {
    const {
      checkIn2,
      checkOut2
    } = checkResult,
      checkTime3 = checkIn2.time > 0 ? transformTimeStamp(checkIn2.time) : '',
      workTime3 = transformTimeStamp(checkIn2.work_time),
      checkTime4 = checkOut2.time > 0 ? transformTimeStamp(checkOut2.time) : '',
      workTime4 = transformTimeStamp(checkOut2.work_time)
    infos[2] = {
      info: `打卡时间: ${checkTime3.length > 0 ? checkTime3 : '无'}  (${workTime3})`,
      type: checkIn2.type && handleAttdanceInfoType(checkIn2.type)
    }
    infos[3] = {
      info: `打卡时间: ${checkTime4.length > 0 ? checkTime4 : '无'}  (${workTime4})`,
      type: checkOut2.type && handleAttdanceInfoType(checkOut2.type)
    }
  }
}

function setCheckStatistics(applyStatistics = [], infos = []) {
  applyStatistics.map(item => {
    const diffTime = (item.time - item.work_time) / 3600
    infos.push({
      info: `打卡时间: ${item.time > 0 ? transformTimeStamp(item.time) : '无'}  (${transformTimeStamp(item.time)}-${transformTimeStamp(item.work_time)})`,
      type: `${handleAttdanceInfoType(item.type)} ${diffTime.toFixed(1)}小时`
    })
  })
}

function handleOpenReminder(crtEl, params) {
  crtEl.modalTitle = params.date
  crtEl.isShowInfoModal = true
}

function handleAttdanceInfoType(type) {
  switch (type) {
    case 'on':
      return '上班'
    case 'off':
      return '下班'
    case 'late':
      return '迟到'
    case 'early':
      return '早退'
    case 'absent_late':
      return '迟到旷工'
    case 'absent_early':
      return '早退旷工'
    case 'lack_on_work':
      return '上班缺卡'
    case 'lack_after_work':
      return '下班缺卡'
    case 'no_need_punch':
      return '无效打卡'
    case 'leave':
      return '请假'
    case 'out':
      return '外出'
    case 'overtime':
      return '加班'
    case 'add':
      return '补卡'
  }
}