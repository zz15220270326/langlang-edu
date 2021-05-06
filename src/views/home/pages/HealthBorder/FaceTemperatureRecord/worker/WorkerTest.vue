<template>
  <div class="worker-temperature-testing">
    <worker-test-menu @handleSearch="handleSearch" />
    <div class="table-content">
      <h-b-table
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
      />
    </div>
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getDataByPage"
    />
  </div>
</template>

<script>
// ? import components
import WorkerTestMenu from './components/WorkerTestMenu';
import HBTable from '../../HBTable';

import BottomAccount from '@common/bottom-account';

// ? request
import { getStaffList } from '@/request/health-border';
// ? utils
import { getDataSource, checkDataSource, handleErrorCode } from '@/utils';

// ? import mixins

export default {
  name: 'WorkerTest',

  components: {
    WorkerTestMenu,
    HBTable,
    BottomAccount
  },

  data: () => ({
    titleList: [
      {
        title: '序号',
        key: 'number',
        align: 'center'
      },
      {
        title: '职工姓名',
        key: 'teacherName',
        align: 'center'
      },
      {
        title: '体温/℃',
        key: 'temperature',
        align: 'center'
      },
      {
        title: '体温状况',
        key: 'healthStatus',
        align: 'center'
      },
      {
        title: '测量时间',
        key: 'recordDate',
        align: 'center'
      }
    ],
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0
  }),

  props: {},

  computed: {},

  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    // ? table
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getStaffList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.list) {
          const { list } = info;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              id: item.id,

              number: index + 1,
              teacherName: item.realname,
              temperature: item.temperature,
              healthStatus: item.temperature_status,
              recordDate: item.record_date
            });
          });
        }
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    getDataByPage(params) {
      this.getTableData(params);
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.worker-temperature-testing {
  .table-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.2rem 0;
  }
}
</style>
