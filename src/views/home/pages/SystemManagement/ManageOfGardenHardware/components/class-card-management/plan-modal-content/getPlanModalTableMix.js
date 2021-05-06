export default {
  data() {
    return {
      planTableTitleList: [],
      planTableDataList: [],
      planTableIsLoading: false,
      total: 0
    };
  },
  methods: {
    getPlanTableData() {
      this.planTableTitleList = [{
          title: '星期',
          key: 'day',
          align: 'center',
          width: 150
        },
        {
          title: '开机时间',
          slot: 'openTime',
          align: 'center'
        },
        {
          title: '关机时间',
          slot: 'closeTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ];
    },
    handleWeekDay(dayX) {
      switch (dayX) {
        case 'day1':
          return '星期一'
        case 'day2':
          return '星期二'
        case 'day3':
          return '星期三'
        case 'day4':
          return '星期四'
        case 'day5':
          return '星期五'
        case 'day6':
          return '星期六'
        case 'day7':
          return '星期天'
      }
    },
  },

  created() {
    this.getPlanTableData();
  }
}