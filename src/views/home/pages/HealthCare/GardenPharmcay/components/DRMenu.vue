<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listItems="classList"
        :listTitle="classTitle"
        @handleSelect="selectClass"
      />
    </div>
    <div slot="second" class="operations">
      <Button
        v-for="(item, idx) in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleOperations(idx)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="export">
      <Button type="success" @click.native="handleExport">导出</Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'DRMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  mixins: [getClassMixins],
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
    ]
  }),
  props: {},
  methods: {
    handleOperations(handleIndex) {
      const params = {};
      params.page_size = 20;
      if (this.currentClassId) {
        params.classId = this.currentClassId;
      }
      handleIndex === 0
        ? this.$emit('handleSearchItems', params)
        : this.$emit('handleDeleteItems');
    },
    handleExport() {
      this.$emit('handleExport');
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  width: 100%;
  padding: 1.2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .select {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .operations {
    flex: 2;
    .ivu-btn {
      width: 5rem;
      margin: 0 0.5rem;
    }
  }
  .export {
    flex: 5;
    text-align: right;
    .ivu-btn {
      width: 6rem;
      margin-right: 2rem;
    }
  }
}
</style>
