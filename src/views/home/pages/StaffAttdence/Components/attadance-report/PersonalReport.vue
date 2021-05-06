<template>
  <div class="personal-static">
    <div class="title">
      <my-menu @handleSearch="handleSearch" />
    </div>
    <div class="content">
      <personal-content v-bind="infos" />
    </div>
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      :mask-closable="false"
      width="800"
      :footer-hide="true"
    >
      <reminder v-bind="accounts" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import MyMenu from './PERSONAL_REPORT/AttdanceReportMenu';
import PersonalContent from './Common/MyTable';
import Reminder from './Common/MyReminder';
// ? utils
import { getDataSource, checkDataSource, handleErrorCode } from '@/utils';
import { renderReportTable } from './report-utils';
// ? request
import { getPersonalStaticInfo } from '@/request/attdance';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'PersonalReport',
  components: {
    MyMenu,
    Reminder,
    PersonalContent
  },
  data: () => ({
    // ? content-data
    infos: {},
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal
    startTime: '',
    endTime: '',
    isShowInfoModal: false,
    modalTitle: '',
    accounts: {}
  }),
  computed: {
    ...mapState(['uid', 'defaultYear', 'defaultMonth', 'days'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getParamsTimeSpan(params);
      this.getTableData(params);
    },
    getParamsTimeSpan(params) {
      const { start_time, end_time } = params;
      this.startTime = start_time;
      this.endTime = end_time;
    },
    // ? table
    initTable() {
      const uid = this.uid,
        year = this.defaultYear,
        month = this.defaultMonth,
        days = this.days;
      const params = {
        uid,
        start_time: `${year}-${month}-01`,
        end_time: `${year}-${month}-${days}`
      };
      this.getParamsTimeSpan(params);
      this.getTableData(params);
    },
    async getTableData(params = {}) {
      const result = await getPersonalStaticInfo(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        // console.log(info);
        if ('items' in info) {
          const { items } = info;
          if (items.length > 0) {
            this.getTableInfos(items);
          } else this.$Message.warning(`暂无内容`);
        }
      } else
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    getTableInfos(items) {
      if (items[0].username && items[0].statistics) {
        const crtEl = this,
          titleList = [
            {
              title: '序号',
              key: 'number',
              align: 'center'
            },
            {
              title: '教师姓名',
              key: 'username',
              align: 'center'
            },
            {
              title: '应到/天数',
              key: 'should',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '实到/天数',
              key: 'actually',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '加班/小时',
              key: 'overtime',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '旷工/次',
              key: 'absent',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '请假/小时',
              key: 'leave',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '迟到/次',
              key: 'late',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '早退/次',
              key: 'early',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            },
            {
              title: '外出/小时',
              key: 'out',
              align: 'center',
              render: (h, params) => renderReportTable(h, params, crtEl)
            }
          ],
          dataList = [];
        items.map(item => {
          const { username, statistics } = item;
          const myStatistics = {
            number: 1,
            username,
            should: statistics.should,
            actually: statistics.actually,
            overtime: statistics.overtime,
            absent: statistics.absent,
            leave: statistics.leave,
            late: statistics.late,
            early: statistics.early,
            out: statistics.out
          };
          dataList.push(myStatistics);
        });
        this.infos = {
          titleList,
          dataList
        };
      }
    }
  },
  created() {
    this.initTable();
  }
};
</script>
