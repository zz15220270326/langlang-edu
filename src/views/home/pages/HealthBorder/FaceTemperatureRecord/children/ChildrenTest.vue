<template>
  <div class="children-temperature-testing">
    <children-test-menu @handleSearch="handleSearch" />
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
      @changeTableData="changeTableData"
    />
  </div>
</template>

<script>
// ? import components
import ChildrenTestMenu from './components/ChildrenTestMenu';
import HBTable from '../../HBTable';
import BottomAccount from '@common/bottom-account';

// ? import request
import { getInfantList } from '@/request/health-border';
// ? import utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,
  healthStatus
} from '@/utils';

export default {
  name: 'ChildrenTest',
  components: {
    ChildrenTestMenu,
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
        title: '班级名称',
        key: 'className',
        align: 'center'
      },
      {
        title: '幼儿姓名',
        key: 'infantName',
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
        align: 'center',
        render: (h, params) => healthStatus(h, params)
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
  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    changeTableData(params) {
      this.getTableData(params);
    },
    // ? table
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getInfantList(params);
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
              className: item.ClassName,
              infantName: item.NickName,
              temperature: item.temperature,
              healthStatus: item.temperature_status,
              recordDate: item.record_date
            });
          });
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.children-temperature-testing {
  .table-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.2rem 0;
  }
}
</style>
