<template>
  <div class="class-info">
    <my-menu
      @handleSearch="handleSearch"
      @deleteItems="deleteItems"
      @handleAddModal="handleAddModal"
    />
    <div class="table-content">
      <my-content
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
        @getSelectItem="getSelectItem"
        @handleClassUpgrade="handleClassUpgrade"
        @handleGraduate="handleGraduate"
        @openEditModal="openEditModal"
        @deleteItem="confirmDelete"
      />
    </div>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
    />
    <!-- modal-content -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-content @closeModals="closeModals" @refreshPage="getTableData" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-content
        :edits="edits"
        :id="edits.id || 0"
        @closeModals="closeModals"
        @refreshPage="getTableData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import MyMenu from './components/class-info-menu';
import MyContent from 'HomePage/ClassManagement/CMTable';
import DivPage from '@common/bottom-account';

import AddContent from './components/add-content';

import { setLocalClass } from './function';

// ? request
import {
  getClassInfoList,
  deleteClassInfo,
  upgradeClass,
  graduateClass,
  getAlbumEdit
} from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? obj
  deepCopyObj
} from '@/utils';
import { titleList } from './data';
import { handleGrade, handleOperations } from './function';
// ? configs

export default {
  name: 'ClassInfo',

  components: {
    MyMenu,
    MyContent,
    DivPage,

    AddContent
  },

  data: () => ({
    // ? content
    titleList,
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    selectItem: [],
    // ? modals
    modalTitle: '',
    isShowAddModal: false,
    isShowEditModal: false,
    edits: {}
  }),

  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    deleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择需要删除的内容');
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
      const result = await deleteClassInfo({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(
          `删除失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    handleAddModal() {
      this.modalTitle = '添加班级';
      this.isShowAddModal = true;
    },
    // ? content
    async getTableData(params = { pageSize: this.pageSize }) {
      const result = await getClassInfoList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        const { page, count, pageCount, list } = data.class_info;
        this.page = page || 0;
        this.total = count || 0;
        this.totalPage = pageCount || 0;
        this.dataList = [];
        Array.isArray(list) && list.length && this.setDataList(list);
        Array.isArray(list) && list.length && setLocalClass(list);
      } else
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    setDataList(list = []) {
      // console.log(list)
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          grade: handleGrade(item.grade),
          className: item.ClassName,
          infantNum: item.InfantNum,
          entryTime: item.EntranceDate,
          graduateTime: item.GraduationTime,
          slogan: item.slogan,
          gardenId: item.GardenId,
          albumId: item.AlbumId,
          status: item.status,
          teachers: item.teachers || '缺少班级教师字段',
          operations: handleOperations(item.grade)
        });
      });
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    // ? modals
    async handleClassUpgrade(id) {
      const result = await upgradeClass({ id });
      if (handleOpResult(result)) {
        this.$Message.success('升班成功');
        this.getTableData();
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
    },
    async handleGraduate(id) {
      const result = await graduateClass({ id });
      if (handleOpResult(result)) {
        this.$Message.success('恭喜, 毕业啦!');
        this.getTableData();
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
    },
    async openEditModal(id) {
      const crtData = this.dataList.find(item => item.id === id);
      const result = await getAlbumEdit({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // const data = deepCopyObj(dataSource);
        // console.log(data);
        this.edits = {
          id,
          className: crtData.className,
          infantNum: crtData.infantNum,
          entryTime: crtData.entryTime,
          grade: crtData.grade,
          slogan: crtData.slogan,
          status: crtData.status,
          teachers: crtData.teachers
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    // ? modal-functions
    closeModals() {
      this.isShowAddModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.class-info {
  background-color: #fff;
  height: 100vh;
  padding-bottom: 1.2rem;
}
</style>
