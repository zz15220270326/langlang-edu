const titleList = [
  {
    type: 'selection',
    width: 100,
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
    key: 'name',
    width: 150,
    align: 'center'
  },
  {
    title: '性别',
    key: 'gender',
    width: 140,
    align: 'center'
  },
  {
    title: '年龄',
    key: 'age',
    width: 140,
    align: 'center'
  },
  {
    title: '所在班级',
    key: 'className',
    width: 300,
    align: 'center'
  },
  {
    title: '时间',
    key: 'date',
    width: 280,
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
]

const operations = [
  {
    tag: '详情',
    type: 'info'
  },
  {
    tag: '编辑',
    type: 'primary'
  },
  {
    tag: '删除',
    type: 'error'
  },
]

export {
  titleList,
  operations
}