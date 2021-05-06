<template>
  <div class="work-sumary">
    <my-menu
      @handleSearch="handleSearch"
      @handleDelete="handleDeleteItems"
      @handleAdd="openCreateModal"
    />
    <plan-table
      :titleList="titleList"
      :dataList="dataList"
      @handleOperations="handleOperations"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
    />
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      @changeTableData="changeTableData"
    />
    <!-- modal-content -->
    <!-- add -->
    <Modal
      v-model="isShowCreateModal"
      class="create-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <add @refreshPage="getWorkSumaryData" @closeModals="closeModals" />
    </Modal>
    <!-- info -->
    <Modal
      v-model="isShowInfoModal"
      class="info-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      class="edit-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <add
        v-bind="edits"
        @refreshPage="getWorkSumaryData"
        @closeModals="closeModals"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
// ? 1. common / content components
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
// ? 2. child-compoennts
import MyMenu from './components/WorkSumaryQueryMenu';
import BottomAccount from '@common/bottom-account';

import Add from './components/add';
import Info from './components/Info';
// ? request
import {
  getWorkSummaryList,
  getWorkSummaryDetail,
  exportWorkSummary,
  deleteWorkSummary
} from '@/request/plan/5-work-summary';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleOpResult,
  deepCopyObj,
  htmlToText,
  downloadFile
} from '@/utils';
// ? configs/data
import { operations, workSummaryTitle } from 'HomePage/PersonalPlan/common';
// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'WorkSumary',
  components: {
    PlanTable,
    MyMenu,
    BottomAccount,

    Add,
    Info
  },
  mixins: [
    // ? common-mixins
    getClassMixins
  ],
  data: () => ({
    classId: '',
    keyword: '',
    // ? table-content
    titleList: workSummaryTitle,
    dataList: [],
    tableIsLoading: false,
    total: 0,
    totalPage: 0,
    selectItem: [],
    // ? modal-data
    modalTitle: '',
    // ?? add-modal
    isShowCreateModal: false,
    // ?? info-modal (title, time, content, comment, who, remark_time)
    isShowInfoModal: false,
    infos: {},
    // ?? edit-modal
    isShowEditModal: false,
    edits: {}
  }),
  methods: {
    // ? menu-functions
    handleSearch(params) {
      this.getWorkSumaryData(params);
    },
    handleDeleteItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的计划项');
      } else {
        this.$Modal.confirm({
          title: '删除选中的内容',
          content: '确认删除? 删除后数据无法恢复',
          onOk: () => this.deleteItems(),
          onCancel: () => this.cancelDeleteItems()
        });
      }
    },
    async deleteItems() {
      const id = this.selectItem.map(item => item.id).toString();
      console.log(id);
      const result = await deleteWorkSummary({ id });
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getWorkSumaryData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    cancelDeleteItems() {
      this.$Message.info('您取消了本次的删除操作');
    },
    openCreateModal() {
      this.modalTitle = '新建总结';
      this.isShowCreateModal = true;
    },
    // ? table-functions
    async getWorkSumaryData(params = {}) {
      const result = await getWorkSummaryList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.total = data.total || 0;
        this.totalPage = data.total_page || 0;
        if (data.list) {
          const { list } = data;
          this.setDataList(list);
        }
      }
    },
    setDataList(list) {
      this.dataList = [];
      list.map((item, index) => {
        this.dataList.push({
          id: item.id,
          number: index + 1,
          title:
            !item.title || item.title === null ? '脏数据(注意!)' : item.title,
          className: item.class_name,
          classId: item.class_id,
          status: item.status,
          createTime: item.create_time,
          operations
        });
      });
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    inputContentChange(inputValue) {
      this.inputContent = inputValue;
    },
    handleOperations(tag, crtIdx, table) {
      switch (tag) {
        case '详情':
          this.openInfoModal(crtIdx);
          break;
        case '编辑':
          this.openEditModal(crtIdx);
          break;
        case '导出':
          this.exportItem(crtIdx, table);
          break;
        case '删除':
          this.handleDelete(crtIdx);
          break;
      }
    },
    async openInfoModal(crtIdx) {
      const dataSource = await this.getDataSource(crtIdx);
      if (Object.keys(dataSource).length > 0) {
        this.infos = {
          title: dataSource.title,
          createTime: dataSource.create_time,
          content: dataSource.content,
          remarkContent: dataSource.remark_content,
          name: dataSource.name,
          remarkTime: dataSource.remark_time
        };

        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async openEditModal(crtIdx) {
      const dataSource = await this.getDataSource(crtIdx);
      if (Object.keys(dataSource).length > 0) {
        this.edits = {
          id: this.dataList[crtIdx].id,
          propClassTitle: this.dataList[crtIdx].className,
          propClassId: this.dataList[crtIdx].classId.toString(),
          propTitle: dataSource.title,
          propContent: htmlToText(dataSource.content).htmlText
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    handleDelete(crtIdx) {
      this.$Modal.confirm({
        title: '删除这一条信息',
        content: '您是否要删除这一条记录? 删除后数据无法恢复!',
        onOk: () => this.deleteItem(crtIdx),
        onCancel: () => {
          this.$Message.warning('您取消了本次操作');
        }
      });
    },
    async deleteItem(crtIdx) {
      const { id } = this.dataList[crtIdx];
      const result = await deleteWorkSummary({ id });
      if (result.status === 'Success') {
        this.$Message.error('删除成功');
        this.getWorkSumaryData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    async getDataSource(crtIdx) {
      let dataSource = {};
      const { id } = this.dataList[crtIdx];
      const result = await getWorkSummaryDetail(id);
      if (result.status === 'Success') {
        if (result.data) {
          dataSource = result.data;
        }
      } else {
        this.$Message.error('查询失败');
      }
      return dataSource;
    },
    async exportItem(crtIdx) {
      this.$Message.success(`导出第${crtIdx + 1}条内容`);
      const { id } = this.dataList[crtIdx];
      const result = await exportWorkSummary({ id });
      downloadFile(
        result,
        `导出学期计划第${crtIdx + 1}条数据`,
        'application/pdf'
      );
    },
    changeTableData(params) {
      this.getWorkSumaryData(params);
    },
    // ? modal-functions
    handleClose() {
      this.$bus.$on('closeWorkSummaryModals', () => {
        // ? close-modals
        this.closeModals();
      });
    },
    closeModals() {
      this.isShowCreateModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getWorkSumaryData();
  },
  mounted() {
    this.handleClose();
  }
};
</script>
