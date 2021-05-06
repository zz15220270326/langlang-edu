<template>
  <div class="weekly-cookbook">
    <weekly-menu @handleOperations="handleMenus" @openAddModal="openAddModal" />
    <h-c-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
      @handleTableItem="handleTableItem"
    />
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      @changeTableData="changeTableData"
    />
    <base-footer />
    <div class="modal-content">
      <!-- 新建食谱 -->
      <Modal
        v-model="isShowAddModal"
        :title="modalTitle"
        width="1200"
        :footer-hide="true"
      >
        <add-cookbook @refreshWCB="refreshWCB" @closeModals="closeModals" />
      </Modal>
      <!-- 查看食谱 -->
      <Modal
        v-model="isShowInfoModal"
        :title="modalTitle"
        width="1200"
        :footer-hide="true"
      >
        <cookbook-info v-bind="infos" />
      </Modal>
      <Modal
        v-model="isShowEditModal"
        :title="modalTitle"
        width="1200"
        :footer-hide="true"
      >
        <add-cookbook v-bind="edits" @closeModals="closeModals" />
      </Modal>
      <!-- 复制食谱 -->
      <Modal
        v-model="isShowCopyModal"
        :title="modalTitle"
        width="1200"
        :footer-hide="true"
      >
        <add-cookbook
          v-bind="copys"
          @refreshWCB="refreshWCB"
          @closeModals="closeModals"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
// ? import components
import BottomAccount from '@common/bottom-account';
import BaseFooter from '@common/base-footer';

import HCTable from '../HCTable';
import WeeklyMenu from './components/recipes-menu';
import AddCookbook from './components/add-cook-book';
import CookbookInfo from './components/check-cook-book';
// ? request
import {
  getMenuList,
  deleteMenuInfo,
  getMenuInfo
} from '@/request/health-care';
// ? utils
import { getDataSource, checkDataSource, handleOpResult } from '@/utils';
import { titleList, formatContent } from './myUtils';

export default {
  name: 'WeeklyCookbook',
  components: {
    WeeklyMenu,
    HCTable,
    BottomAccount,
    BaseFooter,

    AddCookbook,
    CookbookInfo
  },
  data: () => ({
    // ? menu-data
    // todo (选择要删除的按钮)
    selectItem: [],
    // ?? operations
    operations: [],

    // ? table-data
    titleList,
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal-content
    modalTitle: '',
    isShowAddModal: false,
    isShowInfoModal: false,
    infos: {},
    isShowEditModal: false,
    edits: {},
    isShowDeleteModal: false,
    isShowCopyModal: false,
    copys: {}
  }),
  methods: {
    // ? menu-functions
    handleMenus(btnIdx, params) {
      switch (btnIdx) {
        case 0:
          this.getTableData(params);
          break;
        case 1:
          if (this.selectItem.length > 0) {
            this.confirmDeleteItems();
          } else {
            this.$Message.warning('请选择要删除的内容');
          }
          break;
      }
    },
    confirmDeleteItems() {
      const id = this.selectItem.map(item => item.id).toString();
      this.$Modal.confirm({
        title: '批量删除',
        content: '是否删除',
        onOk: async () => {
          const result = await deleteMenuInfo({ id });
          if (handleOpResult(result)) {
            this.$Message.success('删除成功');
            this.getTableData();
          } else this.$Message.error('删除失败, 请稍后重试');
        }
      });
    },
    openAddModal() {
      this.$bus.$emit('initAddMenu');
      this.$bus.$emit('initAMContent');
      this.modalTitle = '创建食谱';
      this.isShowAddModal = true;
    },
    // ? table-functions
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getMenuList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page | 0;
        this.total = info.total | 0;
        this.totalPage = info.totalPage | 0;
        if (info.list) {
          const { list } = info;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              id: item.id,
              number: index + 1,
              weekTime: `${item.year}~${item.year + 1}学年${
                item.semester === 1
                  ? '第一学期'
                  : item.semester === 2
                  ? '第二学期'
                  : '未知学期'
              }第${item.week}周食谱`,
              realname: item.realname,
              createTime: item.create_time,
              operations: [
                {
                  tag: '详情',
                  type: 'info'
                },
                {
                  tag: '编辑',
                  type: 'primary'
                },
                {
                  tag: '删除',
                  type: 'error'
                },
                {
                  tag: '复制食谱',
                  type: 'success'
                }
              ]
            });
          });
        }
      } else this.$Message.error('请求失败, 请稍后重试');
    },
    changeTableData(params) {
      this.getTableData(params);
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    handleTableItem(itemIdx, buttonIndex) {
      const { id } = this.dataList[itemIdx];
      switch (buttonIndex) {
        case 0:
          this.getInfoById(id, itemIdx);
          break;
        case 1:
          this.editInfoById(id, itemIdx);
          break;
        case 2:
          // todo 删除内容
          this.$Modal.confirm({
            title: `删除第${itemIdx + 1}条内容`,
            content: '确认删除? 删除后数据无法恢复',
            onOk: () => this.confirmDelete(itemIdx),
            onCancel: () => this.$Message.info('您取消了本次删除操作')
          });
          break;
        case 3:
          // todo 复制食谱
          this.openCopyModal(itemIdx, id);
          break;
      }
    },
    async getInfoById(id, itemIdx) {
      const result = await getMenuInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const content = JSON.parse(dataSource.content);
        const dataList = formatContent(content);
        this.infos = {
          title: this.dataList[itemIdx].weekTime,
          dataList
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      } else this.$Message.error('查询失败, 请稍后重试');
    },
    async editInfoById(id) {
      const result = await getMenuInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const content = JSON.parse(dataSource.content);
        const year = dataSource.year.toString() | '';
        const semester = dataSource.semester.toString() | '';
        const week = dataSource.week.toString() | '';
        this.$bus.$emit('getEditSelect', { id, year, semester, week });
        this.$bus.$emit('getEditContent', { id, content });
        this.edits = { id, content };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    async confirmDelete(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await deleteMenuInfo({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else this.$Message.error('删除失败, 请稍后重试');
    },
    async openCopyModal(itemIdx, id) {
      const result = await getMenuInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const content = JSON.parse(dataSource.content);
        const year = dataSource.year.toString() | '';
        const semester = dataSource.semester.toString() | '';
        const week = dataSource.week.toString() | '';
        this.$bus.$emit('getEditSelect', { id, year, semester, week });
        this.$bus.$emit('getEditContent', { id, content });
        this.copys = {
          id: -1,
          content
        };
        this.modalTitle = `复制后添加`;
        this.isShowCopyModal = true;
      }
    },
    // ? modal-functions
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
      this.isShowCopyModal = false;
    },
    refreshWCB() {
      this.closeModals();
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.weekly-cookbook {
  .divide-page {
    margin: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
