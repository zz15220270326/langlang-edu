export const renderNoon = (createElement, params) => {
  const {
    row,
    // column
  } = params
  // console.log('row: ', row)
  // console.log('column: ', column);
  const text = checkNoonText(row)
  const color = checkNoonColor(row)

  return createElement('Tag', {
    props: {
      color,
      size: 'large'
    }
  }, text)
}

export const renderNoonTime = (createElement, params) => {
  const {
    row
  } = params
  const text = row.time

  return createElement(
    'Tag', {
      props: {
        size: 'large',
        color: 'green'
      }
    },
    text
  )
}

export const renderDayInfo = (createElement, params, day) => {
  // ? createElement: render的返回dom
  // ? params: render的参数
  // ? 对象key
  console.log(createElement, params, day)
  // const {
  //   row
  // } = params
  // let text = ''
  // if (row[day].am) {
  //   console.log(row[day].am)
  //   const {
  //     am
  //   } = row[day]
  //   am.map((item) => {
  //     text = `[${item.name}]: ${item.content}`
  //   })
  //   return createElement('div', {}, text)
  // }
  // if (row[day].pm) {
  //   // afternoon
  // }
}

const checkNoonText = (row) => {
  const {
    time
  } = row
  const startHour = time.split('-')[0].split(':')[0] * 1
  if (startHour < 12) {
    return '上午'
  } else {
    return '下午'
  }
}

const checkNoonColor = (row) => {
  const {
    time
  } = row
  const startHour = time.split('-')[0].split(':')[0] * 1
  if (startHour < 12) {
    return 'success'
  } else {
    return 'warning'
  }
}