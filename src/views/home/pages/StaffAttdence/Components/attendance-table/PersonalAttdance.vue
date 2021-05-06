<template>
  <div class="personal-attdance">
    <!-- 个人考勤报表 -->
    <a-menu @handleSearch="handleSearch" />
    <a-title :yM="currentYm" :identify="userName" />
    <a-content v-bind="contents" />
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
// ? child-components
import AMenu from './menu/PersonalMenu';
import ATitle from './Common/DetailTitle';
import AContent from './Common/Content';
import AReminder from './Common/AttdanceReminder';

// ? import request
import { getPersonReport } from '@/request/attdance';

// ? import utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? time
  getWeekDays
} from '@/utils';

import { renderWeekDay } from './my-utils';

// ? import vuex
import { mapState } from 'vuex';

export default {
  name: 'PersonalAttdance',
  components: {
    AMenu,
    ATitle,
    AContent,
    AReminder
  },
  data: () => ({
    params: {},
    currentYm: '',
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    contents: {},
    // ? Modal
    modalTitle: '',
    isShowInfoModal: false,
    infos: []
  }),
  computed: {
    ...mapState(['userName', 'uid', 'defaultYear', 'defaultMonth', 'days'])
  },
  methods: {
    // ? menu
    handleSearch(params = {}) {
      this.currentYm = params.start_time.slice(0, 7);
      params.uid = this.uid;
      this.getTableData(params);
    },
    // ? title
    initCurrentYm() {
      this.currentYm = `${this.defaultYear}-${this.defaultMonth}`;
    },
    // ? content
    initTableData() {
      this.initParams();
      const params = JSON.parse(JSON.stringify(this.params));
      // console.log(params);
      this.getTableData(params);
    },
    initParams() {
      this.params = {
        uid: this.uid,
        start_time: `${this.defaultYear}-${this.defaultMonth}-01`,
        end_time: `${this.defaultYear}-${this.defaultMonth}-${this.days}`,
        page_size: this.pageSize
      };
    },
    async getTableData(params = { uid: this.uid }) {
      const result = await getPersonReport(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // console.log(dataSource);
        const info = JSON.parse(JSON.stringify(dataSource));
        this.total = info.total || 0;
        this.page = info.page || 0;
        this.totalPage = info.total_page || 0;
        if (info.items) {
          this.getDataInfos(info.items, params);
        }
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    getDataInfos(items, params) {
      let titleList = [],
        dataList = [];
      const { end_time } = params;
      titleList = this.setTitleList(end_time);
      dataList = this.setDataList(items, end_time);
      this.contents = {
        titleList,
        dataList
      };
    },
    setTitleList(endTime = '') {
      const timeArr = endTime.split(''),
        days = (timeArr[timeArr.length - 2] + timeArr[timeArr.length - 1]) * 1,
        titleList = [
          {
            title: '姓名/日期',
            key: 'name',
            align: 'center',
            width: 90
          }
        ],
        crtEl = this;
      for (let day = 1; day <= days; day++) {
        titleList.push({
          title: day < 10 ? '0' + day : '' + day,
          key: `day${day}`,
          align: 'center',
          width: 70,
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
    }
  },
  created() {
    this.initCurrentYm();
    this.initTableData();
  }
};
</script>

<style lang="less" scoped></style>
