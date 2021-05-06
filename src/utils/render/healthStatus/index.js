export default function (createElement, params) {
  const {
    row
  } = params
  const text = row.healthStatus
  const color = getColorByText(text)
  return [
    createElement(
      'div', {
        style: {
          color
        }
      },
      text
    )
  ]
}

function getColorByText(text) {
  switch (text) {
    case '正常':
      return 'lime'
    case '异常':
      return '#f35'
    case '需要观察':
      return 'orange'
    case '传染病风险':
      return '#f33'
    default:
      return 'skyblue'
  }
}