<template>
  <div class="header">
    <div class="first-title">
      <h1>{{ firstTitle }}</h1>
    </div>
    <div class="second-title">{{ secondTitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  props: {
    firstTitle: {
      type: String,
      default: ''
    },
    secondTitle: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  .first-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .second-title {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
