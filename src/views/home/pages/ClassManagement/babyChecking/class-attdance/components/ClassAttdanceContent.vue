<template>
  <div class="class-attdance-content">
    <Table
      :border="border"
      :columns="titleList"
      :data="dataList"
      :loading="isLoading"
    />
  </div>
</template>

<script>
export default {
  name: 'ClassAttdanceContent',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-attdance-content {
  width: 100%;
  margin: 1.6rem 0.2rem;
  .full_flex();
}
</style>
