<template>
  <querymenu>
    <div slot="first" class="search">
      <Input placeholder="请输入关键字" v-model="keyword" length="200" />
      <Button
        class="op-btn"
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(key)"
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
// ? import-mixins

export default {
  name: 'ClassNoticeMenu',

  components: {
    Querymenu
  },

  data: () => ({
    keyword: '',
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ]
  }),

  props: {},

  computed: {},

  methods: {
    handleOperations(crtIdx) {
      switch (crtIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDelete();
          break;
      }
    },
    handleSearch() {
      const params = {};
      params.pageSize = 20;
      if (this.keyword !== '') {
        params.content = this.keyword;
      } else delete params.content;
      this.$emit('handleSearch', params);
      this.initInput();
    },
    handleDelete() {
      this.$emit('handleDelete');
    },
    handleAddModal() {
      this.$emit('handleAddModal');
    },
    initInput() {
      this.keyword = '';
    }
  }
};
</script>

<style lang="less" scoped>
.common_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 1.2rem 0;
  .common_flex();
  .search {
    flex: 1;
    margin: 0 1rem;
    .common_flex();
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
