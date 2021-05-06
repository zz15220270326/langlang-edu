<template>
  <div class="footer">
    <Button type="primary" @click.native="handleEdit">批量编辑</Button>
    <Button type="success" @click.native="handleAdd">批量添加</Button>
    <Button type="error" @click.native="handleCancel">取消</Button>
  </div>
</template>

<script>
export default {
  name: 'PTSFooter',
  methods: {
    handleEdit() {
      this.$emit('handleEdit');
    },
    handleAdd() {
      this.$emit('handleAdd');
    },
    handleCancel() {
      this.$emit('handleCancel');
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  height: 20%;
  width: 100%;
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-btn {
    width: 7rem;
    margin: 0 0.75rem;
  }
}
</style>
