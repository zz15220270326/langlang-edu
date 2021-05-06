<template>
  <div class="grow-profile">
    <grow-menu
      @handleSearch="handleSearch"
      @handleDelete="handleDelete"
      @handleOpen="openAddModal"
    />
    <profile-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
      @openInfoModal="openInfoModal"
      @openEditModal="openEditModal"
      @deleteSingleItem="deleteSingleItem"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <!-- Modal-content -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add @closeModals="closeModals" @refreshPage="getTableData" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <edit :edits="edits" @closeModals="closeModals" />
    </Modal>
    <!--  -->
  </div>
</template>

<script>
// ? import components
import GrowMenu from './components/GrowMenu';
import ProfileTable from 'HomePage/ChildrenProfile/ProfileTable';
import DivPage from '@common/bottom-account';

import Add from './components/Add';
import Info from './components/Info';
import Edit from './components/Add';

// ? request
import {
  getGrowupList,
  getGrowupDetail,
  // getGrowupEdit,
  deleteGrowup
} from '@/request/children-profile';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj,
  // ? time
  getAgeByBirthday
} from '@/utils';
import guBus from './guBus';
import { titleList, operations } from './data';

export default {
  name: 'GrowProfile',
  components: {
    GrowMenu,
    ProfileTable,
    DivPage,

    Info,
    Add,
    Edit
  },
  data: () => ({
    // ? table-data
    titleList,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    tableIsLoading: false,
    selectItem: [],
    // ? modal-data
    modalTitle: '',
    // ?? add
    isShowAddModal: false,
    // ?? info-modal
    isShowInfoModal: false,
    infos: {},
    currentClass: '',
    childName: '',
    selectMonth: '',
    rateValue: 0,
    honner: [],
    teacherComment: '',
    lifeImages: [],
    // ?? edit-modal
    isShowEditModal: false,
    edits: {}
  }),
  methods: {
    // ? menu-functions
    handleSearch(params = {}) {
      this.getTableData(params);
    },
    handleDelete() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '批量删除',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.selectItem.map(item => item.id).toString();
          this.confirmDelete(ids);
        }
      });
    },
    async confirmDelete(ids) {
      const result = await deleteGrowup({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    openAddModal() {
      this.modalTitle = '添加';
      this.isShowAddModal = true;
    },
    // ? table-functions
    async getTableData(params = { pageSize: this.pageSize }) {
      this.tableIsLoading = true;
      const result = await getGrowupList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, class_group } = deepCopyObj(dataSource);
        data && this.getListInfo(data);
        Object.getOwnPropertyNames(class_group).length &&
          guBus.$emit('getClassGroup', class_group);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.tableIsLoading = false;
    },
    getListInfo(infos = {}) {
      this.page = infos.page || 0;
      this.total = infos.count || 0;
      this.totalPage = infos.pageCount || 0;
      this.dataList = [];
      infos.list && this.getDataList(infos.list);
    },
    getDataList(list = []) {
      list.length &&
        list.map((item, index) => {
          this.dataList.push({
            id: item.id,
            number: index + 1,
            name: item.name,
            gender: item.sex === 1 ? '男' : item.sex === 2 ? '女' : '未知',
            age: getAgeByBirthday(item.birthday),
            className: item.ClassName,
            date: item.GrowDate,
            operations
          });
        });
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    async openInfoModal(id, infantName) {
      const result = await getGrowupDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const infos = deepCopyObj(dataSource),
          { growup } = infos;
        this.infos = {
          id: growup.id,
          className: growup.className,
          infantName,
          date: growup.GrowDate,
          honor: parseInt(growup.Honor),
          comment: growup.TeacherComment,
          imgs: growup.pictures
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async openEditModal(id) {
      const result = await getGrowupDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const infos = deepCopyObj(dataSource),
          { growup } = infos;
        console.log(infos);
        this.edits = {
          id: growup.id,
          classId: growup.ClassId,
          infantId: growup.InfantId,
          grade: parseInt(growup.Grade),
          date: growup.GrowDate || '',
          honor: growup.Honor || '',
          comment: growup.TeacherComment || '',
          pIds: growup.picIds || [],
          pictures: growup.pictures || []
        };
        console.log(this.edits);
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    deleteSingleItem(idx = 0) {
      this.confirmDelete(this.dataList[idx].id);
    },
    getTableByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size
      };
      this.getTableData(params);
    },
    // ? modal-functions
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
