export default {
  data() {
    return {
      gardenHealthTitleList: [],
      gardenHealthDataList: []
    }
  },
  methods: {
    getGardenHealthData() {
      this.gardenHealthTitleList = [
        {
          title: '序号',
          key: 'number',
          align: 'center'
        },
        {
          title: '班级名称',
          key: 'className',
          align: 'center'
        },
        {
          title: '健康人数',
          key: 'healthCount',
          align: 'center'
        },
        {
          title: '异常数量',
          key: 'sickCount',
          align: 'center'
        },
        {
          title: '实测人数',
          key: 'totalCount',
          align: 'center'
        }
      ];
    }
  },
  created() {
    this.getGardenHealthData();
  }
}
