<template>
  <querymenu>
    <div slot="first" class="search">
      <Input placeholder="请输入关键字" length="200" @on-blur="getKeyword" />
      <Button
        class="op-btn"
        v-for="item in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleOperations(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="add">
      <Button type="success" @click.native="handleAddModal">
        <span>创建草稿</span>
        <Icon type="md-add" />
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';

export default {
  name: 'InsideNoticeMenu',
  components: { Querymenu },
  data: () => ({
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    params: {}
  }),
  methods: {
    getKeyword(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.content = value;
      } else delete this.params.content;
    },
    initPageSize(size) {
      this.params.pageSize = size;
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '查询':
          this.handleSearch();
          break;
        case '删除':
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch() {
      this.initPageSize(20);
      const params = Object.assign({}, this.params);
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDeleteItems');
    },
    handleAddModal() {
      this.$emit('handleAddModal');
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 1.2rem 0;
  .flex-center;
  .search {
    flex: 1;
    margin: 0 1rem;
    .flex-center;
    .op-btn {
      margin: 0 0.5rem;
      width: 6rem;
    }
  }
  .add {
    flex: 3;
    text-align: right;
    margin-right: 2rem;
    .ivu-btn {
      margin: 0 0.5rem;
      width: 6.4rem;
    }
  }
}
</style>
