// ? datas
const classBoardTitle = [
  {
    type: 'selection',
    width: 80,
    align: 'center'
  },
  {
    title: '班牌序列号',
    key: 'serialNumber',
    align: 'center',
    width: 360
  },
  {
    title: '登录账号',
    key: 'loginAccount',
    align: 'center'
  },
  {
    title: '登录教师',
    key: 'loginTeacher',
    align: 'center'
  },
  {
    title: '网络状态',
    key: 'networkStatus',
    align: 'center',
    render: (h, params) => renderNetworkStatus(h, params)
  },
  {
    title: '绑定班级',
    key: 'bindClass',
    align: 'center'
  },
  {
    title: '账号状态',
    key: 'accountStatus',
    align: 'center'
  },
  {
    title: '备注',
    key: 'desc',
    align: 'center'
  },
  {
    title: '开关机方案',
    slot: 'machinePlan',
    align: 'center',
    width: 180
  },
  {
    title: '操作',
    slot: 'operation',
    align: 'center'
  }
]
const gardenCardTitle = [
  {
    title: '园牌名称',
    key: 'name',
    align: 'center',
    width: 100
  },
  {
    title: '园牌序列号',
    key: 'serialNumber',
    align: 'center',
    width: 320
  },
  {
    title: '登录账号',
    key: 'loginAccount',
    align: 'center'
  },
  {
    title: '登录用户',
    key: 'loginUser',
    align: 'center'
  },
  {
    title: '网络状态',
    key: 'networkStatus',
    align: 'center',
    render: (h, params) => renderNetworkStatus(h, params)
  },
  {
    title: '账号状态',
    key: 'accountStatus',
    align: 'center'
  },
  {
    title: '备注',
    key: 'desc',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operation',
    align: 'center'
  }]

// ? functions
function handleNetworkText(networkStatus) {
  return networkStatus ? '已连接' : '未连接';
}

function renderNetworkStatus(h, params) {
  const { row } = params;
  return h(
    'div',
    {
      style: {
        color:
          row.networkStatus === '未连接'
            ? '#f00'
            : row.networkStatus === '已连接'
              ? '#0c0'
              : '#666',
        'font-size': '1rem',
        'font-weight': '560'
      }
    },
    row.networkStatus
  );
}

function handleAccountText(accountStatus) {
  return accountStatus ? '已登录' : '已退出';
}

export {
  // ? datas
  classBoardTitle,
  gardenCardTitle,
  // ? functions
  handleNetworkText,
  renderNetworkStatus,
  handleAccountText,
};