<template>
  <div class="all-year-plan">
    <my-menu @handleAll="handleAll" @addYearPlan="addYearPlan" />
    <PlanTable
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @handleOperations="handleOperations"
      @getSelectItem="getSelectItem"
    />
    <bottom-account :total="total" :totalPage="totalPage" />
    <!-- modal-content -->
    <Modal
      v-model="isShowCreateModal"
      class="create"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <add @closeModals="closeModals" @refreshPage="getAllYearPlanData" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      class="info"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      class="edit"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <add
        v-bind="edits"
        @closeModals="closeModals"
        @refreshPage="getAllYearPlanData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
// ? 1. common / content components
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
// ? 2. child-components
import MyMenu from './components/MenuWrap';
import BottomAccount from '@common/bottom-account';

import Add from './components/add';
import Info from './components/info';

// ? request
import {
  getAllYearPlanList,
  getYearPlanDetail,
  exportYearPlan,
  deleteYearPlan
} from '@/request/plan/4-all-year-plan';
// ? utils
import { handleOpResult, downloadFile } from '@/utils';
// ? data / configs
import { operations, yearPlanTitle } from 'HomePage/PersonalPlan/common';

export default {
  name: 'AllYearPlan',
  components: {
    MyMenu,
    PlanTable,
    BottomAccount,

    Add,
    Info
  },
  data: () => ({
    titleList: yearPlanTitle,
    dataList: [],
    tableIsLoading: false,
    total: 0,
    totalPage: 20,
    selectItem: [],
    // ? modal-data
    modalTitle: '',
    // ?? add-modal
    isShowCreateModal: false,
    // ?? info-modal
    isShowInfoModal: false,
    infos: {},
    // ?? edit-modal
    isShowEditModal: false,
    edits: {}
  }),
  methods: {
    handleAll(btnTag, params) {
      switch (btnTag) {
        case '查询':
          this.getAllYearPlanData(params);
          break;
        case '删除':
          this.deleteSelectItems();
          break;
      }
    },
    deleteSelectItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('选择的内容不能为空');
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
      const result = await deleteYearPlan({ id });
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getAllYearPlanData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    cancelDeleteItems() {
      this.$Message.info('您取消了本次的删除操作');
    },
    addYearPlan() {
      this.modalTitle = '创建学期计划';
      this.isShowCreateModal = true;
    },
    async getAllYearPlanData(
      params = {
        page_size: this.totalPage
      }
    ) {
      let result = {};
      if (Object.keys(params).length === 0) {
        result = await getAllYearPlanList();
      } else {
        result = await getAllYearPlanList(params);
      }
      const dataSource = this.getDataSource(result);
      if (dataSource.total) {
        this.total = dataSource.total;
      }
      if (dataSource.list) {
        const { list } = dataSource;
        this.dataList = [];
        list.map((item, index) => {
          this.dataList.push({
            id: item.id,
            number: index + 1,
            title: `${item.year}-${item.year + 1}学年整年计划`,
            className: item.class_name,
            classId: item.class_id,
            status: item.status,
            createTime: item.create_time,
            operations
          });
        });
      }
    },
    getSelectItem(selection) {
      this.selectItem = selection;
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
          // ? 发请求导出
          this.handleExport(crtIdx, table);
          break;
        case '删除':
          this.handleDelete(crtIdx);
          break;
      }
    },
    async openInfoModal(crtIdx) {
      const { id } = this.dataList[crtIdx];
      const result = await getYearPlanDetail(id);
      const dataSource = this.getDataSource(result);
      this.infos = {
        title: this.dataList[crtIdx].title,
        createTime: dataSource[0].CreateTime,
        content: dataSource[0].content,
        remarkContent: this.dataList[crtIdx].status,
        name: dataSource[0].name ? dataSource[0].name : '还未点评',
        remarkTime: dataSource[0].remarkTime
          ? dataSource[0].remarkTime
          : '还未点评'
      };
      this.modalTitle = '详情';
      this.isShowInfoModal = true;
    },
    async openEditModal(crtIdx) {
      const { id, classId } = this.dataList[crtIdx];
      const result = await getYearPlanDetail(id);
      const dataSource = this.getDataSource(result);
      if (Object.keys(dataSource).length > 0) {
        this.edits = {
          id: this.dataList[crtIdx].id,
          propClassId: classId,
          propClassTitle: this.dataList[crtIdx].className,
          propYear: dataSource[0].year,
          propYearTitle: `${dataSource[0].year}-${dataSource[0].year + 1}学年`,
          propContent: dataSource[0].content
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    async handleExport(crtIdx) {
      this.$Message.info(`导出第${crtIdx + 1}项内容`);
      const { id } = this.dataList[crtIdx];
      const result = await exportYearPlan({ id });
      downloadFile(
        result,
        `导出学期计划第${crtIdx + 1}条数据`,
        'application/pdf'
      );
    },
    handleDelete(crtIdx) {
      const { id } = this.dataList[crtIdx];

      this.$Modal.confirm({
        title: `删除第${crtIdx + 1}项内容`,
        content: '是否删除? 删除后数据无法恢复',
        onOk: () => this.deleteItem(id),
        onCancel: () => this.$Message.warning('您取消了本次操作')
      });
    },

    getDataSource(result) {
      let dataSource = {};
      if (result.status === 'Success') {
        if (result.data) {
          dataSource = result.data;
        }
      } else {
        this.$Message.error('查询失败, 请稍后重试!');
      }
      return dataSource;
    },
    async deleteItem(id) {
      const result = await deleteYearPlan({ id });
      if (result.status === 'Success') {
        this.$Message.error('删除成功');
        this.getAllYearPlanData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    closeModals() {
      this.isShowCreateModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getAllYearPlanData();
  }
};
</script>
