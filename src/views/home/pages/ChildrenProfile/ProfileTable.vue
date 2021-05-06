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
      <!-- :height="dataList.length > 8 ? 450 : undefined" -->
      <!-- :height="dataList.length > 8 ? 500 : undefined" -->
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, key) in row.operations"
          :key="key"
          :type="item.type"
          @click.native="handleTableItem(index, item.tag)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'ProfileTable',
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
    handleTableItem(itemIdx, btnTag) {
      switch (btnTag) {
        case '详情':
          this.openInfoModal(itemIdx)
          break
        case '编辑':
          this.openEditModal(itemIdx)
          break
        case '离园':
          this.setLeaveGarden(itemIdx)
          break
        case '删除':
          this.deleteSingleItem(itemIdx)
          break
        case '入园':
          this.setIntoGarden(itemIdx)
      }
    },
    openInfoModal(itemIdx) {
      const infantId =
        this.dataList[itemIdx].infantId || this.dataList[itemIdx].id
      const { name } = this.dataList[itemIdx]
      this.$emit('openInfoModal', infantId, name)
    },
    openEditModal(itemIdx) {
      const infantId =
        this.dataList[itemIdx].infantId || this.dataList[itemIdx].id
      this.$emit('openEditModal', infantId)
    },
    setLeaveGarden(itemIdx) {
      this.$Modal.confirm({
        title: '设置离园',
        content: `幼儿离园后会进入"离园幼儿"模块, 请谨慎操作, 是否确定?`,
        onOk: () => this.$emit('setLeaveGarden', itemIdx)
      })
    },
    deleteSingleItem(itemIdx) {
      this.$Modal.confirm({
        title: '设置删除',
        content: `删除幼儿后,相关数据不可恢复,请谨慎操作,是否确定?`,
        onOk: () => this.$emit('deleteSingleItem', itemIdx)
      })
    },
    setIntoGarden(itemIdx = 0) {
      this.$Modal.confirm({
        title: '设置入园',
        content: '确认操作 ?',
        onOk: () => this.$emit('setIntoGarden', itemIdx)
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
