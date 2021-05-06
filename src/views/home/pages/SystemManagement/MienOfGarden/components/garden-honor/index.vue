<template>
  <div class="garden-honor">
    <my-menu
      :selectAllText="selectAllText"
      @handleSelectAll="handleSelectAll"
    />
    <div class="content">
      <my-content ref="childrenContent" @itemSelectChange="itemSelectChange" />
    </div>
  </div>
</template>

<script>
// ? components
import MyMenu from './menu-wrap';
import MyContent from './main-content';

// ? mixins

export default {
  name: 'GardenHonor',
  components: {
    // Querymenu,

    MyMenu,
    MyContent
  },
  data: () => ({
    selectAllText: '全选'
  }),
  methods: {
    // ? menu-functions
    handleSelectAll() {
      const { gardenHonors } = this.$refs.childrenContent._data;
      switch (this.selectAllText) {
        case '全选':
          gardenHonors.forEach(item => (item.isChecked = true));
          this.selectAllText = '全部取消';
          break;
        case '全部取消':
          gardenHonors.forEach(item => (item.isChecked = false));
          this.selectAllText = '全选';
          break;
      }
    },
    // ? content-functions
    itemSelectChange(selectAll) {
      selectAll
        ? (this.selectAllText = '全部取消')
        : (this.selectAllText = '全选');
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.garden-honor {
  .content {
    .full_flex();
  }
}
</style>
