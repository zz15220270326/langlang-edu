<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div slot="second" class="inputs">
      <Input
        placeholder="请输入教师姓名"
        :search="true"
        @on-blur="getTeacherName"
      />
    </div>
    <div slot="third" class="select-dates">
      <DatePicker
        placeholder="请选择日期(默认查询当月)"
        type="daterange"
        split-panels
        @on-change="getTimespan"
      />
    </div>
    <div slot="fourth" class="search">
      <search-button @click.native="handleSearch" />
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
  // ? arr / obj
  deepCopyObj
} from '@/utils';

// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

import { mapState } from 'vuex';

export default {
  name: 'SwipeMenu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [getClassMixins],

  data: () => ({
    params: {},
    disableOption: {
      disabledDate(date) {
        return date && date.valueOf() < Date.now() - 86400000;
      }
    }
  }),

  watch: {
    currentClassId(newVal) {
      this.setClassId(newVal);
    }
  },

  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'defaultDay', 'days'])
  },

  methods: {
    setParamsSize(size = 0) {
      this.params.page_size = size;
    },
    setClassId(classId = 0) {
      if (classId > 0) {
        this.params.class_ids = classId;
      } else delete this.params.class_ids;
    },
    getTeacherName(e) {
      const { value } = e.target;
      if (value.length) {
        this.params.teacher_name = value;
      } else delete this.params.teacher_name;
    },
    getTimespan(timespan = []) {
      const [start_time, end_time] = timespan;
      if (start_time.length && end_time.length) {
        this.params.start_time = start_time;
        this.params.end_time = end_time;
      } else this.initTimeSpan();
    },
    initTimeSpan() {
      const start_time = `${this.defaultYear}-${this.defaultMonth}-01`,
        end_time = `${this.defaultYear}-${this.defaultMonth}-${this.days}`;
      this.params.start_time = start_time;
      this.params.end_time = end_time;
    },
    handleSearch() {
      this.setParamsSize(20);
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    }
  },
  created() {
    this.initTimeSpan();
  }
};
</script>

<style lang="less" scoped>
.flex-style {
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  width: 100%;
  padding: 1.2rem 0;
  background-color: #f6f6f6;
  .flex-style;
  .select {
    flex: 1;
    .flex-style;
  }
  .inputs {
    flex: 1;
  }
  .select-dates {
    flex: 2;
    .flex-style;
  }
  .search {
    flex: 4;
  }
}
</style>
