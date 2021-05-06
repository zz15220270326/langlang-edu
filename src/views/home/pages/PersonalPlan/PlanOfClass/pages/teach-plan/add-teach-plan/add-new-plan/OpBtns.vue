<template>
  <div class="operation-buttons">
    <Button type="primary" @click.native="savePlan">保存</Button>
    <Button type="error" @click.native="cancelAddPlan">取消</Button>
  </div>
</template>

<script>
export default {
  name: 'OpBtns',
  methods: {
    savePlan() {
      this.$emit('savePlan');
    },
    cancelAddPlan() {
      this.$Message.info('您取消了本次操作');
      this.$emit('cancelAddPlan');
    }
  }
};
</script>

<style lang="less" scoped>
.operation-buttons {
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-btn {
    margin: 0 0.6rem;
    width: 5.4rem;
  }
}
</style>
