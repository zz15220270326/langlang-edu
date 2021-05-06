<template>
  <querymenu>
    <div slot="first" class="search">
      <div class="input">
        <Input v-model="inputVideoName" placeholder="视频名称" />
      </div>
      <div class="s-btn">
        <Button
          class="search-button"
          type="primary"
          @click.native="handleSearch"
        >
          点击查询
        </Button>
      </div>
    </div>
    <div slot="second" class="add">
      <Button
        type="success"
        size="default"
        icon="md-add"
        @click.native="addListItem"
      >
        添加至播放列表
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';

export default {
  name: 'VideoMenu',
  components: {
    Querymenu
  },
  data: () => ({
    inputVideoName: ''
  }),
  methods: {
    handleSearch() {
      this.$emit('handleSearch', this.inputVideoName);
      this.inputVideoName = '';
    },
    addListItem() {
      this.$emit('addListItem');
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
  margin: 0.8rem 0;
  padding: 1.2rem 0;
  .full_flex();
  .search {
    flex: 1;
    .full_flex();
    .search-button {
      width: 5.6rem;
      margin: 0 0.8rem;
    }
  }
  .add {
    flex: 3;
    text-align: right;
    margin-right: 2rem;
  }
}
</style>
