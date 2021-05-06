export default {
  data() {
    return {
      titleList: [],
      dataList: [],
      tableIsLoading: false,
      total: 0,
      totalPage: 0
    };
  },
  methods: {
    getGateListData() {
      this.titleList = [{
          title: '闸机名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '闸机类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '闸机序列号',
          key: 'number',
          align: 'center'
        },
        {
          title: '网络状态',
          key: 'networkStatus',
          align: 'center'
        },
        {
          title: '添加时间',
          key: 'addTime',
          align: 'center'
        }
      ];
    }
  },
  created() {
    this.getGateListData();
  }
}