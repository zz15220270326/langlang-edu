<template>
  <querymenu>
    <div slot="first" class="select-date">
      <DatePicker
        class="date-span"
        type="daterange"
        @on-change="getDateSpan"
        split-panels
        placeholder="请选择时间范围:"
      />
      <search-button @click.native="handleSearch" />
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import SearchButton from '@common/search-button';

import { deepCopyObj } from '@/utils';

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ClassAttdanceMenu',

  components: {
    Querymenu,
    SearchButton
  },

  data: () => ({
    params: {}
  }),

  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days']),
    ...mapGetters(['ymdGetters'])
  },

  methods: {
    initDateSpan() {
      // ? 需求默认为当天的出勤
      const startDate = this.ymdGetters,
        endDate = this.ymdGetters;
      this.params = {
        startDate,
        endDate
      };
    },
    getDateSpan(dateSpan = []) {
      const [startDate, endDate] = dateSpan;
      if (startDate.length && endDate.length) {
        this.params = {
          startDate,
          endDate
        };
      } else this.initDateSpan();
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    }
  },
  created() {
    this.initDateSpan();
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 1.6rem 0;
  padding: 0.8rem 1rem;
  .date-span {
    width: 12rem;
  }
}
</style>
