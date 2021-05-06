<template>
  <div class="worker-health-management">
    <worker-menu
      @handleSearch="handleSearch"
      @handleDeleteItems="handleDeleteItems"
      @exportTable="exportTable"
    />
    <div class="content">
      <h-b-table
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
        @getSelectItem="getSelectItem"
        @handleTableItem="handleTableItem"
        @getTable="getTable"
      />
    </div>
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      :page="page"
      :pageSize="pageSize"
      @changeTableData="changeTableData"
    />
    <Modal
      v-model="isShowInfoModal"
      width="800"
      class-name="info-modal"
      :title="modalTitle"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
// ? import components( 从上到下 )
import WorkerMenu from './components/WorkerMenu';
import HBTable from '../HBTable';
import Info from './components/WHMInfoContent';
import BottomAccount from '@common/bottom-account';

// ? import request
import {
  getStaffManagementList,
  getStaffManagementInfo,
  deleteStaffManagement
} from '@/request/health-border';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult
} from '@/utils';
import { titleList } from './myUtils';

export default {
  name: 'WorkerHealthManagement',
  components: {
    WorkerMenu,
    HBTable,
    Info,
    BottomAccount
  },
  data: () => ({
    params: {},
    titleList,
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    selectItem: [],
    currentTable: {},
    // ? modal-data
    modalTitle: '',
    isShowInfoModal: false,
    infos: {}
  }),
  methods: {
    // ? menu-functions
    handleSearch(params) {
      if (params.teacherName) {
        this.params.teacherName = params.teacherName;
      } else delete this.params.teacherName;
      if (params.startTime !== '' && params.endTime !== '') {
        this.params.startTime = params.startTime;
        this.params.endTime = params.endTime;
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
      if (params.healthCondition) {
        this.params.healthCondition = params.healthCondition;
      } else {
        delete this.params.healthCondition;
      }
      this.params.page_size = this.pageSize;
      this.getTableData(this.params);
    },
    handleDeleteItems() {
      if (this.selectItem.length > 0) {
        this.$Modal.confirm({
          title: '删除',
          content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
          onOk: () => this.confirmDeleteItems(),
          onCancel: () => this.$Message.info('您取消了本次操作')
        });
      } else this.$Message.warning('请选择要删除的内容');
    },
    async confirmDeleteItems() {
      const id = this.selectItem.map(item => item.id).toString();
      const result = await deleteStaffManagement({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    exportTable() {
      this.$Message.success('导出表格, 请稍后');
      setTimeout(() => {
        this.currentTable.exportCsv({
          fileName: '职工健康管理详情表',
          original: false
        });
      }, 500);
    },
    // ? table-functions
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getStaffManagementList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.list) {
          const { list } = info;
          this.dataList = [];
          list.map(item => {
            this.dataList.push({
              id: item.id,
              userId: item.user_id,
              remark: item.remark,
              teacherName: item.realname,
              temperature: item.temperature,
              healthStatus: item.health_condition,
              symptom: item.symptom,
              recordDate: item.record_date,
              operations: [
                {
                  tag: '详情',
                  type: 'info'
                },
                {
                  tag: '删除',
                  type: 'error'
                }
              ]
            });
          });
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    handleTableItem(itemIndex, btnIndex) {
      switch (btnIndex) {
        case 0:
          this.openInfoModal(itemIndex);
          break;
        case 1:
          this.$Modal.confirm({
            title: `删除第${itemIndex + 1}条信息数据`,
            content: '是否删除? 删除后数据无法恢复',
            onOk: () => this.deleteItem(itemIndex),
            onCancel: () => {
              this.$Message.success('您取消了本次操作');
            }
          });
          break;
      }
    },
    async openInfoModal(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await getStaffManagementInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        console.log(info);
        this.$Message.info(`查看第${itemIndex + 1}条信息数据`);
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async deleteItem(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await deleteStaffManagement({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    getTable(table) {
      this.currentTable = table;
    },
    changeTableData(params) {
      Object.assign(this.params, params);
      this.getTableData(this.params);
    },
    // ? modal相关的方法
    closeModals() {
      this.isShowInfoModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
