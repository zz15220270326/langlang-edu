<template>
  <div class="success-tip">
    <Alert :show-icon="true" type="success">
      修改成功
      <template slot="desc">
        <div class="tip-info">您已成功修改手机号</div>
      </template>
      <div slot="close" class="close-info"></div>
    </Alert>
  </div>
</template>

<script>
export default {
  name: 'Step3',

  created() {
    this.$Message.info('在2秒之后返回');
    setTimeout(() => {
      this.$emit('resetStep');
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.success-tip {
  background-color: #fff;
  height: 44.8rem;
}
</style>
