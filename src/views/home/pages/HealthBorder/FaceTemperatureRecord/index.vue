<template>
  <div class="face-testing-record">
    <select-tab-page
      :selectTabs="selectTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div class="page-content" slot="page1">
        <children-test />
      </div>
      <div class="page-content" slot="page2">
        <worker-test />
      </div>
    </select-tab-page>
  </div>
</template>

<script>
// ? import components
import SelectTabPage from '@common/select-tab-page'

import ChildrenTest from './children/ChildrenTest'
import WorkerTest from './worker/WorkerTest'

export default {
  name: 'FaceTestingRecord',
  components: {
    SelectTabPage,

    ChildrenTest,
    WorkerTest
  },
  data: () => ({
    selectTabs: [
      {
        tag: '幼儿测温',
        type: 'primary',
        key: 0
      },
      {
        tag: '职工测温',
        type: 'default',
        key: 1
      }
    ],
    currentIndex: 0
  }),
  methods: {
    handleSelectTab(currentIndex) {
      this.currentIndex = currentIndex
      this.selectTabs.forEach(item =>
        item.key === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default')
      )
    }
  }
}
</script>

<style lang="less" scoped>
.face-testing-record {
  color: #666;
  background-color: #fff;
  .top {
    background-color: #f6f6f6;
    width: 100%;
    padding: 1.2rem 0;
    .ivu-btn {
      width: 6rem;
      margin: 0 1rem;
    }
  }
  .content {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
