<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="checkApproveStatus(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="select-class">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div slot="third" class="search-button">
      <search-button @click.native="searchComment" />
    </div>
  </querymenu>
</template>

<script>
// ? import components
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

import Querymenu from '@common/query-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'OtherQuerymenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getClassMixins],
  data: () => ({
    statusIdx: 0,
    operations: [
      {
        tag: '待点评',
        type: 'info'
      },
      {
        tag: '已点评',
        type: 'default'
      }
    ]
  }),
  methods: {
    checkApproveStatus(statusIdx) {
      this.statusIdx = statusIdx;
      this.operations.forEach((item, index) =>
        index === statusIdx ? (item.type = 'info') : (item.type = 'default')
      );
      const params = {
        isRemarked: this.statusIdx,
        page_size: 20
      };
      this.initSelect();
      this.$emit('getTableByStatus', params);
    },
    searchComment() {
      const params = {};
      params.isRemarked = this.statusIdx;
      if (this.currentClassId) {
        params.classId = this.currentClassId;
      }
      this.$emit('getTableByClass', params);
    },
    initSelect() {
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  margin: 1.2rem 0;
  padding: 0.8rem 0.6rem;
  .flex-center;
  .approve-status {
    flex: 1.2;
    .flex-center;
    justify-content: space-evenly;
    .ivu-btn {
      width: 5.6rem;
    }
  }
  .select-class {
    flex: 1;
    .flex-center;
  }
  .input-child {
    flex: 1;
    .flex-center;
  }
  .search-button {
    flex: 5;
  }
}
</style>
