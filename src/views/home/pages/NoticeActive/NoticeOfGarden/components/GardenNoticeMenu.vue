<template>
  <querymenu>
    <div slot="first" class="search">
      <Input placeholder="请输入关键字" length="200" @on-blur="getContent" />
      <Button
        class="op-btn"
        v-for="(item, idx) in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleOperations(idx)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="add">
      <Button type="success" @click.native="handleAdd">
        <span>创建草稿</span>
        <Icon type="md-add" />
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
// ? import mixins

export default {
  name: 'GardenNoticeMenu',

  components: {
    Querymenu
  },

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
    params: {
      pageSize: 20
    }
  }),

  methods: {
    getContent(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.content = value;
      } else delete this.params.content;
    },
    handleOperations(itemIdx) {
      switch (itemIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch() {
      const params = JSON.parse(JSON.stringify(this.params));
      // console.log(params)
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDeleteItems');
    },
    handleAdd() {
      this.$emit('openAddModal');
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
