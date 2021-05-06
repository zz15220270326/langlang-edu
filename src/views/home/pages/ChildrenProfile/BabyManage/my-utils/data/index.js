export const titleList = [{
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 100,
    align: 'center'
  },
  {
    title: '姓名',
    key: 'infantName',
    width: 130,
    align: 'center'
  },
  {
    title: '性别',
    key: 'gender',
    width: 100,
    align: 'center'
  },
  {
    title: '年龄',
    key: 'age',
    width: 100,
    align: 'center'
  },
  {
    title: '所在班级',
    key: 'className',
    width: 130,
    align: 'center'
  },
  {
    title: '家长账号',
    key: 'parentAccount',
    width: 300,
    align: 'center'
  },
  {
    title: '入园日期',
    key: 'inGardenDate',
    width: 200,
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
]

export const operations = [{
    tag: '详情',
    type: 'info'
  },
  {
    tag: '编辑',
    type: 'primary'
  },
  {
    tag: '离园',
    type: 'warning'
  },
  {
    tag: '删除',
    type: 'error'
  }
]