<template>
  <div class="garden-specialty">
    <!-- <select-tab-page
      :selectTabs="operations"
      :crtIdx="crtIdx"
      @handleSelectTab="handleSelectTab"
    >
      <div slot="page1">
        <garden-scene />
      </div>
      <div slot="page2">
        <manage-team />
      </div>
      <div slot="page3">
        <garden-honor />
      </div>
    </select-tab-page> -->
    <Tabs name="appearance">
      <TabPane label="园所风貌" name="appearance">
        <garden-scene />
      </TabPane>
      <TabPane label="管理团队" name="manageTeam">
        <manage-team />
      </TabPane>
      <TabPane label="园所荣誉" name="gardenHonor">
        <garden-honor />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// ? import components
// ?? common-components
// import SelectTabPage from '@common/select-tab-page';
// ?? children
import GardenScene from './components/garden-scene';
import ManageTeam from './components/manage-team';
import GardenHonor from './components/garden-honor';

export default {
  name: 'GardenSpecialty',
  components: {
    GardenScene,
    ManageTeam,
    GardenHonor
  },
  data: () => ({
    operations: [
      {
        tag: '园所风貌',
        type: 'primary'
      },
      {
        tag: '管理团队',
        type: 'default'
      },
      {
        tag: '园所荣誉',
        type: 'default'
      }
    ],
    crtIdx: 0
  }),
  methods: {
    handleSelectTab(crtIdx) {
      this.crtIdx = crtIdx;
      this.operations.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.garden-specialty {
  color: #666;
}
</style>
