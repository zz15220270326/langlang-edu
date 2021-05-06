export function formatWeekDay(weekDay) {
  switch (weekDay) {
    case 'Mon':
      return '周一'
    case 'Tue':
      return '周二'
    case 'Wed':
      return '周三'
    case 'Thu':
      return '周四'
    case 'Fri':
      return '周五'
    case 'Sat':
      return '周六'
    case 'Sun':
      return '周日'
  }
}

export function handleSaveDay(transDay) {
  switch (transDay) {
    case '周一':
      return 'Mon'
    case '周二':
      return 'Tue'
    case '周三':
      return 'Wed'
    case '周四':
      return 'Thu'
    case '周五':
      return 'Fri'
    case '周六':
      return 'Sat'
    case '周日':
      return 'Sun'
  }
}