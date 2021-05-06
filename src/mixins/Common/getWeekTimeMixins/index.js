const weekTimeList = require('@/source/weekTimeList');

export default {
  data() {
    return {
      weekTimeTitle: '',
      weekTimeList: [],
      week: 0 // ? 0代表全部周次
    };
  },
  methods: {
    getWeekTimeData() {
      const { items } = weekTimeList.data;
      this.weekTimeTitle = items[0].info ? items[0].info : '';
      this.weekTimeList = items;
    },
    selectWeekTime(selectWeekTime) {
      this.weekTimeTitle = selectWeekTime.info;
      this.week = selectWeekTime.key;
      this.$emit('uploadWeekTime', this.week);
    }
  },
  created() {
    this.getWeekTimeData();
  }
}