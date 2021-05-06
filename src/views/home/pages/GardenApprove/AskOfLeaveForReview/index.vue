<template>
  <div class="children-ask-leave">
    <leave-query-menu
      @getTableByStatus="getTableByStatus"
      @getTableByClick="getTableByClick"
    />
    <div class="table-content">
      <show-table
        :titleList="titleList"
        :dataList="dataList"
        :operations="operations"
        @handleSelect="handleSelect"
      />
    </div>
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="changeTableData"
    />
    <div class="modal-content">
      <!-- 待审批弹窗 -->
      <Modal
        v-model="isShowEditModal"
        class="to-approve-modal"
        width="800"
        :title="modalTitle"
        :footer-hide="true"
      >
        <to-approve
          v-bind="edits"
          @closeModals="closeModals"
          @refreshPage="getTableData"
        />
      </Modal>
      <!-- 已审批弹窗 -->
      <Modal
        v-model="isShowInfoModal"
        class="is-approve-modal"
        :title="modalTitle"
        width="800"
        :footer-hide="true"
        :transfer="false"
      >
        <is-approved v-bind="infos" />
      </Modal>
    </div>
  </div>
</template>

<script>
// ? components
import LeaveQueryMenu from './components/LeaveQueryMenu';
import ShowTable from 'HomePage/GardenApprove/ApproveTable';
import BottomAccount from '@common/bottom-account';

import ToApprove from './components/approve-modal/ToApprove';
import isApproved from './components/approve-modal/isApproved';
// ? request
import { getChildrenLeaveInfo } from '@/request/garden-approve/5-children-ask-leave';
// ? utils
import { getDataSource, checkDataSource, handleErrorCode } from '@/utils';
// ? import mixins
import getTableMix from './components/getCALTableMix';

export default {
  name: 'ChildrenAskLeave',
  components: {
    LeaveQueryMenu,
    ShowTable,
    BottomAccount,
    // ? modal
    ToApprove,
    isApproved
  },
  mixins: [getTableMix],
  data: () => ({
    approveStatus: [
      {
        tag: '待审批',
        type: 'error'
      },
      {
        tag: '已审批',
        type: 'default'
      }
    ],
    statusIdx: 0,
    // ?? modal-data
    modalTitle: '',
    isShowEditModal: false,
    edits: {},
    isShowInfoModal: false,
    infos: {}
  }),
  methods: {
    // ? menu functions
    getTableByStatus(params) {
      this.statusIdx = params.isRemarked;
      this.getTableData(params);
    },
    getTableByClick(params) {
      this.getTableData(params);
    },
    // ? table-functions
    handleSelect(itemIdx, currentTag) {
      switch (currentTag) {
        // ? 处理待审批弹窗
        case '审批请假':
          this.openEditModal(itemIdx);
          break;
        // ? 处理已审批弹窗
        case '审批结果':
          this.openInfoModal(itemIdx);
          break;
      }
    },
    async openEditModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getChildrenLeaveInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = JSON.parse(JSON.stringify(dataSource));
        this.edits = {
          id,
          icon: data.icon,
          infantName: data.infant_name,
          className: data.class_name,
          startTime: data.start_time,
          endTime: data.end_time,
          leaveType: data.leave_type,
          content: data.content,
          createTime: data.create_time,
          remarkStatus: data.status
        };
        this.modalTitle = '审批请假';
        this.isShowEditModal = true;
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    async openInfoModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getChildrenLeaveInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = JSON.parse(JSON.stringify(dataSource));
        this.infos = {
          id,
          icon: data.icon,
          infantName: data.infant_name,
          className: data.class_name,
          startTime: data.start_time,
          endTime: data.end_time,
          leaveType: data.leave_type,
          content: data.content,
          createTime: data.create_time,
          remarkStatus: data.remark_status,
          name: data.name,
          status: data.status,
          remark: data.remark
        };
        this.modalTitle = '审批结果';
        this.isShowInfoModal = true;
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    closeModals() {
      this.isShowEditModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.children-ask-leave {
  .table-content {
    .flex-center;
  }
  .divide-page {
    .flex-center;
  }
}
</style>
