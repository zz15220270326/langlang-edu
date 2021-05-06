// ? request
import {
  getInfoByType
} from '@/request/attdance'

import {
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils'

/**
 * @Public
 */
export function renderReportTable(createElement, params, currentElement) {
  const {
    row,
    column
  } = params
  const {
    key
  } = column
  const count = row[key].count || 0
  return count > 0 ? createElement('a', {
    on: {
      click: () => handleOpenInfoModal(currentElement, key, row.id, count)
    }
  }, count) : createElement('div', {}, count)
}

/**
 * @Private
 */
function handleOpenInfoModal(currentElement, key, id, count) {
  getStaDetail(id, currentElement, key, count)
  currentElement.modalTitle = getTagName(key)
  currentElement.isShowInfoModal = true
}

async function getStaDetail(id, crtEl, crtType, count) {
  const params = {
    uid: id || crtEl.uid,
    start_time: crtEl.startTime,
    end_time: crtEl.endTime,
    type: crtType
  }
  const result = await getInfoByType(params)
  const dataSource = getDataSource(result)
  if (checkDataSource(dataSource)) {
    const info = JSON.parse(JSON.stringify(dataSource))
    crtEl.accounts = {
      header: getTagName(crtType) === '应到' ? '打卡日期' : '打卡日期/时间',
      statistics: `${getTagName(crtType)}总计: ${count}${getUnit(crtType)}`,
      info,
      attdenceType: crtType
    }
  } else crtEl.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`)
}

function getUnit(type) {
  // ? 通过类型获取单位
  switch (type) {
    case 'should':
      return '天'
    case 'actually':
      return '次'
    case 'overtime':
      return '小时'
    case 'absent':
      return '次'
    case 'leave':
      return '小时'
    case 'late':
      return '次'
    case 'early':
      return '次'
    case 'out':
      return '小时'
  }
}

function getTagName(type) {
  switch (type) {
    case 'should':
      return '应到'
    case 'actually':
      return '实到'
    case 'overtime':
      return '加班'
    case 'absent':
      return '旷工'
    case 'leave':
      return '请假'
    case 'late':
      return '迟到'
    case 'early':
      return '早退'
    case 'out':
      return '外出'
  }
}