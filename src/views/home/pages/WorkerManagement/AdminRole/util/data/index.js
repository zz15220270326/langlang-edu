export const titleList = [{
    type: 'selection',
    width: 80,
    align: 'center'
  },
  {
    title: '序号',
    width: 100,
    key: 'number',
    align: 'center'
  },
  {
    title: '名称',
    key: 'name',
    align: 'center'
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
]

export const operations = [{
    tag: '授权',
    type: 'success'
  },
  {
    tag: '编辑',
    type: 'primary'
  },
  {
    tag: '删除',
    type: 'error'
  }
]