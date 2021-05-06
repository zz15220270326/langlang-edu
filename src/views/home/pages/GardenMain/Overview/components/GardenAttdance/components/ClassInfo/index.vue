<template>
  <div class="main-class-info">
    <div class="title">
      <DatePicker
        type="daterange"
        split-panels
        placeholder="请选择时间范围"
        class="class-attdence-range"
        @on-change="getDateSpan"
      />
      <search-button @click.native="handleSearch" />
      <Divider />
    </div>
    <main-table
      v-if="classData.length > 0"
      :tableIsLoading="tableIsLoading"
      :titleList="classColumns"
      :dataList="classData"
      :height="480"
    />
  </div>
</template>

<script>
// ? import components
import SearchButton from '@common/search-button';
import MainTable from 'HomePage/GardenMain/MainTable';

// ? request
import { getClassChecking } from '@/request/garden-main';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // handleErrorCode,
  // ? obj / arr
  deepCopyObj
} from '@/utils';
// ? configs

export default {
  name: 'MainClassInfo',

  components: {
    SearchButton,
    MainTable
  },

  data: () => ({
    // ? table-data
    tableIsLoading: false,
    classColumns: [
      {
        title: '班级名称',
        key: 'className',
        align: 'center'
      },
      {
        title: '应到',
        key: 'shouldArrive',
        align: 'center'
      },
      {
        title: '实到',
        key: 'isArrived',
        align: 'center'
      },
      {
        title: '缺勤',
        key: 'absense',
        align: 'center'
      },
      {
        title: '出勤率',
        key: 'attdancePresent',
        align: 'center'
      }
    ],
    classData: [],
    params: {}
  }),

  props: {},

  computed: {},

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
      this.getTableData(params);
    },
    // ? content
    async getTableData(params = {}) {
      const result = await getClassChecking(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.classData = [];
        Array.isArray(data) && data.length && this.setTableData(data);
      } else {
        if (result.code === 403) {
          // ? 无权访问
          this.$emit('hideClassInfo');
        }
      }
    },
    setTableData(data = []) {
      data.map((item, index) => {
        const { sumBabys, Attendance, date, sumDays } = item.checking;
        this.classData.push({
          number: index + 1,
          id: item.id,
          teacherNums: item.teacherNums,
          grade: item.grade,
          className: item.name,
          shouldArrive: sumBabys,
          isArrived: Attendance,
          absense: sumBabys - Attendance,
          attdancePresent: `${(Attendance / sumBabys).toString()}%`,
          date,
          sumDays
        });
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.main-class-info {
  height: 36rem;
  overflow-y: auto;
  .title {
    .class-attdence-range {
      width: 12rem;
    }
  }
  .content {
    padding-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
