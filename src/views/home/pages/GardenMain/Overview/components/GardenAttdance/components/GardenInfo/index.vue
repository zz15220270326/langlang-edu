<template>
  <div class="main-garden-info">
    <div class="title">
      <DatePicker
        type="daterange"
        split-panels
        placeholder="请选择时间范围"
        class="garden-attdence-range"
        @on-change="getDateSpan"
      />
      <search-button @click.native="handleSearch" />
      <Divider />
    </div>
    <div class="content" v-if="Object.keys(render).length > 0">
      <column-picture :chartStyle="chartStyle" :render="render" />
    </div>
  </div>
</template>

<script>
import './index.less';
// ? import components
import SearchButton from '@common/search-button';
import ColumnPicture from '@common/echart/ColumnPicture';

// ? request
import { getGardenChecking } from '@/request/garden-main';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? obj / arr
  deepCopyObj
} from '@/utils';
import { setColumnData } from '../../function';
// ? configs

export default {
  name: 'MainGardenInfo',
  components: {
    SearchButton,
    ColumnPicture
  },
  data: () => ({
    // ? echart-data
    chartStyle: {
      width: '52rem',
      height: '26rem'
    },
    render: {},
    params: {}
  }),
  computed: {
    startTime() {
      return this.$store.state.startTime;
    },
    endTime() {
      return this.$store.state.endTime;
    }
  },
  methods: {
    // ? menu
    getDateSpan(time) {
      const [startDate, endDate] = time;
      this.params =
        startDate.length && endDate.length
          ? {
              startDate,
              endDate
            }
          : {};
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.getColumnData(params);
    },
    // ? content
    async getColumnData(params = {}) {
      const result = await getGardenChecking(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        if (data.garden_checking) {
          const { shiDao, yingDao } = data.garden_checking;
          let absence = [];
          if (shiDao && yingDao) {
            yingDao.map((y, i) => {
              absence.push(y - shiDao[i]);
            });
          }
          this.setColumnData(shiDao, absence);
        }
      } else {
        result.code === 403 && this.hideGardenInfo();
      }
    },
    hideGardenInfo() {
      this.$emit('hideGardenInfo');
    },
    setColumnData(arrived = [], absence = []) {
      const formatList = [];
      absence.map((item, index) => {
        formatList.push({
          class_type: this.getClassByIdx(index),
          attdance_students: arrived[index],
          absence_students: item
        });
      });
      this.render = setColumnData(formatList);
    },
    getClassByIdx(index) {
      switch (index) {
        case 0:
          return '小班';
        case 1:
          return '中班';
        case 2:
          return '大班';
        case 3:
          return '全员情况';
      }
    }
  },
  created() {
    this.getColumnData();
  }
};
</script>
