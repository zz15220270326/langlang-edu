export default function (createElement, params) {
  const {
    row
  } = params
  const text = row.processMode === 1 ? '正常入园' : row.processMode === 2 ? '离园回家' : '未知'
  const color = row.processMode === 1 ? 'lime' : row.processMode === 2 ? 'deeppink' : 'skyblue'
  return [
    createElement('div', {
      style: {
        color
      }
    }, text)
  ]
}