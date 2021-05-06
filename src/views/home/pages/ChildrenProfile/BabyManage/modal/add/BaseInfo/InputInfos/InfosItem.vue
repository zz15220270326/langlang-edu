<template>
  <div class="wrapper">
    <slot name="tag" class="tag"></slot>
    <slot name="content" class="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'InfoItems'
};
</script>

<style lang="less" scoped>
#flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
