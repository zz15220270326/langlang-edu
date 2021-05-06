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
      <!-- :height="dataList.length > 10 ? 600 : undefined" -->
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
  name: 'CMTable',
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
    handleTableItem(itemIdx, btnIdx) {
      this.$emit('handleTableItem', itemIdx, btnIdx)
      switch (btnIdx) {
        case 0:
          this.handleFirst(itemIdx)
          break
        case 1:
          this.handleEditModal(itemIdx)
          break
        case 2:
          this.handleDelete(itemIdx)
      }
    },
    handleFirst(itemIdx = 0) {
      const { id, operations } = this.dataList[itemIdx],
        { tag } = operations[0]
      this.$Modal.confirm({
        title: tag,
        content: '确认操作?',
        onOk: () => {
          switch (tag) {
            case '升班':
              this.handleClassUpgrade(id)
              break
            case '毕业':
              this.handleGraduate(id)
              break
          }
        }
      })
    },
    handleClassUpgrade(id) {
      this.$emit('handleClassUpgrade', id)
    },
    handleGraduate(id) {
      this.$emit('handleGraduate', id)
    },
    handleEditModal(itemIdx) {
      const { id } = this.dataList[itemIdx]
      this.$emit('openEditModal', id)
    },
    handleDelete(itemIdx) {
      const ids = this.dataList[itemIdx].id
      this.$Modal.confirm({
        title: '删除选中内容',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => this.$emit('deleteItem', ids)
      })
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
