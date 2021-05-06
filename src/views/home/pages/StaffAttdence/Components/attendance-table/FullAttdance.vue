<template>
  <div class="full-attdance">
    <full-menu @handleSearch="handleSearch" />
    <a-title :yM="currentYm" identify="全员教师" />
    <a-content v-bind="contents" :loading="loading" />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- modal -->
    <Modal
      class="personal-reminder"
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <a-reminder :infos="infos" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import FullMenu from './menu/FullMenu';
import ATitle from './Common/DetailTitle';
import AContent from './Common/Content';
import AReminder from './Common/AttdanceReminder';

import DivPage from '@common/bottom-account';

// ? request
import { getFullReport } from '@/request/attdance';

// ? import utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? time
  getDays,
  getWeekDays
} from '@/utils';
import { renderWeekDay } from './my-utils';

// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'FullAttdanceReport',
  components: {
    // ? child-components
    FullMenu,
    ATitle,
    AContent,
    AReminder,

    DivPage
  },
  data: () => ({
    // ? title
    currentYm: '',
    // ? content
    params: {},
    contents: {},
    page: 0,
    pageSize: 10,
    total: 0,
    totalPage: 0,
    loading: false,
    // ? modal
    modalTitle: '',
    isShowInfoModal: false,
    infos: []
  }),
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days'])
  },
  methods: {
    // ? menu
    handleSearch(params = {}) {
      const [year, month] = params.end_time.split('-');
      this.currentYm = `${year}-${month}`;
      // this.$Notice.info({
      //   title: '查询'
      // });
      // console.log(params);
      this.getTableData(params);
    },
    // ? title
    initYm() {
      this.currentYm = `${this.defaultYear}-${this.defaultMonth}`;
    },
    initTimeSpan() {
      const [year, month] = this.currentYm.split('-');
      const days = getDays(year * 1, month * 1);
      this.params.start_time = `${this.defaultYear}-${this.defaultMonth}-01`;
      this.params.end_time = `${this.defaultYear}-${this.defaultMonth}-${days}`;
    },
    setPageSize(pageSize) {
      this.params.page_size = pageSize;
    },
    // ? content
    initTable() {
      this.initYm();
      this.initTimeSpan();
      this.setPageSize(this.pageSize);
      const params = JSON.parse(JSON.stringify(this.params));
      this.getTableData(params);
    },
    async getTableData(params = {}) {
      this.loading = true;
      const result = await getFullReport(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.items) {
          this.getDataInfos(info.items, params);
        }
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
      this.loading = false;
    },
    getDataInfos(items, params) {
      const { end_time } = params;
      let titleList = [],
        dataList = [];
      titleList = this.setTitleList(end_time);
      dataList = this.setDataList(items, end_time);
      this.contents = {
        titleList,
        dataList
      };
      // console.log(this.contents)
    },
    setTitleList(endTime = '') {
      const timeArr = endTime.split(''),
        days = (timeArr[timeArr.length - 2] + timeArr[timeArr.length - 1]) * 1,
        titleList = [
          {
            title: '姓名/日期',
            key: 'name',
            align: 'center',
            width: 120
          }
        ],
        crtEl = this;
      for (let day = 1; day <= days; day++) {
        titleList.push({
          title: day < 10 ? '0' + day : '' + day,
          key: `day${day}`,
          align: 'center',
          width: 80,
          render: (h, params) => renderWeekDay(h, params, crtEl)
        });
      }
      return titleList;
    },
    setDataList(items, endTime) {
      // ? 获取当前的天数
      const timeArr = endTime.split(''),
        days = (timeArr[timeArr.length - 2] + timeArr[timeArr.length - 1]) * 1,
        dataList = [];
      // ? 获取星期数据
      dataList[0] = this.getWeeksInfo(endTime, days);
      // ? 获取考勤数据
      if (items.user && items.checking) {
        const { user, checking } = items;
        user.map((item, index) => {
          if (item.id === checking[index].id) {
            dataList[index + 1] = Object.create({});
            dataList[index + 1].id = item.id;
            dataList[index + 1].name = item.name;
            for (let day = 1; day <= days; day++) {
              dataList[index + 1][`day${day}`] =
                checking[index].data[day - 1].name;
            }
          }
        });
        return dataList;
      }
      return [];
    },
    getWeeksInfo(time = '', days) {
      const weekInfo = {
          id: 0,
          name: ''
        },
        [year, month] = time.split('-');
      for (let day = 1; day <= days; day++) {
        weekInfo[`day${day}`] = getWeekDays(`${year}-${month}-${day}`);
      }
      return weekInfo;
    },
    getContentByPage(params) {
      const [year, month] = this.currentYm.split('-');
      const days = getDays(year * 1, month * 1);
      const start_time = `${this.currentYm}-01`,
        end_time = `${this.currentYm}-${days}`;
      const requestParams = {
        ...params,
        start_time,
        end_time
      };
      this.getTableData(requestParams);
    }
  },

  created() {
    this.initTable();
  }
};
</script>

<style lang="less" scoped>
.full-attdance {
  // height: 60rem;
  width: 100%;
  margin-top: 2.5rem;
}
</style>
