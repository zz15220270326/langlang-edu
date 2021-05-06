<template>
  <querymenu>
    <div slot="first" class="item">
      <Tag color="orange">学年:</Tag>
      <select-menu
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
    </div>
    <div slot="second" class="item">
      <Tag color="pink">学期:</Tag>
      <select-menu
        :listTitle="semesterTitle"
        :listItems="semesterList"
        @handleSelect="selectSemester"
      />
    </div>
    <div slot="third" class="item">
      <Tag color="orange">周次:</Tag>
      <select-menu
        :listTitle="weekTimeTitle"
        :listItems="weekTimeList"
        @handleSelect="selectWeekTime"
      />
    </div>
    <div slot="fourth" class="item">
      <Tag size="large" color="lime">选择班级:</Tag>
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <Tag size="large" color="green">时间方案:</Tag>
      <select-menu
        :listTitle="planTitle"
        :listItems="planList"
        @handleSelect="selectPlan"
      />
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getYearMixs from '@/mixins/Common/getYearMixins';
import getSemesterMixs from '@/mixins/Common/getSemesterMixins';
import getWeekTimeMixs from '@/mixins/Common/getWeekTimeMixins';
import getClassMixs from '@/mixins/Common/getClassMixins';
import getPlansMix from '@/mixins/plan/getPlansMix';

export default {
  name: 'LeftSelects',
  components: {
    Querymenu,
    SelectMenu
  },
  mixins: [
    getYearMixs,
    getSemesterMixs,
    getWeekTimeMixs,
    getClassMixs,
    getPlansMix
  ],
  methods: {
    handleBeforeEdit() {
      this.$bus.$on('handleEditTeachPlanInfo', edits => {
        const { id } = edits;
        if (id > 0) {
          this.handleEditYear(edits);
          this.handleEditSemester(edits);
          this.handleEditWeek(edits);
          this.handleEditClass(edits);
          this.handleEditPlan(edits);
        }
      });
    },
    handleEditYear(edits) {
      const { year } = edits;
      this.year = year.toString();
      this.yearTitle = `${year}-${year + 1}学年`;
    },
    handleEditSemester(edits) {
      const { semester } = edits;
      this.semester = semester.toString();
      this.semesterTitle =
        semester === 1 ? '第一学期' : semester === 2 ? '第二学期' : '未知学期';
    },
    handleEditWeek(edits) {
      const { week } = edits;
      this.week = week;
      this.weekTimeTitle = `第${week}周`;
    },
    handleEditClass(edits) {
      const { className, classId } = edits;
      this.classTitle = className;
      this.currentClassId = classId;
    },
    handleEditPlan() {
      // console.log(edits)
      // const { planId, planName } = edits
    },
    handleBeforeAdd() {
      this.$bus.$on('clearEditTeachPlanInfo', () => {
        this.year = '选择学年';
        this.yearTitle = '选择学年';
        this.semester = 0;
        this.semesterTitle = '全部学期';
        this.week = 0;
        this.weekTimeTitle = '全部周次';
        this.currentClassId = this.classList[0].classId;
        this.classTitle = this.classList[0].info;
        this.planTitle = this.planList[0].info;
        this.planId = this.planList[0].planId;
        this.planIndex = 0;
        // ? 同步到请求数据中
        // this.$emit('handleUploadYear', this.year);
        // this.$emit('uploadSemester', this.semester);
        // this.$emit('uploadWeekTime', this.week);
        // this.$emit('getClassId', this.currentClassId);
      });
    }
  },

  mounted() {
    // ? add
    this.handleBeforeAdd();
    // ? edit
    this.handleBeforeEdit();
  }
};
</script>

<style lang="less" scoped>
.flex_common() {
  width: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  justify-content: space-evenly;
}
.flex-item {
  width: 30%;
  margin: 0.8rem 0;
}
.query-menu {
  margin: 1rem 0;
  .flex_common();
  flex-wrap: wrap;
  .item {
    .flex-item;
    &:last-child {
      .flex_common();
    }
  }
}
</style>
