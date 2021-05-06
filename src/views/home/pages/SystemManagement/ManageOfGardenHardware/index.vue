<template>
  <div class="hardware-management">
    <select-tab-page
      :selectTabs="tabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div slot="page1" class="class-card-management">
        <class-card-management />
      </div>
      <div slot="page2" class="garden-card-management">
        <garden-card-management />
      </div>
      <div slot="page3" class="gate-list">
        <gate-list />
      </div>
    </select-tab-page>
  </div>
</template>

<script>
// ? import components
// ?? common
import SelectTabPage from '@common/select-tab-page';
// ?? children
import ClassCardManagement from './pages/class-card';
import GardenCardManagement from './pages/garden-card';
import GateList from './pages/gate-list';

export default {
  name: 'HardwareManagement',
  components: {
    SelectTabPage,

    ClassCardManagement,
    GardenCardManagement,
    GateList
  },
  data: () => ({
    tabs: [
      {
        tag: '班牌管理',
        type: 'primary'
      },
      {
        tag: '园牌管理',
        type: 'default'
      },
      {
        tag: '闸机列表',
        type: 'default'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    handleSelectTab(currentIndex) {
      this.currentIndex = currentIndex;
      this.tabs.forEach((item, index) => {
        index === currentIndex
          ? (item.type = 'primary')
          : (item.type = 'default');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.hardware-management {
  color: #666;
}
</style>
