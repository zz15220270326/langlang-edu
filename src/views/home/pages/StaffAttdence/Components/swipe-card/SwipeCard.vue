<template>
  <div class="swipe-card">
    <swipe-menu @handleSearch="handleSearch" />
    <swipe-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
  </div>
</template>

<script>
// ? import components
import SwipeMenu from './components/SwipeMenu';
import SwipeTable from './components/SwipeTable';
import DivPage from '@common/bottom-account';

// ? request
import { getPunchRecord } from '@/request/attdance';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? arr / obj
  deepCopyObj,
  // ? time
  transformToYMD
} from '@/utils';
import { getSwipeType, getSwipeStatus } from './function';
// ? configs

import { mapState } from 'vuex';

export default {
  name: 'SwipeCard',
  components: {
    SwipeMenu,
    SwipeTable,

    DivPage
  },
  data: () => ({
    // ? table-data
    tableIsLoading: false,
    titleList: [
      {
        title: '序号',
        key: 'number',
        align: 'center',
        width: 100
        // fixed: 'left'
      },
      {
        title: '教师姓名',
        key: 'teahcerName',
        align: 'center'
      },
      {
        title: '卡号',
        key: 'card',
        align: 'center',
        width: 280
      },
      {
        title: '刷卡时间',
        key: 'swipeTime',
        align: 'center',
        width: 200
      },
      {
        title: '刷卡类型',
        key: 'swipeType',
        align: 'center',
        render: (h, params) => {
          const { row } = params;
          const text = getSwipeType(row.swipeType);
          return h('div', {}, text);
        }
      },
      {
        title: '刷卡状态',
        key: 'swipeStatus',
        align: 'center',
        render: (h, params) => {
          const { row } = params;
          const { text, color } = getSwipeStatus(row.swipeStatus);
          return h(
            'div',
            {
              style: {
                color
              }
            },
            text
          );
        }
      }
    ],
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    params: {}
  }),
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'defaultDay', 'days'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    // ? content
    async getTableData(
      params = {
        page_size: 20,
        start_time: `${this.defaultYear}-${this.defaultMonth}-01`,
        end_time: `${this.defaultYear}-${this.defaultMonth}-${this.days}`
      }
    ) {
      this.tableIsLoading = true;
      this.params = params;
      const result = await getPunchRecord(this.params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && this.setDataList(data.list);
      } else
        this.$Message.error(
          `请求数据失败, 原因: ${handleErrorCode(result.code)}`
        );
      this.tableIsLoading = false;
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          id: item.user_id,
          number: index + 1,
          teahcerName: item.realname,
          card: item.card || '暂无卡号',
          swipeTime: transformToYMD(parseInt(item.time) * 1000),
          swipeType: item.type,
          swipeStatus: item.status
        });
      });
    },
    getTableByPage(p) {
      const params = Object.assign({}, this.params, p);
      this.getTableData(params);
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped></style>
