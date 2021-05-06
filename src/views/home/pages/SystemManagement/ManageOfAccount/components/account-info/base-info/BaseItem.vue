<template>
  <div class="item-wrapper">
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
  padding: 1rem 0;
  .full_flex();
  .tag {
    flex: 2;
    text-align: right;
    margin-right: 6rem;
  }
  .content {
    flex: 7;
    margin-right: 16rem;
  }
}
.item-wrapper {
  .common-content;
}
</style>
