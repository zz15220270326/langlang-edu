<template>
  <div class="menu-wrapper">
    <Tag color="green" size="large">班级:</Tag>
    <select-menu
      :listTitle="classTitle"
      :listItems="classList"
      @handleSelect="selectClass"
    />
    <search-button @click.native="handleSearch" />
  </div>
</template>

<script>
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'ClassMenu',
  components: { SelectMenu, SearchButton },
  mixins: [getClassMixins],
  data: () => ({}),
  props: {},
  computed: {},
  methods: {
    handleSearch() {
      const params = { pageSize: 12 };
      if (this.currentClassId > 0) {
        params.classId = this.currentClassId;
      }
      this.$emit('handleSearch', params);
    }
  }
};
</script>

<style lang="less" scoped>
.menu-wrapper {
  padding: 0.8rem;
  padding-right: 1rem;
  text-align: right;
}
</style>
