<template>
  <!-- 闸机列表 -->
  <div class="gate-list">
    <s-m-table
      :tableIsLoading="tableIsLoading"
      :titleList="titleList"
      :dataList="dataList"
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
// ? components
import SMTable from 'HomePage/SystemManagement/SMTable';
import DivPage from '@common/bottom-account';

// ? request
import { getMachineList } from '@/request/system-management';
// ? utils
import {
  // ? times
  dateToMs,
  transformToYMD,
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'GateList',
  components: {
    SMTable,

    DivPage
  },
  data: () => ({
    titleList: [
      {
        title: '闸机名称',
        key: 'name',
        align: 'center'
      },
      {
        title: '闸机类型',
        key: 'type',
        align: 'center'
      },
      {
        title: '闸机序列号',
        key: 'serialNumber',
        align: 'center'
      },
      {
        title: '网络状态',
        key: 'networkStatus',
        align: 'center'
      },
      {
        title: '添加时间',
        key: 'createTime',
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
    async getTableData(params = { pageSize: this.pageSize }) {
      const result = await getMachineList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && this.setDataList(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setDataList(list = []) {
      list.length &&
        list.map((item, index) => {
          this.dataList.push({
            number: index + 1,
            id: item.id || 0,
            gardenId: item.garden_id || 0,
            name: item.name,
            type: item.type,
            serialNumber: item.serial_number,
            networkStatus: item.status === 1 ? '已开机' : '已关机',
            createTime: transformToYMD(dateToMs(item.create_time) * 1000)
          });
        });
    },
    getTableByPage(params) {
      this.getTableData(params);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.gate-list {
  text-align: center;
}
</style>
