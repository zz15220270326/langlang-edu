<template>
  <div class="work-report">
    <my-menu
      @getKeyWord="getKeyWord"
      @handleAll="handleAll"
      @handleAdd="handleAdd"
    />
    <plan-table
      :titleList="titleList"
      :dataList="dataList"
      @handleOperations="handleOperations"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
    />
    <bottom-account :total="total" @changeTableData="changeTableData" />
    <!-- Modal-Content -->
    <!-- Add -->
    <Modal
      v-model="isShowAddModal"
      class="create-modal"
      :title="modalTitle"
      width="1080"
      :footer-hide="true"
    >
      <add @refreshPage="getWorkReportData" />
    </Modal>
    <!-- Info -->
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      class="info-modal"
      width="1080"
      :footer-hide="true"
    >
      <info
        :infoTitle="infoTitle"
        :infoName="infoName"
        :infoIcon="infoIcon"
        :infoTime="infoTime"
        :infoContent="infoContent"
      />
    </Modal>
    <!-- Edit -->
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      class="edit-modal"
      width="1080"
      :footer-hide="true"
    >
      <add
        :id="editId"
        :propTitle="editTitle"
        :propContent="editContent"
        @refreshPage="getWorkReportData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
import BottomAccount from '@common/bottom-account';

import MyMenu from './components/my-menu';
import Add from './components/add';
import Info from './components/info';
// ? request
import {
  getWorkReportList,
  getWorkReportDetail,
  exportWorkReport,
  deleteWorkReport
} from '@/request/plan/6-work-report';
// ? utils
import {
  // ? time
  transformTimeStamp,
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? htmlToText
  htmlToText,
  // ? arr / obj
  deepCopyObj,
  downloadFile
} from '@/utils';
// ? configs
import { operations, workReportTitle } from 'HomePage/PersonalPlan/common';

export default {
  name: 'WorkReport',
  components: {
    PlanTable,
    BottomAccount,

    MyMenu,
    Add,
    Info
  },
  data: () => ({
    keyword: '',
    // ? table-data
    titleList: workReportTitle,
    dataList: [],
    total: 0,
    totalPage: 0,
    page: 0,
    pageSize: 20,
    selectItem: [],
    tableIsLoading: false,
    // ? modal-data
    modalTitle: '',
    // ? add-modal
    isShowAddModal: false,
    // ? info-modal
    isShowInfoModal: false,
    infoTitle: '',
    infoName: '',
    infoIcon: '',
    infoTime: '',
    infoContent: '',
    // ? edit-modal
    isShowEditModal: false,
    editId: -1,
    editTitle: '',
    editContent: ''
  }),
  methods: {
    // ? menu-functions
    getKeyWord(keyword) {
      this.keyword = keyword;
    },
    handleAll(info) {
      switch (info) {
        case '查询':
          this.handleQuery();
          break;
        case '删除':
          this.handleDelete();
          break;
      }
    },
    handleQuery() {
      if (this.keyword === '') {
        this.$Message.info('查询全部信息');
        this.getWorkReportData();
      } else {
        this.$Message.info('按照关键字查询');
        const params = {
          title: this.keyword
        };
        this.getWorkReportData(params);
      }
    },
    handleDelete() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的计划项');
      } else {
        this.$Modal.confirm({
          title: '删除选中的表格项',
          content: '是否删除? 删除后数据无法恢复!',
          onOk: () => this.deleteItems(),
          onCancel: () => this.$Message.success('您取消了删除操作')
        });
      }
    },
    async deleteItems() {
      const id = this.selectItem.map(item => item.id).toString();
      const result = await deleteWorkReport({
        id
      });
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getWorkReportData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    handleAdd() {
      this.modalTitle = '新建汇报';
      this.isShowAddModal = true;
    },
    // ? content-functions
    async getWorkReportData(params = { page_size: this.pageSize }) {
      const result = await getWorkReportList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        if (data.total) {
          this.total = data.total;
        }
        this.dataList = [];
        if (data.list) {
          this.setDataList(data.list);
        }
      }
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          title: item.title,
          status: item.status,
          createTime: item.create_time,
          operations,
          id: item.id
        });
      });
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    handleOperations(tag, itemIndex) {
      switch (tag) {
        case '详情':
          this.openInfoModal(itemIndex);
          break;
        case '编辑':
          this.openEditModal(itemIndex);
          break;
        case '导出':
          this.handleExport(this.dataList[itemIndex].id);
          break;
        case '删除':
          this.$Modal.confirm({
            title: '删除这一条信息',
            content: '您是否要删除这一条记录? 删除后数据无法恢复!',
            onOk: () => this.deleteSelectItem(itemIndex),
            onCancel: () => {
              this.$Message.warning('您取消了本次操作');
            }
          });
          break;
      }
    },
    async openInfoModal(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await getWorkReportDetail(id);
      const dataSource = await getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infoTitle = dataSource.title || '';
        this.infoIcon = dataSource.icon || '';
        this.infoName = dataSource.name || '';
        this.infoTime = transformTimeStamp(dataSource.createTime) || '';
        this.infoContent = dataSource.content || '';
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async openEditModal(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await getWorkReportDetail(id),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.editId = dataSource.id || 0;
        this.editTitle = dataSource.title || '';
        this.editContent = htmlToText(dataSource.content).htmlText || '';

        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    async handleExport(id) {
      const result = await exportWorkReport({ id });
      downloadFile(result, `导出工作汇报`, 'application/pdf');
    },
    async deleteSelectItem(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await deleteWorkReport({
        id
      });
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getWorkReportData();
      } else this.$Message.warning('删除失败, 请稍后重试');
    },
    changeTableData(params) {
      this.getWorkReportData(params);
    },
    // ? modal-functions
    closeModals() {
      this.$bus.$on('closeWorkReportModals', () => {
        this.isShowAddModal = false;
        this.isShowInfoModal = false;
        this.isShowEditModal = false;
      });
    }
  },
  created() {
    this.getWorkReportData();
  },
  mounted() {
    this.closeModals();
  },
  beforeDestroy() {
    this.$bus.$off('closeWorkReportModals');
  }
};
</script>
