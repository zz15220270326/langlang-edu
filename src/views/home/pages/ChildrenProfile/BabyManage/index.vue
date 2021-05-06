<template>
  <div class="children-info">
    <select-page
      :selectTabs="selectTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="selectPage"
    >
      <div class="wrapper" slot="page1">
        <inside-children />
      </div>
      <div class="wrapper" slot="page2">
        <leave-children />
      </div>
    </select-page>
  </div>
</template>

<script>
// ? components
import SelectPage from '@common/select-tab-page'

import InsideChildren from './pages/inside-children'
import LeaveChildren from './pages/leave-children'

export default {
  name: 'ChildrenInfo',
  components: {
    SelectPage,

    InsideChildren,
    LeaveChildren
  },
  data: () => ({
    selectTabs: [
      {
        tag: '在园幼儿',
        type: 'primary'
      },
      {
        tag: '离园幼儿',
        type: 'default'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    selectPage(currentIndex) {
      this.currentIndex = currentIndex
      this.selectTabs.forEach((item, index) =>
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default')
      )
    }
  }
}
</script>

<style lang="less" scoped>
.children-info {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  color: #666;
  .title {
    padding: 0.8rem 0;
    background-color: #fff;
    .ivu-btn {
      margin: 0 0.8rem;
      width: 6rem;
    }
  }
}
</style>
