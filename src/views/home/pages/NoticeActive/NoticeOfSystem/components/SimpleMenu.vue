<template>
  <querymenu>
    <div slot="first" class="content">
      <div class="content">
        <Input placeholder="请输入关键字" @on-blur="getKeyword" />
      </div>
      <SearchButton @click.native="handleSearch" />
    </div>
    <div slot="second" class="empty-bg" />
  </querymenu>
</template>

<script>
// ? import-components
import Querymenu from '@common/query-menu';
import SearchButton from '@common/search-button';

export default {
  name: 'SimpleMenu',

  components: {
    Querymenu,
    SearchButton
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
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
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
    flex: 2;
    margin-left: 1.2rem;
    .full_flex();
  }
  .empty-bg {
    flex: 7;
  }
}
</style>
