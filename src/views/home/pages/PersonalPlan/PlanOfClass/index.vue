<template>
  <!-- 班级计划 -->
  <div class="class-plan">
    <select-tab-page
      :selectTabs="pageTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="selectChild"
    >
      <div slot="page1" class="plan-content">
        <teach-plan />
      </div>
      <div slot="page2" class="plan-content">
        <other-plan />
      </div>
    </select-tab-page>
  </div>
</template>

<script>
// ? import components
import SelectTabPage from '@common/select-tab-page';
import TeachPlan from './pages/teach-plan';
import OtherPlan from './pages/other-plan';

export default {
  name: 'ClassPlan',
  components: {
    SelectTabPage,
    TeachPlan,
    OtherPlan
  },
  data: () => ({
    pageTabs: [
      {
        tag: '教学计划',
        type: 'primary'
      },
      {
        tag: '其他计划',
        type: 'default'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    selectChild(currentIndex) {
      this.currentIndex = currentIndex;
      this.pageTabs.forEach((item, index) => {
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.class-plan {
  background-color: #fff;
  height: 100%;
}
</style>
