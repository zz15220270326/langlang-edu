const titleList = [{
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 80,
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 360
  },
  {
    title: '班级',
    key: 'class',
    width: 100
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 100
  },
  {
    title: '发送时间',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];

export default titleList;