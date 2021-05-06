<template>
  <div class="basic-setting">
    <select-tab-page
      :selectTabs="tabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div slot="page1" class="content">
        <weektime-setting />
      </div>
      <div slot="page2" class="content">
        <control-setting />
      </div>
    </select-tab-page>
  </div>
</template>

<script>
// ? import components
import SelectTabPage from '@common/select-tab-page';

import WeektimeSetting from './components/week-time-setting';
import ControlSetting from './components/control-setting';

// ? import mixins

export default {
  name: 'BasicSetting',
  components: {
    SelectTabPage,

    WeektimeSetting,
    ControlSetting
  },
  data: () => ({
    tabs: [
      {
        tag: '周次设置',
        type: 'primary'
      },
      {
        tag: '管控设置',
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
.basic-setting {
  color: #666;
}
</style>
