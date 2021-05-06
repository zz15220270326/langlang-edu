<template>
  <div class="attdence-report">
    <!-- 考勤报表 -->
    <div class="title">
      <my-menu @handleSearch="handleSearch" />
    </div>
    <div class="content">
      <my-table v-bind="infos" :loading="loading" />
      <bottom-account
        :page="page"
        :pageSize="pageSize"
        :total="total"
        :totalPage="totalPage"
      />
      <!-- 一般不带树形结构弹窗 -->
      <Modal
        v-model="isShowInfoModal"
        :title="modalTitle"
        width="800"
        :footer-hide="true"
      >
        <my-reminder v-bind="accounts" />
      </Modal>
    </div>
  </div>
</template>

<script>
// ? import components
import MyMenu from './ALL_REPORTS/AttdanceReportMenu';
import MyTable from './Common/MyTable';
import MyReminder from './Common/MyReminder';

import BottomAccount from '@common/bottom-account';

// ? request
import { getStaticTableInfo } from '@/request/attdance';
// ? utils
import {
  // ? handle-request
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils';
import { renderReportTable } from './report-utils';

// ? vuex
import { mapState } from 'vuex';

// ? import mixins

export default {
  name: 'FullAttdenceReport',
  components: {
    // ? children
    MyMenu,
    MyReminder,
    MyTable,

    BottomAccount
  },
  data: () => ({
    params: {},
    infos: {},
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    loading: false,
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
    initTimeSpan() {
      const startTime = `${this.defaultYear}-${this.defaultMonth}-01`,
        endTime = `${this.defaultYear}-${this.defaultMonth}-${this.days}`;
      this.params.start_time = startTime;
      this.params.end_time = endTime;

      this.startTime = startTime;
      this.endTime = endTime;
    },
    initPageSize(size = 10) {
      this.params.page_size = size;
    },
    handleSearch(params) {
      this.$Message.info('条件查询');
      this.getTableData(params);
      this.getTimeSpan(params);
    },
    getTimeSpan(params) {
      const { start_time, end_time } = params;
      this.startTime = start_time;
      this.endTime = end_time;
    },
    // ? table
    initTable() {
      this.initTimeSpan();
      this.initPageSize(this.pageSize);
      const params = JSON.parse(JSON.stringify(this.params));
      this.getTableData(params);
    },
    async getTableData(params) {
      this.loading = true;
      const result = await getStaticTableInfo(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.items && info.items.length) {
          this.getTableInfos(info.items);
        } else this.$Message.warning('暂无内容');
      } else
        this.$Message.error(`请求失败, 原因${handleErrorCode(result.code)}`);
      this.loading = false;
    },
    getTableInfos(items = []) {
      if (items.length > 0) {
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
            id: item.id,
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

<style lang="less" scoped>
.attdence-report {
  margin-top: 0.6rem;
  .title {
    width: 100%;
    height: 2rem;
  }
  .content {
    margin-top: 3.6rem;
    position: relative;
  }
}
</style>
