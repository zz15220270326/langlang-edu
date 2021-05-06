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
      ];
    }
  },
  created() {
    this.getGardenCardData()
  }
}