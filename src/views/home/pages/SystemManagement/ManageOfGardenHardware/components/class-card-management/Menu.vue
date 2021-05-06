<template>
  <querymenu>
    <div slot="first" class="left">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <search-button @click.native="handleSearch" />
    </div>
    <div slot="second" class="right">
      <Button type="warning" @click.native="handleSetPlan">
        开关机方案设置
      </Button>
      <Button type="warning" @click.native="handleClose">一键关机</Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'Menu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [getClassMixins],

  data: () => ({}),

  props: {},

  computed: {},

  methods: {
    handleSearch() {
      this.$Message.info('点击查询');
      this.$emit('handleSearch');
    },
    handleSetPlan() {
      this.$emit('handleSetPlan');
    },
    handleClose() {
      this.$emit('handleClose');
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 0.6rem 0;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    flex: 2;
  }
  .right {
    flex: 3;
    text-align: right;
    padding-right: 1rem;
    .ivu-btn {
      margin: 0 4/5rem;
    }
  }
}
</style>
