<template>
  <div class="worker-info">
    <info-menu
      :isAbled="selectItem.length > 0"
      @handleSearch="handleSearch"
      @handleDelete="handleDelete"
      @openAddModal="openAddModal"
      @handleExports="handleExports"
    />
    <worker-table
      :titleList="titleList"
      :dataList="dataList"
      :isLoading="isLoading"
      @getCrtTable="getCrtTable"
      @getSelectItem="getSelectItem"
      @openInfoModal="openInfoModal"
      @openEditModal="openEditModal"
      @deleteItem="confirmDelete"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- 添加职工信息 -->
    <Modal
      v-model="isShowAddModal"
      class="create-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-worker
        @closeModals="closeModals"
        @refreshPage="getTableData"
        :readonly="false"
      />
    </Modal>
    <!-- 职工详情信息 -->
    <Modal
      v-model="isShowInfoModal"
      class="info-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <!-- crtId -->
      <add-worker :id="infos.uid" :readonly="true" :itemInfos="infos" />
    </Modal>
    <!-- 编辑职工信息 -->
    <Modal
      v-model="isShowEditModal"
      class="edit-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-worker
        :id="edits.uid"
        :readonly="false"
        :itemInfos="edits"
        @closeModals="closeModals"
        @refreshPage="getTableData"
      />
    </Modal>
    <!-- <Modal></Modal> -->
  </div>
</template>

<script>
import './index.less';
// ? components
import InfoMenu from './components/InfoMenu';
import WorkerTable from './components/WorkerTable';
import DivPage from '@common/bottom-account';

import AddWorker from './components/AddWorker';
// ? request
import {
  getStaffInfoList,
  getStaffDetail,
  // getStaffEdit,
  deleteStaff
} from '@/request/staff-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? storage
  localSave,
  localGet,
  // ? Object
  deepCopyObj
} from '@/utils';
import {
  // ? data
  titleList,
  itemOperations,
  // ? function
  exportTableByComponent,
  handlePropItem
} from './util';
// ? config
import { garden } from '@/config';
import { roleListBus, classListBus } from './eventBus';

export default {
  name: 'WorkerInfo',
  components: {
    InfoMenu,
    WorkerTable,
    DivPage,
    // ? About Modal
    AddWorker
  },
  data: () => ({
    placeHolder: '请输入职工姓名',
    titleList,
    dataList: [],
    isLoading: false,
    selectItem: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    crtTable: null,
    tableName: '',
    // ? modal
    modalTitle: '',
    // ? especial-modal
    isShowAddModal: false,
    isShowInfoModal: false,
    infos: {},
    isShowEditModal: false,
    edits: {},
    crtId: -1,
    // ? add-worker
    selectInfo: [
      {
        tag: '基本信息',
        type: 'primary'
      },
      {
        tag: '详细信息',
        type: 'default'
      }
    ]
  }),
  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    handleDelete() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要批量删除的内容');
        return;
      } else {
        this.$Modal.confirm({
          title: '删除',
          content: '是否删除?删除后数据无法恢复, 请谨慎操作',
          onOk: () => {
            const uid = this.selectItem.map(item => item.id).toString();
            this.confirmDelete(uid);
          }
        });
      }
    },
    openAddModal() {
      this.modalTitle = '添加职工信息';
      this.isShowAddModal = true;
      this.$bus.$emit('addStaffInfo');
    },
    async confirmDelete(uid) {
      const result = await deleteStaff({ uid });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(
          `删除失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    getCrtTable(crtTable) {
      this.crtTable = crtTable;
    },
    handleExports() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择导出的信息');
        return;
      }
      exportTableByComponent(this);
    },
    // ? content
    async getTableData(params = { pageSize: this.pageSize }) {
      this.isLoading = true;
      const result = await getStaffInfoList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        !localGet(garden.CLASS_DETAIL_INFO) &&
          dataSource.class_group &&
          localSave(garden.CLASS_DETAIL_INFO, dataSource.class_group);
        dataSource.class_group &&
          classListBus.$emit('getClassGroup', dataSource.class_group);
        dataSource.class_list && this.setClassList(dataSource.class_list);
        dataSource.role_list && this.setRoleList(dataSource.role_list);

        const data = deepCopyObj(dataSource.staff_info);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && data.list.length > 0 && this.setDataList(data.list);
      } else
        this.$Message.error(
          `请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.isLoading = false;
    },
    setClassList(listInfo = []) {
      const list = [];
      listInfo.map((item, index) => {
        list.push({
          key: index + 1,
          classId: item.id,
          grade: item.grade,
          info: item.ClassName
        });
      });
      localSave(garden.CLASS_INFO, list);
      this.$nextTick(() => classListBus.$emit('getClassList', list));
    },
    setRoleList(roleList = []) {
      let listIsExist = localGet(garden.ROLE_AUTH_LIST);
      if (listIsExist) {
        return;
      } else {
        const list = [];
        roleList.map((item, index) => {
          list.push({
            key: index + 1,
            id: item.id,
            info: item.name
          });
        });
        localSave(garden.ROLE_AUTH_LIST, list);
        roleListBus.$emit('getRolelist', list);
      }
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          realname: item.realname,
          sex: item.sex,
          mobile: item.mobile,
          card: item.card,
          rid: item.rid,
          status: item.status,
          birthday: item.birthday,
          hiredate: item.hiredate || '',
          motto: item.motto || '',
          honor: item.honor || '',
          manageClass: item.classNames || '暂无',
          name: item.name,
          operations: itemOperations
        });
      });
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    getContentByPage(params) {
      this.getTableData(params);
    },
    // ? modal
    async openInfoModal(uid) {
      const result = await getStaffDetail({ uid }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        console.log(data);
      } else this.$Message.error(`获取失败, 暂无内容`);
      this.infos = handlePropItem(this, uid);
      this.modalTitle = '职工信息详情';
      this.isShowInfoModal = true;
    },
    async openEditModal(item = {}) {
      const uid = item.id;
      const result = await getStaffDetail({ uid }),
        dataSource = getDataSource(result);
      if (dataSource) {
        this.edits = handlePropItem(this, uid);
        this.modalTitle = '编辑职工信息';
        this.isShowEditModal = true;
      }
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getTableData();
  },
  activated() {
    this.getTableData();
  }
};
</script>
