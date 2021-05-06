// ? 渲染点评状态
const renderStatus = (createElement, params) => {
  const {
    row
  } = params
  const text = row.status === 0 ? '待点评' : '已点评'
  const color = row.status === 0 ? 'orange' : row.status === 1 ? 'lime' : '#666'
  return createElement(
    'div', {
      style: {
        color
      }
    },
    text
  )
}

import {
  renderNoon,
  renderNoonTime,
  renderDayInfo
} from './noon'

import workerAttdenceColor from './workerAttdenceColor'

import pickColor from './pickColor'

import healthStatus from './healthStatus'

import handleChildType from './handleChildType'

export {
  renderStatus,
  renderNoon,
  renderNoonTime,
  renderDayInfo,

  pickColor,
  workerAttdenceColor,
  healthStatus,
  handleChildType,
}