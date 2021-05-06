const operation = {
  tag: '编辑',
  type: 'primary'
};

const titleList = [
  {
    title: '星期',
    key: 'week',
    align: 'center'
  },
  {
    title: '开机时间',
    key: 'openTime',
    align: 'center'
  },
  {
    title: '关机时间',
    key: 'closeTime',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operation',
    align: 'center'
  }
];

const dataList = [
  {
    week: '星期一',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期二',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期三',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期四',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期五',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期六',
    openTime: '',
    closeTime: '',
    operation: operation
  },
  {
    week: '星期天',
    openTime: '',
    closeTime: '',
    operation: operation
  },
];

export {
  titleList,
  dataList
};