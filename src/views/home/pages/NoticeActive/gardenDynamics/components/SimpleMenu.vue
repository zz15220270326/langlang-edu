<template>
  <querymenu>
    <div slot="first" class="content">
      <div class="content">
        <Input placeholder="请输入关键字" @on-blur="getKeyword" />
      </div>
      <Button type="primary" @click.native="handleSearch">
        查询
      </Button>
      <Button type="error" @click.native="handleDeleteItems">
        删除
      </Button>
    </div>
    <div slot="second" class="create">
      <Button type="success" @click.native="handleCreate">
        <!-- <Icon type="md-add" /> -->
        创建草稿
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import-components
import Querymenu from '@common/query-menu';

export default {
  name: 'SimpleMenu',

  components: {
    Querymenu
  },

  data: () => ({
    params: {
      pageSize: 20
    }
  }),

  props: {},

  computed: {},

  methods: {
    getKeyword(e) {
      const { value } = e.target;
      if (value !== '') {
        this.params.content = value;
      } else delete this.params.content;
    },
    handleSearch() {
      const params = Object.assign({}, this.params);
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDelete');
    },
    handleCreate() {
      this.$emit('handleCreate');
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  .full_flex();

  padding: 0.8rem 0;
  .content {
    flex: 3;
    margin-left: 1.2rem;
    .full_flex();
  }
  .create {
    flex: 7;
    text-align: right;
    margin-right: 3rem;
  }
  .ivu-btn {
    width: 6rem;
    margin: 0 0.6rem;
    text-align: center;
  }
}
</style>
