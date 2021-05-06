<template>
  <div class="leave-children">
    <!-- leave-menu -->
    <my-menu
      @handleSearch="handleSearch"
      @handleDelete="deleteItems"
      @handleExport="handleExport"
    />
    <!-- leave-table -->
    <profile-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
      @getTable="getTable"
      @openInfoModal="openInfoModal"
      @setIntoGarden="setIntoGarden"
      @deleteSingleItem="deleteSingleItem"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <!-- info-Modal -->
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      class="info-modal"
      width="1000"
      :footer-hide="true"
      @on-cancel="closeModals"
    >
      <info-content v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
// ? import-components
import MyMenu from './LeaveMenu';
import ProfileTable from 'HomePage/ChildrenProfile/ProfileTable';
import DivPage from '@common/bottom-account';
import InfoContent from '../../modal/info';
// ? request
import {
  getInfantInfoList,
  getInfantDetail,
  deleteInfant
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
import { bmBus } from '../../my-utils';
import { titleList } from '../data';
import {
  exportPartTable,
  getGenderBySex,
  getOperationsByStatus
} from '../function';

export default {
  name: 'Leavechildren',
  components: {
    MyMenu,
    ProfileTable,
    DivPage,

    InfoContent
  },
  data: () => ({
    // ? menu-data
    // ? table-data
    titleList,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    tableIsLoading: false,
    selectItem: [],
    crtTable: [],
    filename: '表格',
    // ? modal-data
    modalTitle: '',
    isShowInfoModal: false,
    infos: {}
  }),
  methods: {
    // ? menus
    handleSearch(params) {
      this.getTableData(params);
    },
    deleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '批量删除',
        content: '是否删除?删除后数据无法恢复, 请谨慎操作',
        onOk: () => {
          const ids = this.selectItem.map(item => item.id).toString();
          this.confirmDelete(ids);
        }
      });
    },
    async confirmDelete(ids) {
      const result = await deleteInfant({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    handleExport() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要导出的内容');
        return;
      }
      this.$Modal.confirm({
        render: h => {
          return h('Input', {
            props: {
              value: this.filename,
              placeholder: '请输入导出的表格名称(默认为"表格")'
            },
            on: {
              input: val => (this.filename = val)
            }
          });
        },
        onOk: () => exportPartTable(this, this.filename)
      });
    },
    // ? tables
    async getTableData(params = { pageSize: this.pageSize, IsGraduate: 1 }) {
      this.tableIsLoading = true;
      const result = await getInfantInfoList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, class_group } = deepCopyObj(dataSource);
        Object.getOwnPropertyNames(class_group).length &&
          bmBus.$emit('getClassGroup', class_group);
        this.page = data.page || 0;
        // this.total = data.total || 0
        // this.totalPage = data.total_page || 0
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && this.getDataList(data.list);
      } else this.$Message.error(`请求列表数据失败, 原因: ${result.code}`);
      this.tableIsLoading = false;
    },
    getDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          id: item.infant_id,
          number: index + 1,
          name: item.NickName,
          gender: getGenderBySex(item.sex),
          age: getAgeByBirthday(item.birthday),
          className: item.ClassName,
          parentAccount: item.parent_account,
          date: item.InGardenDate,
          operations: getOperationsByStatus(item.status)
        });
      });
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
      const indexArr = this.selectItem.map(item => item.number);
      this.selectIndexArr = indexArr;
    },
    getTable(table) {
      this.crtTable = table;
    },
    async openInfoModal(id) {
      const result = await getInfantDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.infos = {
          infant: data.infant,
          parents: data.parents
        };
        console.log(this.infos);
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    setIntoGarden(itemIdx = 0) {
      const { id } = this.dataList[itemIdx];
      console.log(id);
    },
    deleteSingleItem(crtIdx = 0) {
      const { id } = this.dataList[crtIdx];
      this.confirmDelete(id);
    },
    getTableByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size,
        IsGraduate: 1
      };
      this.getTableData(params, this.filename);
    },
    // ? modals
    closeModals() {
      this.isShowInfoModal = false;
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
