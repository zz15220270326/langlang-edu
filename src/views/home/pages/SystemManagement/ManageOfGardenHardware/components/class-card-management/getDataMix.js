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
      ];
    }
  },
  created() {
    this.getClassCardData()
  }
}