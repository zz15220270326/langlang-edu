<template>
  <div class="inside-children">
    <inside-menu
      @handleSearch="handleSearch"
      @handleDeleteItems="handleDeleteItems"
      @handleExport="handleExport"
      @handleAddInfant="handleAddInfant"
      @handleExports="handleExports"
    />
    <profile-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getTable="getTable"
      @getSelectItem="getSelectItem"
      @openInfoModal="openInfoModal"
      @openEditModal="openEditModal"
      @setLeaveGarden="setLeaveGarden"
      @deleteSingleItem="deleteSingleItem"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <!-- modal-content -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      class="add-modal"
      width="1000"
      :footer-hide="true"
    >
      <add-content @closeModals="closeModals" @refreshPage="getContentData" />
    </Modal>
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
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      class="edit-modal"
      width="1000"
      :footer-hide="true"
      @on-cancel="closeModals"
    >
      <add-content v-bind="edits" @closeModals="closeModals" />
    </Modal>
  </div>
</template>

<script>
// ? components
// ?? menu
import InsideMenu from './InsideMenu';
// ?? table
import ProfileTable from 'HomePage/ChildrenProfile/ProfileTable';
// ? account-page
import BottomAccount from '@common/bottom-account';
// ?? modal
import AddContent from '../../modal/add';
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
  handleErrorCode,
  handleOpResult,
  // ? time
  getAgeByBirthday,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { exportPartTable } from '../function';
import {
  // ? data
  titleList,
  operations,
  bmBus
} from '../../my-utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InsideChildren',
  components: {
    InsideMenu,
    ProfileTable,
    BottomAccount,

    AddContent,
    InfoContent
  },
  data: () => ({
    filename: '导出文件',
    crtTable: null,
    titleList,
    dataList: [],
    selectItem: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    modalTitle: '',
    isShowAddModal: false,
    adds: {},
    isShowInfoModal: false,
    infos: {},
    isShowEditModal: false,
    edits: {}
  }),
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'defaultDay'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContentData(params);
    },
    handleDeleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择需要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '删除选中的内容',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.selectItem.map(item => item.infantId).toString();
          const params = {
            ids,
            away: 0
          };
          this.deleteItem(params);
        }
      });
    },
    async deleteItem(params) {
      const result = await deleteInfant(params);
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    handleExport() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择需要导出的内容');
        return;
      }
      this.$Modal.confirm({
        render: h => {
          return h('Input', {
            props: {
              value: this.filname,
              // autofocus: true,
              placeholder: '请输入要导出的文件名称, 默认为"导出文件"'
            },
            on: {
              input: val => (this.filname = val)
            }
          });
        },
        onOk: () => exportPartTable(this)
      });
    },
    handleAddInfant() {
      this.modalTitle = '添加';
      this.isShowAddModal = true;
    },
    handleExports() {
      this.crtTable.exportCsv({
        filename: '幼儿信息(全部)',
        original: false
      });
    },
    // ? table functions
    getTable(table) {
      this.crtTable = table;
    },
    getSelectItem(selectItem = []) {
      this.selectItem = selectItem;
    },
    async getContentData(params = { pageSize: this.pageSize }) {
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
        if (data.list) {
          this.setDataList(data.list);
        }
      } else {
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      }
      this.tableIsLoading = false;
    },
    setDataList(list) {
      this.dataList = [];
      list.map((item, index) => {
        this.dataList.push({
          infantId: item.infant_id,
          number: index + 1,
          infantName: item.NickName,
          gender: item.sex === 1 ? '男' : item.sex === 2 ? '女' : '未知',
          age: getAgeByBirthday(item.birthday),
          className: item.ClassName,
          parentAccount: item.parent_account,
          inGardenDate: item.InGardenDate,
          operations,
          birthday: item.birthday + '岁',
          nation: item.nation
        });
      });
    },
    // ? modal-functions
    async openInfoModal(id) {
      const result = await getInfantDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.infos = {
          infant: data.infant,
          parents: data.parents
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async openEditModal(id) {
      const result = await getInfantDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.edits = {
          id,
          infant: data.infant,
          parents: data.parents
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    async setLeaveGarden(itemIdx) {
      const params = {
        ids: this.dataList[itemIdx].infantId,
        away: 1
      };
      const result = await deleteInfant(params);
      if (handleOpResult(result)) {
        this.$Message.success('设置离园成功');
        this.getContentData();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    deleteSingleItem(itemIdx) {
      const params = {
        ids: this.dataList[itemIdx].infantId,
        away: 0
      };
      this.deleteItem(params);
    },
    getTableByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size
      };
      this.getContentData(params);
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getContentData();
  }
};
</script>
