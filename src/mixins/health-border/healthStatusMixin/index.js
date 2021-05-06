export default {
  data() {
    return {
      healthStatusTitle: '',
      healthStatusList: [{
          info: '健康状态',
          key: 0
        },
        {
          info: '正常',
          key: 1
        },
        {
          info: '需要观察',
          key: 2
        },
        {
          info: '传染病风险',
          key: 3
        }
      ],
      healthCondition: 0
    }
  },
  methods: {
    gethealthStatusData() {
      this.healthStatusTitle = this.healthStatusList[0].info ? this.healthStatusList[0].info : ''
    },
    selectHealthStatus(selectItem) {
      this.healthStatusTitle = selectItem.info
      this.healthCondition = selectItem.key
    }
  },
  created() {
    this.gethealthStatusData()
  }
}