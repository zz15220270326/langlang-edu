<template>
  <div class="attdance-setting">
    <select-page
      :selectTabs="selectTabs"
      :currentIndex="currentIndex"
      @handleSelectTab="handleSelectTab"
    >
      <div class="page-content" slot="page1">
        <rules />
      </div>
      <div class="page-content" slot="page2">
        <settings />
      </div>
    </select-page>
  </div>
</template>

<script>
// ? import components
import SelectPage from '@common/select-tab-page';
import Rules from './attdance-rules/AttdanceRules';
import Settings from './attdance-type-setting';

export default {
  name: 'AttdanceSetting',
  components: {
    SelectPage,

    Rules,
    Settings
  },
  data: () => ({
    selectTabs: [
      {
        tag: '考勤规则',
        type: 'primary'
      },
      {
        tag: '假期类型设置',
        type: 'default'
      }
    ],
    currentIndex: 0
  }),
  methods: {
    handleSelectTab(crtIdx) {
      this.currentIndex = crtIdx;
      this.selectTabs.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
