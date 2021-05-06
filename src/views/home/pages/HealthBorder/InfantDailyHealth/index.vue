<template>
  <div class="children-daily-care">
    <children-menu
      @handleSearch="handleSearch"
      @handleDeleteItems="handleDeleteItems"
      @createTable="openAddModal"
    />
    <div class="content">
      <h-b-table
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
        @getSelectItem="getSelectItem"
        @handleTableItem="handleTableItem"
      />
    </div>
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      :page="page"
      :pageSize="pageSize"
    />
    <!-- 弹窗部分: 添加Modal和详情Modal -->
    <Modal
      class-name="add-modal"
      v-model="isShowAddModal"
      :title="modalTitle"
      width="1420"
      :footer-hide="true"
    >
      <daily-add-content />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="1420"
      class-name="info-modal"
      :footer-hide="true"
    >
      <daily-info-content v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
import './index.less';

// ? import components
import ChildrenMenu from './components/ChildrenMenu';
import HBTable from '../HBTable';
import DailyAddContent from './components/add-content';
import DailyInfoContent from './components/DailyInfoContent';
import BottomAccount from '@common/bottom-account';

// ? request
import {
  getInfantHealthDetail,
  deleteInfantHealth
} from '@/request/health-border';

// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult
  // ? render
  // healthStatus,
  // handleChildType
} from '@/utils';

// ? import mixins
import getTableMix from './getTableMix';

export default {
  name: 'ChildrenDailyCare',
  components: {
    ChildrenMenu,
    HBTable,
    DailyAddContent,
    DailyInfoContent,
    BottomAccount
  },
  mixins: [getTableMix],
  data: () => ({
    selectItem: [],
    // ? modal-data
    modalTitle: '',
    // ?? add-modal
    isShowAddModal: false,
    // ?? info-modal
    isShowInfoModal: false,
    infos: {}
  }),
  methods: {
    // ? menu-functions
    handleSearch(params) {
      this.getTableData(params);
    },
    handleDeleteItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择需要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '删除',
        content: '是否删除? 删除后数据无法恢复',
        onOk: async () => {
          const id = this.selectItem.map(item => item.id).toString();
          const result = await deleteInfantHealth({ id });
          if (handleOpResult(result)) {
            this.$Message.success('删除成功');
            this.getTableData();
          } else
            this.$Message.error(
              `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
            );
        },
        onCancel: () => {}
      });
    },
    openAddModal() {
      this.isShowAddModal = true;
      this.modalTitle = '报表';
    },
    // ? table-functions
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    handleTableItem(itemIdx, btnIndex) {
      switch (btnIndex) {
        case 0:
          this.openInfoModal(itemIdx);
          break;
        case 1:
          this.$Modal.confirm({
            title: `删除第${itemIdx + 1}条数据`,
            content: '是否删除? 删除后数据无法恢复',
            onOk: () => this.confirmDeleteItem(itemIdx),
            onCancel: () => this.$Message.info('您取消了本次删除操作')
          });
          break;
      }
    },
    async openInfoModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getInfantHealthDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.infos = {
          recordDate: info.record_date,
          type: this.dataList[itemIdx].type,
          className: info.ClassName,
          childName: this.dataList[itemIdx].childName,
          temperature: info.temperature,
          healthStatus: this.dataList[itemIdx].healthStatus,
          symptom:
            info.symptom.indexOf(',') !== -1
              ? info.symptom.split(',')
              : [info.symptom],
          handleType:
            this.dataList[itemIdx].processMode === 1
              ? '正常入园'
              : this.dataList[itemIdx].processMode === 2
              ? '离园回家'
              : '未知',
          remark: this.dataList[itemIdx].remark,
          symbolImgList: JSON.parse(info.img),
          teacherName: this.dataList[itemIdx].teacherName,
          registerTime: info.update_time
        };
        // ? 先传数据再设置modal显示
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async confirmDeleteItem(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await deleteInfantHealth({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {}
};
</script>
