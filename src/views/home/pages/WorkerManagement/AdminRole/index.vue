<template>
  <div class="worker-authority">
    <my-menu
      @handleSearch="handleSearch"
      @deleteItems="deleteItems"
      @handleAddModal="handleAddModal"
    />
    <!-- 显示表格 -->
    <my-content
      :titleList="titleList"
      :dataList="dataList"
      :isLoading="isLoading"
      @getSelectItem="getSelectItem"
      @handleAuth="handleAuth"
      @handleEdit="handleEdit"
      @deleteItem="confirmDelete"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <!-- 添加弹窗 -->
    <Modal
      v-model="isShowAddModal"
      class="create-modal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-info @closeModals="closeModals" @refreshPage="refreshPage" />
    </Modal>
    <!-- 授权弹窗 -->
    <Modal
      v-model="isShowAuthModal"
      class="create-modal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <auth-info
        v-bind="auths"
        @closeModals="closeModals"
        @refreshPage="refreshPage"
      />
    </Modal>
    <!-- 编辑弹窗 -->
    <Modal
      v-model="isShowEditModal"
      class="create-modal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-info
        v-bind="edits"
        @closeModals="closeModals"
        @refreshPage="refreshPage"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import MyMenu from './components/AuthMenu';
import MyContent from './components/AuthTable';
import DivPage from '@common/bottom-account';

import AddInfo from './components/AddInfo';
import AuthInfo from './components/AuthInfo';

// ? request
import {
  getRoleList,
  deleteRole
  // getRoleAuth
  // getAdminEdit
} from '@/request/staff-management';
// ? utils
import {
  // * request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // * object
  deepCopyObj
} from '@/utils';
import { titleList, operations } from './util';
import { sendDemo } from './events';

export default {
  name: 'AdminRole',
  components: {
    MyMenu,
    MyContent,
    DivPage,

    AddInfo,
    AuthInfo
  },
  data: () => ({
    // ? content
    titleList,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    isLoading: false,
    selectItem: [],
    // ? modal
    modalTitle: '',
    // ? add-modal
    isShowAddModal: false,
    // ? auth-modal
    isShowAuthModal: false,
    auths: {},
    // ? edit-modal
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
        this.$Message.warning('请选择批量删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '批量删除',
        content: '是否删除, 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.selectItem.map(item => item.id).toString();
          this.confirmDelete(ids);
        }
      });
    },
    async confirmDelete(ids) {
      const result = await deleteRole({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.page = 1;
        this.getTableData();
      } else
        this.$Message.error(
          `请求数据失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    handleAddModal() {
      this.modalTitle = '添加职位权限';
      this.isShowAddModal = true;
    },
    // ? content
    async getTableData(params = { pageSize: this.pageSize }) {
      this.isLoading = true;
      const result = await getRoleList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, demo } = deepCopyObj(dataSource);
        this.page = data.page || 1;
        this.total = data.count || data.length || 0;
        this.totalPage = data.pageCount || 1;
        if (data.list.length > 0) this.setDataList(data.list);
        sendDemo.$emit('handleDemo', demo);
      } else this.$Message.error(`请求数据失败, 原因: ${result.msg}`);
      this.isLoading = false;
    },
    setDataList(list = []) {
      this.dataList = [];
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          gardenId: item.garden_id,
          name: item.name,
          remark: item.remark,
          status: item.status,
          createTime: item.create_time,
          updateTime: item.update_time,
          access: item.access,
          operations
        });
      });
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    async handleAuth(roleId) {
      const { access } = this.dataList.find(item => item.id === roleId);
      this.auths = {
        roleId,
        listInfo: access
        // listInfo: Object.keys(access).map(k => access[k])
      };
      this.modalTitle = '职工权限';
      this.isShowAuthModal = true;
    },
    async handleEdit(crtIdx = 0) {
      const { id, name, remark } = this.dataList[crtIdx];
      this.edits = {
        id,
        name,
        remark
      };
      this.modalTitle = '编辑';
      this.isShowEditModal = true;
    },
    getTableByPage(params) {
      this.getTableData(params);
    },
    refreshPage() {
      this.page = 1;
      this.getTableData();
    },
    // ? modal
    closeModals() {
      this.isShowAddModal = false;
      this.isShowAuthModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
