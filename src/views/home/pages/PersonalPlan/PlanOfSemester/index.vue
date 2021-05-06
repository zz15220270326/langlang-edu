<template>
  <div class="semester-plan">
    <my-menu @handleAll="handleAll" @addSemesterPlan="addSemesterPlan" />
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
      :pageSize="pageSize"
    />
    <!-- modal -->
    <Modal
      v-model="isShowCreateModal"
      class="create-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
      :transfer="false"
    >
      <add @refreshPage="getSemesterData" @closeModals="closeModals" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      class="info-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
      :transfer="false"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      class="edit-modal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
      :transfer="false"
    >
      <add
        v-bind="edits"
        @refreshPage="getSemesterData"
        @closeModals="closeModals"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
import BottomAccount from '@common/bottom-account';

import MyMenu from './components/MenuWrap';
import Add from './components/add';
import Info from './components/info';
// ? request
import {
  deleteSemesterPlan,
  getSemesterPlanList,
  getExportPlan,
  getSemesterPlanInfo
} from '@/request/plan/2-semester-plan';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleOpResult,
  htmlToText,
  downloadFile
} from '@/utils';
// ? data / configs
import { operations, semesterPlanTitle } from 'HomePage/PersonalPlan/common';

export default {
  name: 'SemesterPlan',
  components: {
    PlanTable,
    MyMenu,
    BottomAccount,

    Add,
    Info
  },
  data: () => ({
    titleList: semesterPlanTitle,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    tableIsLoading: false,
    selectItem: [],
    // ? modal
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
    // ? menus
    handleAll(btnTag, params) {
      switch (btnTag) {
        case '查询':
          this.handleSearch(params);
          break;
        case '删除':
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch(params) {
      this.tableIsLoading = true;
      this.getSemesterData(params);
    },
    handleDeleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要删除的计划项');
        return;
      } else {
        this.$Modal.confirm({
          title: '批量删除',
          content: '是否删除选中项?',
          onOk: () => this.deleteItems()
        });
      }
    },
    async deleteItems() {
      const idArr = [];
      this.selectItem.map(item => idArr.push(item.id));
      const id = idArr.toString();
      const result = await deleteSemesterPlan({ id });
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getSemesterData();
      } else {
        this.$Message.warning('删除失败, 请稍后重试');
      }
    },
    addSemesterPlan() {
      this.modalTitle = '创建学期计划';
      this.isShowCreateModal = true;
    },
    // ? content-functions
    async getSemesterData(params = { page_size: this.pageSize }) {
      const result = await getSemesterPlanList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.page = dataSource.page || 0;
        this.total = dataSource.total | 0;
        this.totalPage = dataSource.total_page | 0;
        this.dataList = [];
        dataSource.list && this.setDataList(dataSource.list);
      }
      this.tableIsLoading = false;
    },
    setDataList(list) {
      list.forEach((item, index) => {
        this.dataList.push({
          number: index + 1,
          planSemester: `${item.year}~${item.year + 1}学年第${
            item.semester
          }学期计划`,
          className: item.class_name,
          classId: item.class_id,
          status: item.status,
          createTime: item.create_time,
          operations,
          // ? maybe-use
          id: item.id,
          type: item.type,
          realname: item.realname
        });
      });
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    handleOperations(tag, selectIndex, table) {
      switch (tag) {
        case '详情':
          this.openInfoModal(selectIndex);
          break;
        case '编辑':
          this.openEditModal(selectIndex);
          break;
        case '导出':
          this.exportItem(selectIndex, table);
          break;
        case '删除':
          this.handleDelete(selectIndex);
          break;
      }
    },
    // ? modal-functions // ${selectIndex + 1}条
    async openInfoModal(selectIndex) {
      const { id } = this.dataList[selectIndex];
      const dataSource = await this.getDataById(id);
      if (Object.keys(dataSource).length > 0) {
        this.infos = {
          title: this.dataList[selectIndex].planSemester,
          createTime: dataSource.create_time,
          content: dataSource.content,
          remarkContent: dataSource.remark_content,
          name: dataSource.name,
          remarkTime: dataSource.remark_time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      } else {
        this.$Message.error('请求数据失败, 请稍后重试');
      }
    },
    async openEditModal(selectIndex) {
      this.$Message.info(`编辑第${selectIndex + 1}条`);
      const { id, classId } = this.dataList[selectIndex];
      const dataSource = await this.getDataById(id);
      if (Object.keys(dataSource).length > 0) {
        const { year, semester, content } = dataSource;
        console.log(this.dataList[selectIndex]);
        // console.log(classId)
        this.edits = {
          id,
          propYear: year,
          propYearTitle: `${year}~${year + 1}学年`,
          propSemester: semester,
          propSemesterTitle:
            semester * 1 === 1
              ? '第一学期'
              : semester * 1 === 2
              ? '第二学期'
              : '未知学期',
          propClassId: classId.toString(),
          propClassTitle: this.dataList[selectIndex].className,
          propContent: htmlToText(content).htmlText
        };

        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      } else {
        this.$Message.error('请求数据失败, 请稍后重试');
      }
    },
    async exportItem(selectIndex) {
      const { id } = this.dataList[selectIndex],
        result = await getExportPlan({ id });
      downloadFile(
        result,
        `导出学期计划第${selectIndex}条数据`,
        'application/pdf'
      );
    },
    async handleDelete(selectIndex) {
      this.$Message.error(`删除第${selectIndex + 1}条`);
      const { id } = this.dataList[selectIndex];
      const result = await deleteSemesterPlan({ id });
      this.checkResult(result);
    },
    closeModals() {
      this.isShowCreateModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    },
    async getDataById(id) {
      let dataSource = {};
      const result = await getSemesterPlanInfo(id);
      if (result.status === 'Success') {
        if (result.data) {
          dataSource = result.data;
        }
      }
      return dataSource;
    },
    checkResult(result) {
      let msg = '';
      if (result.status === 'Success') {
        msg = '删除成功';
        this.$Message.success(msg);
        this.getSemesterData();
      } else {
        msg = '操作失败, 请稍后重试';
        this.$Message.error(msg);
      }
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getSemesterData();
  }
};
</script>
