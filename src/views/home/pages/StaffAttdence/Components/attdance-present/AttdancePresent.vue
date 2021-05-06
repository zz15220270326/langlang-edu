<template>
  <!-- 出勤率分析 -->
  <div class="attdance-present">
    <present-menu
      @getAnalyzeByDay="getAnalyzeByDay"
      @handleSearch="handleSearch"
    />
    <div class="line-content">
      <line-chart :option="lineOption" :chartStyle="chartStyle" />
    </div>
  </div>
</template>

<script>
// ? import components
import PresentMenu from './components/PresentMenu';
import LineChart from '@common/echart/LineChart';

// ? request
import { getAttdenceAnalyze } from '@/request/attdance';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? arr / obj
  deepCopyObj,
  // ? echart
  getLineOption,
  // ? time
  getNearDate
} from '@/utils';
// ? configs

// import lineMixin from '@/mixins/attdance/lineMixin'
import { mapGetters } from 'vuex';

export default {
  name: 'AttdancePresent',
  components: {
    PresentMenu,
    LineChart
  },
  data: () => ({
    // ? menu
    // ? content
    params: {},
    chartStyle: {
      width: '90rem',
      height: '30rem'
    },
    lineOption: {}
  }),
  props: {},
  computed: {
    ...mapGetters(['ymdGetters'])
  },
  methods: {
    // ? menu
    getAnalyzeByDay(day = 0) {
      const startTime = getNearDate(-1 * day),
        endTime = this.ymdGetters,
        params = {
          start_time: startTime,
          end_time: endTime
        };
      this.getLines(params);
    },
    handleSearch(params) {
      this.getLines(params);
    },
    setChartStyle(day = 0) {
      const crtStyle = {},
        w = 12 * day,
        h = 5 * day;
      crtStyle.width = `${w}rem`;
      crtStyle.height = `${h}rem`;
      this.chartStyle = crtStyle;
    },
    // ? content
    async getLines(params = {}) {
      this.params = params;
      const result = await getAttdenceAnalyze(this.params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource),
          sourceList = data.map(item => ({
            day: item.date,
            data: item.rate
          }));
        this.setChartStyle(sourceList.length);
        this.lineOption = getLineOption('出勤统计', '', '考勤率', sourceList);
      } else
        this.$Message.error(
          `请求数据失败, 原因: ${handleErrorCode(result.code)}`
        );
    }
  },
  created() {
    this.getLines();
  }
};
</script>

<style lang="less" scoped>
.attdance-present {
  .line-content {
    margin-top: 1.6rem;
    // width: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  margin-bottom: 6rem;
}
</style>
