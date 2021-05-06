<template>
  <div class="title">
    <Button type="success" @click="openAddModal">
      添加班次
      <Icon type="md-add" />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ClassesManagementTitleMenu',
  methods: {
    openAddModal() {
      this.$emit('openAddModal');
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  text-align: right;
  padding: 1rem 0;
  .ivu-btn {
    width: 6.6rem;
    margin-right: 1.2rem;
  }
}
</style>
