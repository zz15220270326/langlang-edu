<template>
  <div class="children-attdance">
    <div class="select-tab">
      <Button
        v-for="(item, key) in selectTabs"
        :key="key"
        :type="item.type"
        @click.native="handleSelectTab(key)"
      >
        {{ item.tag }}
      </Button>
      <div class="content" v-show="currentIndex === 0">
        <attdance-info />
      </div>
      <div class="content" v-show="currentIndex === 1">
        <class-attdance />
      </div>
      <div class="content" v-show="currentIndex === 2">
        <grade-attdance />
      </div>
    </div>
  </div>
</template>

<script>
// ? import components
import AttdanceInfo from './attdance-info';
import ClassAttdance from './class-attdance';
import GradeAttdance from './grade-attdance';

// ? import mixins

export default {
  name: 'ChildrenAttdance',
  components: {
    AttdanceInfo,
    ClassAttdance,
    GradeAttdance
  },
  data: () => ({
    selectTabs: [
      {
        tag: '考勤明细',
        type: 'primary'
      },
      {
        tag: '班级考勤分析',
        type: 'default'
      },
      {
        tag: '年级考勤分析',
        type: 'default'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    handleSelectTab(currentIndex) {
      this.currentIndex = currentIndex;
      this.selectTabs.forEach((item, index) => {
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.children-attdance {
  .select-tab {
    background-color: #fff;
    padding: 0.88rem 0;
    .ivu-btn {
      margin: 0 0.8rem;
    }
  }
}
</style>
