<template>
  <div class="swipe-table">
    <Table
      border
      :columns="titleList"
      :data="dataList"
      :loading="tableIsLoading"
      :height="dataList.length > 8 ? 1000 : undefined"
    />
  </div>
</template>

<script>
export default {
  name: 'SwipeTable',

  components: {},

  data: () => ({}),

  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    tableIsLoading: {
      type: Boolean,
      default: false
    }
  },

  computed: {},

  methods: {}
}
</script>

<style lang="less" scoped></style>
