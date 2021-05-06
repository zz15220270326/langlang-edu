export default {
  data() {
    return {
      operations: [
        {
          tag: '查询',
          type: 'primary'
        },
        {
          tag: '删除',
          type: 'error'
        },
        {
          tag: '导出',
          type: 'success'
        }
      ]
    };
  },
  methods: {
    handleAll(info) {
      // ? 设置查询时的参数
      const params = {
        pageSize: 20,
        page_size: 20
      };
      // this.currentClassId.indexOf(',') === -1
      if (this.currentClassId > 0) {
        // params.classId = this.currentClassId * 1
        console.log(this.currentClassId);
        params.classId = this.currentClassId * 1;
      }
      if (this.year.indexOf('2') !== -1) {
        params.year = this.year * 1;
      }
      if (this.semester && this.semester !== 0) {
        params.semester = this.semester * 1;
      }
      if (this.week && this.week !== 0) {
        params.week = this.week * 1;
      }
      if (this.status === 0 || this.status === 1) {
        params.isRemarked = this.status * 1;
      } else delete params.isRemarked;
      // console.log(params);
      this.$emit('handleAll', info, params);
    },
    // ? 菜单从左到右
    addTeachPlan() {
      this.$emit('addTeachPlan');
    },
    addYearPlan() {
      this.$emit('addYearPlan');
    }
  },
  created() {}
}