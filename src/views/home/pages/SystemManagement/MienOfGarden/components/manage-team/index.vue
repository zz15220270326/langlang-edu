<template>
  <div class="manage-team">
    <my-menu
      :selectAllText="selectAllText"
      @handleSelectAll="handleSelectAll"
      @handleSelectDelete="handleSelectDelete"
    />
    <div class="content">
      <my-content ref="childrenContent" @itemSelectChange="itemSelectChange" />
    </div>
  </div>
</template>

<script>
// ? import components
import MyMenu from './menu-wrap';
import MyContent from './main-content';

// ? request
// ? utils
// ? configs

export default {
  name: 'ManageTeam',
  components: {
    MyMenu,
    MyContent
  },
  data: () => ({
    selectAllText: '全选'
  }),
  methods: {
    // ? menu-functions
    handleSelectAll() {
      const { manageTeamInfo } = this.$refs.childrenContent._data;
      switch (this.selectAllText) {
        case '全选':
          manageTeamInfo.forEach(item => (item.isChecked = true));
          this.selectAllText = '全部取消';
          break;
        case '全部取消':
          manageTeamInfo.forEach(item => (item.isChecked = false));
          this.selectAllText = '全选';
          break;
      }
    },
    handleSelectDelete() {
      let { manageTeamInfo } = this.$refs.childrenContent._data;
      if (manageTeamInfo.every(item => !item.isChecked)) {
        this.$Message.warning('请选择要批量删除的选项');
      } else {
        this.$Modal.confirm({
          title: '批量删除',
          content: '是否删除? 删除后数据无法恢复',
          onOk: () => {
            this.$Message.error('删除成功');
          },
          onCancel: () => {
            this.$Message.success('您取消了本次删除操作');
          }
        });
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
.manage-team {
  .content {
    .full_flex();
  }
}
</style>
