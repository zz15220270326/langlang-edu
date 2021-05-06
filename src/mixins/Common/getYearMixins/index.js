const yearSource = require('@/source/yearList');

export default {
  data() {
    return {
      yearTitle: '',
      yearList: [],
      year: '选择学年',
    };
  },
  methods: {
    getYearData() {
      const result = yearSource;
      const yearList = result.data;
      this.yearTitle = yearList[0].info ? yearList[0].info : '';
      this.yearList = yearList;
    },
    selectYear(selectYear) {
      this.yearTitle = selectYear.info;
      const uploadYear = this.yearTitle.slice(0, 4);
      this.year = uploadYear;
      this.$emit('handleUploadYear', this.year);
    }
  },
  created() {
    this.getYearData();
  }
}