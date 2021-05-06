<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleCommentButtons(key)"
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
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';
// ? common components
import Querymenu from '@common/query-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'WorkMenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getClassMixins],
  props: {
    commentStatus: {
      type: Array,
      default: () => []
    }
  },
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
    handleCommentButtons(statusIdx) {
      this.statusIdx = statusIdx;
      this.operations.forEach((item, index) =>
        index === statusIdx ? (item.type = 'info') : (item.type = 'default')
      );
      const params = {
        isRemarked: this.statusIdx,
        page_size: 20
      };
      this.$emit('getTableByStatus', params);
    },
    // ? search-function
    searchComment() {
      const params = {
        page_size: 20
      };
      params.isRemarked = this.statusIdx;
      if (this.currentClassId) {
        params.classId = this.currentClassId;
      }
      this.$emit('getTableByClick', params);
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
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
