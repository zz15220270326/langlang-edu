<template>
  <querymenu>
    <div slot="first" class="input">
      <Input placeholder="请输入用户名" @on-blur="getName" />
    </div>
    <div slot="second" class="search">
      <Button @click.native="handleSearch" type="primary">
        查询
      </Button>
    </div>
    <div slot="second" class="delete">
      <Button type="error" @click.native="deleteItems">删除</Button>
    </div>
    <div slot="third" class="add">
      <Button type="success" @click.native="handleAddModal">
        <span>添加</span>
        <Icon type="md-add" />
      </Button>
    </div>
  </querymenu>
</template>

<script>
import Querymenu from '@common/query-menu';

import { deepCopyObj } from '@/utils';

export default {
  name: 'AuthQueryMenu',
  components: {
    Querymenu
  },
  data: () => ({
    params: {
      pageSize: 20
    }
  }),
  methods: {
    getName(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.name = value;
      } else delete this.params.name;
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    deleteItems() {
      this.$emit('deleteItems');
    },
    handleAddModal() {
      this.$emit('handleAddModal');
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 0.6rem 0;
  padding: 1.2rem 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .input {
    flex: 1;
    .ivu-input-wrapper {
      padding: 0 3.2rem;
    }
  }
  .search {
    flex: 1;
    .ivu-btn {
      width: 5.3rem;
    }
  }
  .delete {
    flex: 1;
    .ivu-btn {
      width: 5.3rem;
      position: relative;
      right: 10rem;
    }
  }
  .add {
    flex: 2;
    text-align: right;
    .ivu-btn {
      width: 5.5rem;
      margin-right: 1.6rem;
      position: relative;
      right: 52rem;
    }
  }
}
</style>
