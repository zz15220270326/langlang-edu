// ? async-functions / mock-data
const mockGardenCardData = {
  "status": "Success",
  "msg": "查询成功",
  "code": 0,
  "data": {
    "total": 10,
    "items": [
      {
        "name": "园牌911",
        "number": "98EA7069AE854E6802AF4DBB8DD02911",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌A89",
        "number": "5F195D2414DD123D433BC9AAF7F85A89",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌B32",
        "number": "7B18EEB91F7BFA7EBA2BCF3F7BDA2B32",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌C02",
        "number": "1040849CDD5BBCA2499C1D78C8482C02",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌DCD",
        "number": "A72FF1F6CC411BCDB92D1FDEA76CBDCD",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌BB8",
        "number": "FE157894BF7CB4D04065057A8063FBB8",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌4BD",
        "number": "C1BD5692D3D710064DDAF6CAB60804BD",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌26F",
        "number": "420F3EAEF39976434D1CFA0A210EC26F",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": ""
      },
      {
        "name": "园牌666",
        "number": "666",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": "巴拉啦"
      },
      {
        "name": "园牌630",
        "number": "CA643AE428B8E5F38A00F7E6342CE630",
        "login_account": "",
        "login_user": "",
        "network_status": "未连接",
        "account_status": "已退出",
        "desc": "咿呀咿呀呦"
      }
    ]
  }
}


export default {
  data() {
    return {
      titleList: [],
      dataList: [],
      tableIsLoading: false,
      total: 0
    }
  },
  methods: {
    getGardenCardData() {
      this.titleList = [{
          title: '园牌名称',
          key: 'name',
          align: 'center',
          width: 100
        },
        {
          title: '园牌序列号',
          key: 'number',
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
          title: '操作',
          slot: 'operation',
          align: 'center'
        },
      ]
      setTimeout(() => {
        const result = mockGardenCardData
        if (result.status === 'Success' && result.data) {
          const dataSource = result.data
          if (dataSource.total) {
            this.total = dataSource.total
          }
          if (dataSource.items) {
            const {
              items
            } = dataSource
            items.map(item =>
              this.dataList.push({
                name: item.name,
                number: item.number,
                loginAccount: item.login_account,
                loginUser: item.login_user,
                networkStatus: item.network_status,
                accountStatus: item.account_status,
                desc: item.desc,
                operation: {
                  tag: '编辑',
                  type: 'primary'
                }
              })
            )
          }
        }
      }, 600);
    }
  },
  created() {
    this.getGardenCardData()
  }
}