<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleSelect(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="select-class">
      <select-menu
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
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
import getYearMixins from '@/mixins/Common/getYearMixins';

export default {
  name: 'AllYearMenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getYearMixins],
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
    handleSelect(statusIdx) {
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
    // ? search-function
    searchComment() {
      const params = {
        page_size: 20
      };
      params.isRemarked = this.statusIdx;
      if (this.year !== '' && this.year !== '选择学年') {
        params.year = this.year;
      }
      this.$emit('getTableByClick', params);
    },
    initSelect() {
      this.year = '';
      this.yearTitle = this.yearList[0].info;
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
