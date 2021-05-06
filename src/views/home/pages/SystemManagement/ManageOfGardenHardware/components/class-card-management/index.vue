<template>
  <div class="class-hardware-management">
    <!-- 顶部菜单 -->
    <Menu
      @handleSearch="searchTableItems"
      @handleSetPlan="handleSetPlan"
      @handleClose="handleClose"
    />
    <!-- 显示表格 -->
    <s-m-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      :total="total"
      @getSelectItem="getSelectItem"
      @handleItemPlan="handleItemPlan"
      @editItem="editItem"
    />
    <!-- 弹窗部分 -->
    <Modal
      v-model="isShowPlanModal"
      :title="modalTitle"
      width="1080"
      :footer-hide="true"
    >
      <plan-modal-content />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <edit-modal-content
        :editName="editName"
        :editDesc="editDesc"
        @handleSubmitEdit="handleSubmitEdit"
        @handleCancelEdit="handleCancelEdit"
      />
    </Modal>
    <!--    end   -->
  </div>
</template>

<script>
// ? import components
// ?? top
import Menu from './Menu';
// ?? content
import SMTable from 'HomePage/SystemManagement/SMTable';
// ??modal-content
import PlanModalContent from './PlanModalContent';
import EditModalContent from '../EditModalContent';

// ? import mixins
import getDataMix from './getDataMix';

export default {
  name: 'ClassCardManagement',

  components: { Menu, SMTable, PlanModalContent, EditModalContent },

  mixins: [getDataMix],

  data: () => ({
    // ? modal-data
    modalTitle: '',
    // ?? planModal
    isShowPlanModal: false,
    // ?? editModal
    isShowEditModal: false,
    currentItemIndex: 0,
    editName: '',
    editDesc: ''
  }),

  props: {},

  computed: {},

  methods: {
    // ? menu-methods
    searchTableItems() {
      this.tableIsLoading = true;
      setTimeout(() => {
        this.tableIsLoading = false;
        this.$Message.success('查询成功!');
      }, 500);
    },
    handleSetPlan() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请勾选需要设置的班牌');
      } else {
        this.modalTitle = '批量设置开关机计划';
        this.isShowPlanModal = true;
      }
    },
    handleClose() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请勾选需要设置的班牌');
      } else {
        this.$Message.info('正在发送关机请求...');
        setTimeout(() => {
          this.$Message.error('关机成功');
        }, 1500);
      }
    },
    // ? table-methods
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    handleItemPlan(index) {
      this.$Message.info(`设置第${index + 1}项的计划`);
      setTimeout(() => {
        this.modalTitle = `设置第${index + 1}项的计划`;
        this.isShowPlanModal = true;
      }, 320);
    },
    editItem(itemIndex) {
      this.$Message.info(`编辑第${itemIndex + 1}项`);
      this.currentItemIndex = itemIndex;
      this.editName = this.dataList[itemIndex].name;
      this.editDesc = this.dataList[itemIndex].desc;
      this.modalTitle = '编辑';
      this.isShowEditModal = true;
    },
    // ? modal-methods
    handleSubmitEdit() {
      setTimeout(() => {
        // this.dataList[this.currentItemIndex]
        this.$Message.success('保存成功');
        this.modalTitle = '';
        this.isShowEditModal = false;
      }, 666);
    },
    handleCancelEdit() {
      this.$Message.error('您取消了本次编辑');
      this.modalTitle = '';
      this.isShowEditModal = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
