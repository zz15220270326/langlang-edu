<template>
  <div class="main-table" v-if="dataList.length">
    <Table
      border
      :columns="titleList"
      :data="dataList"
      :loading="tableIsLoading"
      :height="height"
    />
  </div>
</template>

<script>
export default {
  name: 'MainTable',

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
    },
    height: {
      type: Number,
      default: 200
    }
  },

  computed: {},

  methods: {}
}
</script>

<style lang="less" scoped></style>
