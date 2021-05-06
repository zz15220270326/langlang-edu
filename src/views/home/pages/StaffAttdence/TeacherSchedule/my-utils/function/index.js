import {
  getMondayDate,
  getDays,
  isAddZero
} from '@/utils';

export function renderWeekDay(createElement, params, crtEl = null) {
  const {
    row,
    column,
    index
  } = params;
  if (index === 0) {
    const {
      name,
      color
    } = row[column.key];
    // console.log(column.thisYear, column.title)
    return createElement('Button', {
      style: {
        color
      },
      props: {
        type: 'text'
      },
      on: {
        click: () => {
          crtEl.$Modal.confirm({
            title: '批量排班',
            content: '是否批量操作?',
            onOk: () => crtEl.arrangeClasses(
              `${column.thisYear}-${column.title}`
            )
          })
        }
      }
    }, name)
  }
  let tag = '',
    text = '',
    style = {}
  row.data.forEach((item1) => {
    const workTimeArr = item1.work_time.split('-'),
      [month, day] = workTimeArr.filter((item2, index2) => index2 > 0),
      workTime = [month, day].join('-')
    if (workTime === column.title) {
      tag = 'span'
      text = item1.name
      style = {
        color: '#0c0',
        'line-height': '0.5rem',
        'text-decoration': 'underline',
        'cursor': 'pointer'
      }
    }
  })
  return createElement(tag !== '' ? tag : 'a', {
    style: Object.keys(style).length > 0 ? style : {
      color: 'orange',
    },
    on: {
      click: (event) => {
        // console.log(event)
        const className = event.target.innerText;
        handleShowCard(crtEl, index, column.title, className, column.thisYear);
      }
    }
  }, text ? text : '休')

}

export function getDateParams(ymd = '0000-0-0') {
  const startTime = getMondayDate(ymd),
    list = startTime.split('-'),
    day = getDays(list[0] * 1, list[1] * 1)
  this.params.start_time = startTime
  if (list[2] * 1 + 13 <= day) {
    this.params.end_time = `${list[0]}-${list[1]}-${list[2] * 1 + 13}`
  } else {
    this.params.end_time = `${list[1] * 1 + 1 <= 12 ? list[0] : list[0] * 1 + 1
      }-${list[1] * 1 + 1 <= 12 ? list[1] * 1 + 1 : 1}-${list[2] * 1 +
      13 -
      day}`
  }
  const params = JSON.parse(JSON.stringify(this.params))
  return params
}

export function setTitleList(
  startTime = '0000-00-00',
  day = 0,
  crtEl = null
) {
  const titleList = []
  titleList[0] = {
    title: '姓名/日期',
    key: 'name',
    align: 'center',
    width: 100
  }
  const startTimeList = startTime.split('-'),
    [startMonth, startDay] = startTimeList
      .filter((item, index) => index > 0)
  const endDay = startDay * 1 + 13
  if (endDay <= day) {
    // ? 在本月范围内
    for (let d = 0; d <= endDay - startDay * 1; d++) {
      titleList.push({
        title: `${startMonth}-${isAddZero(startDay * 1 + d)}`,
        key: `day${d + 1}`,
        align: 'center',
        thisYear: startTimeList[0],
        render: (h, params) => renderWeekDay(h, params, crtEl)
      })
    }
  } else {
    const list1 = [],
      list2 = [],
      [startMonth, startDay] = startTime
        .split('-')
        .filter((item, index) => index > 0),
      endMonth = startMonth * 1 + 1
    if (endMonth <= 12) {
      // ? 跨月不跨年
      for (let d = 0; d <= day - startDay * 1; d++) {
        list1.push({
          title: `${startMonth}-${isAddZero(startDay * 1 + d)}`,
          key: `day${d + 1}`,
          align: 'center',
          thisYear: startTimeList[0],
          render: (h, params) => renderWeekDay(h, params, crtEl)
        })
      }
      titleList.push(...list1)
      for (let d = 0; d < 14 - list1.length; d++) {
        list2.push({
          title: `${isAddZero(endMonth)}-${isAddZero((d + 1).toString())}`,
          key: `day${d + list1.length}`,
          align: 'center',
          thisYear: startTimeList[0],
          render: (h, params) => renderWeekDay(h, params, crtEl)
        })
      }
      titleList.push(...list2)
    } else {
      // ? 跨年范围
      // ? 今年
      for (let d = 0; d <= day - startDay * 1; d++) {
        list1.push({
          title: `12-${startDay * 1 + d}`,
          key: `day${d + 1}`,
          align: 'center',
          thisYear: parseInt(startTimeList[1]) === 12 ?
            startTimeList[0] : (parseInt(startTimeList[0], 10) - 1).toString(),
          render: (h, params) => renderWeekDay(h, params, crtEl)
        })
      }
      titleList.push(...list1)
      // ? 明年
      for (let d = 1; d < 14 - (day - startDay * 1); d++) {
        list2.push({
          title: `01-${d < 10 ? '0' + d : d}`,
          key: `day${d + list1.length}`,
          align: 'center',
          thisYear: parseInt(startTimeList[1], 10) === 1 ?
            startTimeList[0] : (parseInt(startTimeList[0], 10) + 1).toString(),
          render: (h, params) => renderWeekDay(h, params, crtEl)
        })
      }
      titleList.push(...list2)
    }
  }
  return titleList
}

function handleShowCard(crtEl, index, title, className, crtYear) {
  crtEl.showModal(index, title, className, crtYear)
}