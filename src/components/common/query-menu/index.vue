<template>
  <div class="query-menu">
    <slot class="first" name="first"></slot>
    <slot class="second" name="second"></slot>
    <slot class="third" name="third"></slot>
    <slot class="fourth" name="fourth"></slot>
  </div>
</template>

<script>
export default {
  name: 'Querymenu'
}
</script>

<style lang="less" scoped>
.query-menu {
  background-color: #fff;
}
</style>
