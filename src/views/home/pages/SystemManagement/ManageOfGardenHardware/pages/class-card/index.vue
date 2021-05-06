<template>
  <div class="class-hardware-management">
    <!-- 顶部菜单 -->
    <my-menu
      @handleSearch="handleSearch"
      @handleSetPlan="handleSetPlan"
      @handleClose="handleShutdown"
    />
    <!-- 显示表格 -->
    <my-content
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      :total="total"
      @getSelectItem="getSelectItem"
      @handleItemPlan="handleItemPlan"
      @editItem="editItem"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- 弹窗部分 -->
    <Modal
      v-model="isShowPlanModal"
      :title="modalTitle"
      width="1080"
      :footer-hide="true"
    >
      <plan-modal-content
        v-bind="plans"
        @closeModals="closeModals"
        @refreshPage="getContentData"
      />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <edit-modal-content
        v-bind="edits"
        @handleSubmitEdit="handleSubmitEdit"
        @handleCancelEdit="closeModals"
      />
    </Modal>
    <!--    end   -->
  </div>
</template>

<script>
// ? import components
// ?? top
import MyMenu from './Menu';
import MyContent from 'HomePage/SystemManagement/SMTable';
import DivPage from '@common/bottom-account';

import PlanModalContent from './plan-modal-content';
import EditModalContent from '../EditModalContent';
// ? request
import {
  getClassboardList,
  getEditClassboard,
  editClassboard,
  shutdownClassboard
} from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import {
  classBoardTitle,
  handleAccountText,
  handleNetworkText
} from '../utils';
// ? bus
import ccBus from './ccBus';

export default {
  name: 'ClassCardManagement',
  components: {
    MyMenu,
    MyContent,
    DivPage,
    PlanModalContent,
    EditModalContent
  },
  data: () => ({
    // ? datas
    titleList: classBoardTitle,
    dataList: [],
    selectItem: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modals
    modalTitle: '',
    // ?? planModal
    isShowPlanModal: false,
    plans: {},
    // ?? editModal
    isShowEditModal: false,
    crtIdx: 0,
    edits: {}
  }),
  props: {},
  computed: {},
  methods: {
    // ? menu-methods
    handleSearch(params) {
      this.getContentData(params);
    },
    handleSetPlan() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要设置的开关机方案');
        return;
      } else {
        this.modalTitle = '批量设置开关机方案';
        this.plans = {
          ids: this.selectItem.map(item => item.id).toString(),
          propItem: {}
        };
        this.isShowPlanModal = true;
      }
    },
    handleShutdown() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要设置关机的列表选项');
        return;
      } else {
        this.$Modal.confirm({
          title: '一键关机',
          content: '确认操作?',
          onOk: () => {
            const ids = this.selectItem.map(item => item.id).toString();
            this.confirmShutdown(ids);
          }
        });
      }
    },
    async confirmShutdown(ids) {
      this.$Message.info('正在发送关机指令...');
      const result = await shutdownClassboard({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('设置关机成功');
        this.getContentData();
      } else this.$Message.error(`设置关机失败, 原因: ${result.msg}`);
    },
    // ? table-methods
    async getContentData(params = { pageSize: this.pageSize }) {
      this.tableIsLoading = true;
      const result = await getClassboardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        console.log(dataSource);
        const { data, classList } = deepCopyObj(dataSource);
        classList.length && ccBus.$emit('updateClassList', classList);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        Array.isArray(data.list) &&
          data.list.length &&
          this.setDataList(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.tableIsLoading = false;
    },
    setDataList(list) {
      // console.log(list);
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          bindingClass: item.binding_class || '',
          bindingId: item.binding_id || '0',
          userOfHardware: item.userOfHardware,
          serialNumber: item.serial_number,
          loginAccount: '暂无账号',
          loginTeacher: '暂无教师',
          networkStatus: handleNetworkText(item.login_status), // handleNetworkText
          bindClass: item.binding_class || '暂无绑定班级',
          accountStatus: handleAccountText(item.login_status), // handleAccountText
          name: item.name || '',
          desc: item.remark || '',
          machinePlan: {
            tag: '编辑',
            type: 'info'
          },
          operation: {
            tag: '编辑',
            type: 'primary'
          }
        });
      });
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    async handleItemPlan(crtIdx = 0) {
      const { id } = this.dataList[crtIdx],
        result = await getEditClassboard({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data } = deepCopyObj(dataSource);
        this.plans = {
          ids: id,
          propItem: data.open_time !== null ? JSON.parse(data.open_time) : {}
        };
        this.isShowPlanModal = true;
      }
    },

    editItem(itemIdx = 0) {
      this.$Message.info(`编辑第${itemIdx + 1}项`);
      const { id, name, desc } = this.dataList[itemIdx];
      this.edits = {
        id,
        editName: name,
        editDesc: desc
      };
      // console.log(this.edits);
      this.modalTitle = '编辑';
      this.isShowEditModal = true;
    },
    getContentByPage(params) {
      this.getContentData(params);
    },
    // ? modal-methods
    async handleSubmitEdit(params) {
      const result = await editClassboard(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑班牌信息成功');
        this.getContentData();
      } else this.$Message.error(`编辑班牌失败, 原因: ${result.msg}`);
      this.isShowEditModal = false;
    },
    closeModals() {
      this.$Message.info('本次会话关闭');
      this.modalTitle = '';
      this.isShowEditModal = false;
      this.isShowPlanModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getContentData();
  }
};
</script>
