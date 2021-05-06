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
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, key) in row.operations"
          :key="key"
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
  name: 'AuthTable',
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
      switch (tag) {
        case '授权':
          this.handleAuth(index);
          break;
        case '编辑':
          this.handleEdit(index);
          break;
        case '删除':
          this.handleDelete(index);
          break;
      }
    },
    handleAuth(crtIdx) {
      const { id } = this.dataList[crtIdx];
      this.$emit('handleAuth', id);
    },
    handleEdit(crtIdx) {
      this.$emit('handleEdit', crtIdx);
    },
    handleDelete(crtIdx) {
      this.$Modal.confirm({
        title: `删除第${crtIdx + 1}条数据`,
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
        onOk: () => {
          const { id } = this.dataList[crtIdx];
          this.$emit('deleteItem', id);
        }
      });
    },
    emitTable() {
      const table = this.$refs.selection;
      this.$emit('emitTable', table);
    }
  },
  created() {
    this.emitTable();
  }
};
</script>

<style lang="less" scoped>
.table-content {
  margin: 2rem 1.8rem;
  .ivu-btn {
    width: 5rem;
    margin: 0 0.5rem;
  }
}
</style>
