const classAttdanceInfo = [
  {
    class_name: '朗云小班',
    should_arrive: 20,
    is_arrived: 1,
    absense: 19,
    attdance_present: '5%'
  },
  {
    class_name: '朗云3班中班级',
    should_arrive: 2,
    is_arrived: 0,
    absense: 2,
    attdance_present: '0%'
  },
  {
    class_name: '计算机201',
    should_arrive: 1,
    is_arrived: 0,
    absense: 1,
    attdance_present: '0%'
  }
];

export default {
  data() {
    return {
      classAttdanceTitleList: [],
      classAttdanceDataList: []
    }
  },
  methods: {
    getClassAttdanceData() {
      this.classAttdanceTitleList = [
        {
          title: '班级名称',
          key: 'className',
          align: 'center'
        },
        {
          title: '应到',
          key: 'shouldArrive',
          align: 'center'
        },
        {
          title: '实到',
          key: 'isArrived',
          align: 'center'
        },
        {
          title: '缺勤',
          key: 'absense',
          align: 'center'
        },
        {
          title: '出勤率',
          key: 'attdancePresent',
          align: 'center'
        }
      ]
      setTimeout(() => {
        const result = classAttdanceInfo
        if (result.msg === 'Success' && result.data) {
          this.classAttdanceDataList = []
          const dataList = result.data
          dataList.map(item => {
            this.classAttdanceDataList.push({
              className: item.class_name,
              shouldArrive: item.should_arrive,
              isArrived: item.is_arrived,
              absense: item.absense,
              attdancePresent: item.attdance_present
            })
          })
        }
      }, 600);
    }
  },
  created() {
    this.getClassAttdanceData()
  }
}
