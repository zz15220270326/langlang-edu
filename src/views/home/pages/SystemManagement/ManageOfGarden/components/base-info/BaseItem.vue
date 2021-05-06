<template>
  <div class="base-item">
    <div class="tag">
      <slot name="tag"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseItem'
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-content {
  margin-top: 2rem;
  .full_flex();
  .tag {
    flex: 4;
    text-align: right;
    margin-right: 4rem;
  }
  .content {
    flex: 11;
    margin-right: 8rem;
  }
}
.base-item {
  .common-content;
}
</style>
