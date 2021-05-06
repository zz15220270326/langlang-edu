<template>
  <div class="class-plan">
    <select-tabs
      :selectTabs="selectPlan"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectPlan"
    >
      <div class="wrapper" slot="page1">
        <teach-plan />
      </div>
      <div class="wrapper" slot="page2">
        <other-plan />
      </div>
    </select-tabs>
  </div>
</template>

<script>
// ? components
import SelectTabs from '@common/select-tab-page';

import TeachPlan from './components/teach-plan';
import OtherPlan from './components/other-plan';

export default {
  name: 'ClassPlan',
  components: {
    SelectTabs,

    OtherPlan,
    TeachPlan
  },
  data() {
    return {
      selectPlan: [
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
    };
  },
  methods: {
    handleSelectPlan(currentIndex) {
      this.currentIndex = currentIndex;
      this.selectPlan.forEach((item, index) =>
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default')
      );
    }
  }
};
</script>

<style lang="less" scoped>
.class-plan {
  .title {
    width: 100%;
    margin: 0 0 1rem 0;
    padding: 0 0.8rem;
    .ivu-btn {
      margin: 0 0.5rem;
      width: 6rem;
      // &:hover {
      //   border-color: #2db7f5;
      // }
    }
  }
}
</style>
