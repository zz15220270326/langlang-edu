<template>
  <div class="garden-report">
    <select-page
      :selectTabs="selectTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div class="wrapper" slot="page1">
        <a-table />
      </div>
      <div class="wrapper" slot="page2">
        <a-info />
      </div>
      <div class="wrapper" slot="page3">
        <analyze />
      </div>
      <div class="wrapper" slot="page4">
        <swipe-card />
      </div>
    </select-page>
    <base-footer />
  </div>
</template>

<script>
// ? components
import SelectPage from '@common/select-tab-page';
import BaseFooter from '@common/base-footer';

import ATable from '../Components/attendance-table/FullAttdance';
import AInfo from '../Components/attadance-report/AttdenceReport';
import Analyze from '../Components/attdance-present/AttdancePresent';
import SwipeCard from '../Components/swipe-card/SwipeCard';

export default {
  name: 'GardenReport',
  components: {
    SelectPage,
    BaseFooter,

    ATable,
    AInfo,
    Analyze,
    SwipeCard
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
      },
      {
        tag: '出勤率分析',
        type: 'default'
      },
      {
        tag: '刷卡记录',
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
