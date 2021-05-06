export const titleList = [
  {
    type: 'selection',
    width: 80,
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
    key: 'realname',
    width: 170,
    align: 'center'
  },
  {
    title: '性别',
    slot: 'sex',
    width: 100,
    align: 'center'
  },
  {
    title: '手机号',
    key: 'mobile',
    width: 180,
    align: 'center'
  },
  {
    title: '负责班级',
    key: 'manageClass',
    width: 400,
    align: 'center'
  },
  {
    title: '职位',
    key: 'name',
    width: 170,
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    width: 380,
    align: 'center'
  }
];

export const itemOperations = [
  {
    tag: '详情',
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
];