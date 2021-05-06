// ? async-functions / mock-data
const mockClassCardData = {
  "total": 5,
  "items": [{
      "order_number": "4C7C58F6C0BB43DAA80157312673BD53",
      "name": "equipment 1",
      "login_account": "",
      "login_teacher": "",
      "network_status": "未连接",
      "bind_class": "朗云小班",
      "account_status": "已退出",
      "desc": "eee"
    },
    {
      "order_number": "5F195D2414DD123D433BC9AAF7F85A89",
      "name": "equipment 2",
      "login_account": "",
      "login_teacher": "",
      "network_status": "未连接",
      "bind_class": "朗云小班",
      "account_status": "已退出",
      "desc": "ddd"
    },
    {
      "order_number": "2897063B5EAB5E0EC55F08921836E6B8",
      "name": "equipment 3",
      "login_account": "",
      "login_teacher": "",
      "network_status": "未连接",
      "bind_class": "朗云小班",
      "account_status": "已退出",
      "desc": "ccc"
    },
    {
      "order_number": "2D9303BA196033DCF2AACC143ADF222B",
      "name": "equipment 4",
      "login_account": "",
      "login_teacher": "",
      "network_status": "未连接",
      "bind_class": "朗云小班",
      "account_status": "已退出",
      "desc": "bbb"
    },
    {
      "order_number": "98EA7069AE854E6802AF4DBB8DD02911",
      "name": "equipment 5",
      "login_account": "",
      "login_teacher": "",
      "network_status": "未连接",
      "bind_class": "朗云小班",
      "account_status": "已退出",
      "desc": "aaa"
    }
  ]
};

export default {
  data() {
    return {
      titleList: [],
      dataList: [],
      selectItem: [],
      tableIsLoading: false,
      total: 0
    }
  },
  methods: {
    getClassCardData() {
      this.titleList = [{
          type: 'selection',
          width: 80,
          align: 'center'
        },
        {
          title: '班牌序列号',
          key: 'orderNumber',
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
          align: 'center'
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
          slot: 'plan',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ]
      setTimeout(() => {
        const result = mockClassCardData
        if (result.status === 'Success' && result.data) {
          const dataSource = result.data
          if (dataSource.total) {
            this.total = dataSource.total
          }
          if (dataSource.items) {
            const {
              items
            } = dataSource
            items.map(item => {
              this.dataList.push({
                orderNumber: item.order_number,
                name: item.name,
                loginAccount: item.login_account,
                loginTeacher: item.login_teacher,
                networkStatus: item.network_status,
                bindClass: item.bind_class,
                accountStatus: item.account_status,
                desc: item.desc,
                plan: {
                  tag: '开机方案设置',
                  type: 'success'
                },
                operation: {
                  tag: '编辑',
                  type: 'primary'
                }
              })
            })
          }
        }
      }, 500);
    }
  },
  created() {
    this.getClassCardData()
  }
}