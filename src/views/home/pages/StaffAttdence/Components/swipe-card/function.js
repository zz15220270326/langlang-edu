function getSwipeType(swipeType = 0) {
  switch (swipeType) {
    case 1:
      return '上班'
    case 2:
      return '下班'
    default:
      return ''
  }
}

function getSwipeStatus(status) {
  const text = status === 0 ? '无效' : status === 1 ? '有效' : '',
    color = status === 0 ? '#d33' : status === 1 ? '#3d3' : '#666'
  return {
    text,
    color
  }
}

export {
  getSwipeType,
  getSwipeStatus
}