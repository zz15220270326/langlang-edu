<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <search-button />
    </div>
    <div slot="second" class="op"></div>
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

  methods: {}
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 0.6rem 0;
  padding: 0.8rem 0;
  width: 100%;
}
</style>
