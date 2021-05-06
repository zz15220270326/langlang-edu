export const titleList = [{
    title: '序号',
    key: 'number',
    align: 'center',
    width: 100
  },
  {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 320
  },
  {
    title: '提交人',
    key: 'realname',
    align: 'center'
  },
  {
    title: '班级',
    key: 'className',
    align: 'center'
  },
  {
    title: '创建时间',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
]

export const planTitleList = [{
    title: '上午/下午',
    key: 'noon',
    align: 'center'
  },
  {
    title: '时间段',
    key: 'timeSpan',
    align: 'center'
  },
  {
    title: '周一',
    key: 'day1',
    align: 'center',
    render: (createElement, params) => renderDayContent(createElement, params)
  },
  {
    title: '周二',
    key: 'day2',
    align: 'center',
    render: (createElement, params) => renderDayContent(createElement, params)
  },
  {
    title: '周三',
    key: 'day3',
    align: 'center',
    render: (createElement, params) => renderDayContent(createElement, params)
  },
  {
    title: '周四',
    key: 'day4',
    align: 'center',
    render: (createElement, params) => renderDayContent(createElement, params)
  },
  {
    title: '周五',
    key: 'day5',
    align: 'center',
    render: (createElement, params) => renderDayContent(createElement, params)
  }
]

function renderDayContent(createElement, params) {
  const {
    row,
    column
  } = params
  const {
    name,
    content,
  } = row[column.key]
  const text = (name && content) ? `
    类型: ${name}
    内容: ${content}
  ` : '暂无内容'
  return createElement('List', {
    name: `component-${column.key}`,
    props: {
      // size: 'large',
      // color: row.noon === '上午' ? 'green' : 'gold'
    },
    style: {
      color: row.noon === '上午' ? 'lime' : 'orange',
    }
  }, text)
}