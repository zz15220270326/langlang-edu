<template>
  <div class="table-content">
    <Table
      border
      ref="selection"
      :columns="titleList"
      :data="dataList"
      :loading="tableIsLoading"
      @on-select-all="getSelectItem"
      @on-select-all-cancel="getSelectItem"
      @on-select="getSelectItem"
      @on-select-cancel="getSelectItem"
    >
      <!-- width="1380" -->
      <!-- :height="dataList.length > 3 ? 450 : undefined" -->
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, key) in row.operations"
          :key="key"
          :type="item.type"
          @click.native="handleTableItem(index, key)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'HBTable',
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
  methods: {
    getSelectItem(selectItem) {
      this.$emit('getSelectItem', selectItem)
    },
    handleTableItem(index, key) {
      this.$emit('handleTableItem', index, key)
    }
  },
  mounted() {
    this.$emit('getTable', this.$refs.selection)
  }
}
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 2rem;
  .ivu-btn {
    margin: 0 0.5rem;
    width: 5.3rem;
  }
}
</style>
