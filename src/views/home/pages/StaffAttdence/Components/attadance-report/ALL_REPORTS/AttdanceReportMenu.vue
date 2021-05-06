<template>
  <Querymenu>
    <div class="menu" slot="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div class="input" slot="second">
      <Input
        placeholder="请输入教师姓名"
        suffix="ios-search"
        @on-blur="getTeacherName"
      />
    </div>
    <div class="date" slot="third">
      <DatePicker
        class="select-date-span"
        type="daterange"
        split-panels
        placeholder="请选择时间范围"
        @on-change="getTimeSpan"
      />
    </div>
    <div class="search-button" slot="fourth">
      <SearchButton @click.native="handleSearch" />
    </div>
  </Querymenu>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@/components/common/search-button';

// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'AttdanceReportMenu',
  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },
  mixins: [getClassMixins],
  data: () => ({
    params: {}
  }),
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days'])
  },
  props: {
    menuItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    initPageSize() {
      this.params.page_size = 20;
    },
    getTeacherIds() {
      this.params.teacher_ids = this.teacherIds;
    },
    getTeacherName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.teacher_name = value;
      } else {
        delete this.params.teacher_name;
      }
    },
    getTimeSpan(timeSpan) {
      if (timeSpan[0] !== '') {
        const [start_time, end_time] = timeSpan;
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
      this.getTeacherIds();
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
    }
  },
  created() {
    this.initPageSize();
    this.initTimeSpan();
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
  display: flex;
  padding: 1.2rem 0;
  .menu {
    flex: 1;
    margin-left: 1.2rem;
  }
  .input {
    flex: 1;
    .flex-center;
  }
  .date {
    flex: 1.5;
    .flex-center;
    .select-date-span {
      width: 10.6rem;
    }
  }
  .search-button {
    flex: 5;
    margin-top: 0.1rem;
  }
}
</style>
