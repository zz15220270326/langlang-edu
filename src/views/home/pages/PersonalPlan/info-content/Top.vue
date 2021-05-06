<template>
  <div class="top">
    <h1>{{ infoTitle }}</h1>
    <h2>{{ infoTime }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Top',
  props: {
    infoTitle: {
      type: String,
      default: ''
    },
    infoTime: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  padding: 1.2rem;
  text-align: center;
}
</style>
