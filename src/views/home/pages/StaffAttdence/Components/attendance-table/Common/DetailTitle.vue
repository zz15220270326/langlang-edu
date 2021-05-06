<template>
  <div class="title">
    <h1>{{ yM }}月{{ identify }}考勤明细</h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    yM: {
      type: String,
      default: ''
    },
    identify: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
