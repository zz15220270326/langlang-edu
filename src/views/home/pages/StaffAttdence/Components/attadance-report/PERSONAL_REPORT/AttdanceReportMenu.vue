<template>
  <Querymenu>
    <div class="select-date" slot="first">
      <DatePicker
        class="select-ym"
        type="daterange"
        split-panels
        placeholder="请选择年份和月份"
        @on-change="getTimeSpan"
      />
      <!-- (默认按照当前月份查询) -->
      <SearchButton @click.native="searchTable" />
    </div>
  </Querymenu>
</template>

<script>
// ? common / content components
import Querymenu from '@common/query-menu';
import SearchButton from '@common/search-button';
// ? utils
import { getDays } from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'AttdanceReportMenu',
  components: {
    // ? common / content
    Querymenu,
    SearchButton
  },
  data: () => ({
    params: {}
  }),
  computed: {
    ...mapState(['uid', 'defaultYear', 'defaultMonth'])
  },
  methods: {
    getTimeSpan(timeSpan) {
      if (timeSpan[0] !== '') {
        const [start_time, end_time] = timeSpan;
        this.params = {
          start_time,
          end_time,
          uid: this.uid
        };
      } else this.getCurrentYM();
    },
    getCurrentYM() {
      const year = this.defaultYear,
        month = this.defaultMonth;
      const days = getDays(year * 1, month * 1);
      const start_time = `${year}-${month}-01`,
        end_time = `${year}-${month}-${days}`;
      this.params = {
        start_time,
        end_time,
        uid: this.uid
      };
    },
    searchTable() {
      if (Object.keys(this.params).length === 0) {
        this.getCurrentYM();
      }
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  display: flex;
  padding: 1.2rem 0;
  .select-date {
    .select-ym {
      width: 10rem;
    }
    margin-left: 1.6rem;
  }
}
</style>
