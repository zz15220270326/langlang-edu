<template>
  <querymenu>
    <div slot="first" class="select-input">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <DatePicker
        type="daterange"
        split-panels
        placeholder="请选择时间范围"
        @on-change="getDateSpan"
      />
    </div>
    <div slot="second" class="search">
      <search-button @click.native="handleSearch" />
    </div>
    <div slot="third" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOperations(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

// ? utils
import {
  // ? obj / arr
  deepCopyObj
} from '@/utils';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

import { mapState } from 'vuex';

export default {
  name: 'AddMenu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [getClassMixins],

  data: () => ({
    operations: [
      {
        tag: '打印',
        type: 'error'
      },
      {
        tag: '导出',
        type: 'success'
      }
    ],
    params: {
      page_size: 20
    }
  }),

  watch: {
    currentClassId(newVal) {
      this.setClassId(newVal);
    }
  },

  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days'])
  },

  methods: {
    setClassId(classId) {
      classId > 0
        ? (this.params.class_id = classId)
        : delete this.params.class_id;
    },
    initDateSpan() {
      const startTime = `${this.defaultYear}-${this.defaultMonth}-01`,
        endTime = `${this.defaultYear}-${this.defaultMonth}-${this.days}`;
      this.params.startTime = startTime;
      this.params.endTime = endTime;
    },
    getDateSpan(dateSpan = []) {
      const [startTime, endTime] = dateSpan;
      if (startTime.length && endTime.length) {
        this.params.startTime = startTime;
        this.params.endTime = endTime;
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    handleOperations(key) {
      this.$emit('handleOperations', key);
    }
  },
  created() {
    // this.initDateSpan()
  }
};
</script>

<style lang="less" scoped>
.common_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_acound() {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.query-menu {
  .common_flex();
  padding: 4/5rem 0;
  .select-input {
    flex: 3;
    .flex_acound();
  }
  .search {
    flex: 1;
  }
  .operations {
    flex: 2;
    text-align: right;
    padding-right: 0.5rem;
    .ivu-btn {
      margin: 0 0.6rem;
      width: 5.2rem;
    }
  }
}
</style>
