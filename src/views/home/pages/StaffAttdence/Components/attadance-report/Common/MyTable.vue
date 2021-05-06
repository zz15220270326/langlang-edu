<template>
  <Table
    :border="true"
    :columns="titleList"
    :data="dataList"
    :height="dataList.length > 5 ? 400 : undefined"
  ></Table>
</template>

<script>
export default {
  name: 'MyTable',
  components: {},
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoepd></style>
