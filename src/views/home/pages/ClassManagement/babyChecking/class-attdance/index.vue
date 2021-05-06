<template>
  <div class="class-attdance">
    <class-attdance-menu @handleSearch="handleSearch" />
    <div class="title">班级考勤表</div>
    <class-attdance-content
      :titleList="titleList"
      :dataList="dataList"
      :isLoading="isLoading"
    />
  </div>
</template>

<script>
// ? import components
import ClassAttdanceMenu from './components/ClassAttdanceMenu';
import ClassAttdanceContent from './components/ClassAttdanceContent';

// ? request
import { getClassAnalyze } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'ClassAttdance',

  components: {
    ClassAttdanceMenu,
    ClassAttdanceContent
  },

  data: () => ({
    // ? menus
    isLoading: false,
    // ? contents
    titleList: [
      {
        title: '班级名称',
        key: 'className',
        align: 'center',
        width: 300
      },
      {
        title: '应到',
        key: 'shouldArrive',
        align: 'center',
        width: 150
      },
      {
        title: '实到',
        key: 'isArrived',
        align: 'center',
        width: 150
      },
      {
        title: '缺勤',
        key: 'absense',
        align: 'center',
        width: 150
      },
      {
        title: '事假',
        key: 'thingHoliday',
        align: 'center',
        width: 150
      },
      {
        title: '病假',
        key: 'sinkHoliday',
        align: 'center',
        width: 150
      },
      {
        title: '出勤率',
        key: 'attdencePresent',
        align: 'center',
        width: 150
      },
      {
        title: '缺勤率',
        key: 'absensePresent',
        align: 'center',
        width: 150
      },
      {
        title: '事假率',
        key: 'thingHolidayPresent',
        align: 'center',
        width: 150
      },
      {
        title: '病假率',
        key: 'sinkHolidayPresent',
        align: 'center',
        width: 150
      }
    ],
    dataList: [],
    page: 0,
    pageSize: 0,
    total: 0,
    totalPage: 0
  }),
  props: {},
  computed: {},
  methods: {
    // ? menus
    handleSearch(params) {
      this.getTableData(params);
    },
    // ? content
    async getTableData(params = {}) {
      this.isLoading = true;
      const result = await getClassAnalyze(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.dataList = [];
        data && this.setDataList(data);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.isLoading = false;
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          classId: item.id || 0,
          className: item.name || '缺少班级名称',
          shouldArrive: item.checking.sumBabys,
          isArrived: item.checking.Attendance,
          absense: item.checking.sumBabys - item.checking.Attendance,
          thingHoliday: item.checking.PersonalLeave,
          sinkHoliday: item.checking.SickLeave,
          attdencePresent: `${(item.checking.Attendance /
            item.checking.sumBabys) *
            100}%`,
          absensePresent: `${((item.checking.sumBabys -
            item.checking.Attendance) /
            item.checking.sumBabys) *
            100}%`,
          thingHolidayPresent: `${(item.checking.PersonalLeave /
            item.checking.sumBabys) *
            100}%`,
          sinkHolidayPresent: `${(item.checking.SickLeave /
            item.checking.sumBabys) *
            100}%`
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
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.class-attdance {
  .title {
    font-weight: bold;
    color: #464c5b;
    font-size: 1.6rem;
    .full_flex();
  }
}
</style>
