<template>
  <div class="personal-report">
    <select-tab-page
      :selectTabs="selectTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div class="wrapper" slot="page1">
        <p-table />
      </div>
      <div class="wrapper" slot="page2">
        <p-info />
      </div>
    </select-tab-page>
  </div>
</template>

<script>
// ? components
import SelectTabPage from '@common/select-tab-page';

import PTable from '../Components/attendance-table/PersonalAttdance';
import PInfo from '../Components/attadance-report/PersonalReport';

export default {
  name: 'PersonalReport',
  components: {
    SelectTabPage,

    PInfo,
    PTable
  },
  data: () => ({
    selectTabs: [
      {
        tag: '考勤明细',
        type: 'primary'
      },
      {
        tag: '考勤报表',
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

<style lang="less" scoped></style>
