<template>
  <div class="table-content">
    <Table
      border
      ref="selection"
      :columns="titleList"
      :data="dataList"
      :loading="isLoading"
      @on-select-all="getSelectItem"
      @on-select-all-cancel="getSelectItem"
      @on-select="getSelectItem"
      @on-select-cancel="getSelectItem"
    >
      <!-- :height="dataList.length > 7 ? 500 : undefined" -->
      <template slot-scope="{ row }" slot="sex">
        <List>
          {{ row.sex === 1 ? '男' : row.sex === 2 ? '女' : '未知' }}
        </List>
      </template>
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, itmIdx) in row.operations"
          :key="itmIdx"
          :type="item.type"
          class="item-operations"
          @click.native="handleItemOperations(item.tag, index)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'WorkerTable',
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
  methods: {
    getSelectItem(selection) {
      this.$emit('getSelectItem', [...selection]);
    },
    handleItemOperations(tag, index) {
      const table = this.$refs.selection;
      switch (tag) {
        case '详情':
          this.checkItem(index);
          break;
        case '编辑':
          this.editItem(index);
          break;
        case '删除':
          this.deleteItem(index);
          break;
      }
      this.$emit('handleItemOperations', tag, index, table);
    },
    checkItem(index) {
      const { id } = this.dataList[index];
      this.$emit('openInfoModal', id);
    },
    editItem(index = 0) {
      const item = this.dataList[index];
      this.$emit('openEditModal', item);
    },
    deleteItem(index = 0) {
      this.$Modal.confirm({
        title: `删除第${index + 1}项`,
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.dataList[index].id;
          this.$emit('deleteItem', ids);
        }
      });
    }
  },
  mounted() {
    this.$emit('getCrtTable', this.$refs.selection);
  }
};
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .item-operations {
    width: 5rem;
    margin: 0 0.5rem;
  }
}
</style>
