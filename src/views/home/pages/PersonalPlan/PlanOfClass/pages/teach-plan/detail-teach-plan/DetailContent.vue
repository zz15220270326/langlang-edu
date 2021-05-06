<template>
  <div class="body">
    <Table
      border
      :columns="titleList"
      :data="dataList"
      :span-method="handleSpan"
      :loading="isLoading"
    >
      <!-- slot="workDay" -->
      <div class="info-item" slot-scope="{ row, index }" slot="mon">
        <detail-item :row="row" :index="index" day="mon" />
      </div>
      <div class="info-item" slot-scope="{ row, index }" slot="tue">
        <detail-item :row="row" :index="index" day="tue" />
      </div>
      <div class="info-item" slot-scope="{ row, index }" slot="wed">
        <detail-item :row="row" :index="index" day="wed" />
      </div>
      <div class="info-item" slot-scope="{ row, index }" slot="thu">
        <detail-item :row="row" :index="index" day="thu" />
      </div>
      <div class="info-item" slot-scope="{ row, index }" slot="fri">
        <detail-item :row="row" :index="index" day="fri" />
      </div>
    </Table>
  </div>
</template>

<script>
// ? detail-item
import DetailItem from './detail-content/DetailItem'

export default {
  name: 'DetailContent',

  components: {
    DetailItem
  },
  props: {
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
  },

  data: () => ({}),

  computed: {},

  methods: {
    handleSpan({ rowIndex, columnIndex }) {
      this.$emit('handleSpan', rowIndex, columnIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  background-color: skyblue;
  margin: 1.2rem 0;
}
</style>
