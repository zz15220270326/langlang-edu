<template>
  <querymenu>
    <div slot="first" class="select-day">
      <Button
        v-for="(item, idx) in selectDayList"
        :key="idx"
        :type="item.type"
        @click.native="handleSelectDay(idx)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="search-span">
      <DatePicker
        placeholder="请选择日期(默认查询当月)"
        type="daterange"
        split-panels
        :options="disableOption"
        @on-change="getTimespan"
      />
      <search-button @click.native="handleSearch" />
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import SearchButton from '@common/search-button';

// ? utils
import { deepCopyObj } from '@/utils';

import { mapState } from 'vuex';

export default {
  name: 'PresentMenu',

  components: {
    Querymenu,
    SearchButton
  },

  data: () => ({
    selectDayList: [
      {
        tag: '7天',
        type: 'primary',
        key: 7
      },
      {
        tag: '14天',
        type: 'default',
        key: 14
      },
      {
        tag: '30天',
        type: 'default',
        key: 30
      }
    ],
    crtIdx: 0,
    params: {},
    disableOption: {
      disabledDate(date) {
        const disabledDay = date.getDate();
        return disabledDay <= 0;
      }
    }
  }),

  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'defaultDay', 'days'])
  },

  methods: {
    handleSelectDay(crtIdx = 0) {
      this.crtIdx = crtIdx;
      this.selectDayList.forEach((item, index) =>
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default')
      );
      this.$emit('getAnalyzeByDay', this.selectDayList[crtIdx].key);
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
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
      this.clearTagType();
    },
    clearTagType() {
      this.selectDayList = this.selectDayList.map(item => ({
        tag: item.tag,
        type: 'default',
        key: item.key
      }));
    }
  },
  created() {
    this.initTimeSpan();
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  width: 100%;
  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  .select-day {
    flex: 1;
    .ivu-btn {
      width: 5.2rem;
      margin: 0 0.8rem;
    }
  }
  .search-span {
    flex: 3;
  }
}
</style>
