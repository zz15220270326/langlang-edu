<template>
  <div class="week-time">
    <div class="left">选择周次:</div>
    <div class="right">
      <select-menu
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
      <select-menu
        :listTitle="semesterTitle"
        :listItems="semesterList"
        @handleSelect="selectSemester"
      />
      <select-menu
        :listTitle="weekTimeTitle"
        :listItems="weekTimeList"
        @handleSelect="selectWeekTime"
      />
    </div>
  </div>
</template>

<script>
// ? import components
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getWeekTimeMixins from '@/mixins/Common/getWeekTimeMixins';

export default {
  name: 'AddMenu',

  components: {
    SelectMenu
  },

  mixins: [getYearMixins, getSemesterMixins, getWeekTimeMixins],

  data: () => ({}),

  props: {},

  computed: {},

  methods: {
    initAddMenu() {
      this.$bus.$on('initAddMenu', () => {
        this.year = this.yearList[0].info;
        this.yearTitle = this.yearList[0].info;
        this.semester = this.semesterList[0].key;
        this.semesterTitle = this.semesterList[0].info;
        this.week = this.weekTimeList[0].key;
        this.weekTimeTitle = this.weekTimeList[0].info;
        this.handleEmitSelects();
      });
    },
    getEditSelect() {
      this.$bus.$on('getEditSelect', params => {
        if (params.id && params.id > 0) {
          const { year, semester, week } = params;
          this.year = year.toString();
          this.yearTitle = `${year}-${year + 1}学年`;
          this.semester = semester;
          this.semesterTitle =
            semester === 1
              ? '第一学期'
              : semester === 2
              ? '第二学期'
              : '未知学期';
          this.week = week;
          this.weekTimeTitle = `第${week}周`;
          this.handleEmitSelects();
        } else this.initAddMenu();
      });
    },
    handleEmitSelects() {
      this.$emit('handleUploadYear', this.year);
      this.$emit('uploadSemester', this.semester);
      this.$emit('uploadWeekTime', this.week);
    }
  },

  mounted() {
    this.initAddMenu();
    this.getEditSelect();
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.week-time {
  padding: 0.8rem 0;
  .flex-center;
  .left {
    flex: 2;
    text-align: right;
  }
  .right {
    flex: 7;
    width: 100%;
    padding-left: 1.2rem;
  }
}
</style>
