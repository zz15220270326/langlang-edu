<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <Button type="primary" @click.native="handleSearch"> 查询 </Button>
    </div>
    <div slot="second" class="op"></div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'Menu',

  components: {
    Querymenu,
    SelectMenu
  },

  mixins: [getClassMixins],

  data: () => ({}),

  props: {},

  computed: {},

  methods: {
    handleSearch() {
      const params = {
        pageSize: 20
      };
      this.currentClassId > 0
        ? (params.classId = this.currentClassId)
        : delete params.classId;
      this.$emit('handleSearch', params);
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 0.6rem 0;
  padding: 0.8rem 0;
  width: 100%;
  .ivu-btn {
    width: 5.4rem;
    margin: 0 0.8rem;
  }
}
</style>
