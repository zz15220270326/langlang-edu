<template>
  <div class="accidents">
    <accidents-menu
      @handleSearch="handleSearch"
      @handleDelete="handleDelete"
      @handleAdd="handleAdd"
    />
    <h-c-table
      border
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
      @handleTableItem="handleTableItem"
    />
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      :page="page"
      :pageSize="pageSize"
      @changeTableData="changeTableData"
    />
    <!-- 添加弹窗 -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <add-situation @closeModals="closeModals" @refreshPage="getTableData" />
    </Modal>
    <!-- 详情弹窗 -->
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <!-- 编辑弹窗 -->
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <add-situation
        :id="edits.id"
        :propItem="edits"
        @closeModals="closeModals"
        @refreshPage="getTableData"
      />
    </Modal>
  </div>
</template>

<script>
// ? components
import BottomAccount from '@common/bottom-account';

import HCTable from '../HCTable';
import AccidentsMenu from './components/outburst-menu';
import AddSituation from './components/outburst-modal/add';
import Info from './components/outburst-modal/info';

// ? import request
import {
  getOutBurstList,
  getOutBurstDetail,
  deleteOutBurst
} from '@/request/health-care';
// ? import utils
import { getDataSource, checkDataSource, handleOpResult } from '@/utils';
import { titleList } from './myUtils';

export default {
  name: 'Accidents',
  components: {
    BottomAccount,
    HCTable,

    AccidentsMenu,
    AddSituation,
    Info
  },
  data: () => ({
    // ? table-data
    titleList,
    dataList: [],
    tableIsLoading: false,
    selectItem: [],
    total: 0,
    totalPage: 0,
    page: 0,
    pageSize: 20,
    // ? modal-data
    modalTitle: '',
    // ?? add modal-data
    isShowAddModal: false,
    adds: {},
    // ?? info-modal-data
    isShowInfoModal: false,
    infos: {},
    // ?? edit-modal-data
    isShowEditModal: false,
    edits: {}
  }),
  methods: {
    // ? menu-functions
    handleSearch(params) {
      this.getTableData(params);
    },
    handleDelete() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除? 删除后数据无法恢复',
        onOk: async () => {
          const id = this.selectItem.map(item => item.id).toString();
          const result = await deleteOutBurst({ id });
          if (handleOpResult(result)) {
            this.$Message.success('删除成功');
            this.getTableData();
          } else this.$Message.error('删除失败, 请稍后重试');
        },
        onCancel: () => this.$Message.info('您取消了本次的删除操作')
      });
    },
    handleAdd() {
      this.$Message.info('打开添加弹窗');
      this.modalTitle = '添加';
      this.isShowAddModal = true;
    },
    // ? table-functions
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getOutBurstList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.list) {
          const { list } = info;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              id: item.id,
              number: index + 1,
              nickname: item.nickname,
              className: item.ClassName,
              outBurstName: item.OutBurstName,
              outBurstScene: item.OutBurstScene,
              outBurstContent: item.OutBurstContent,
              realname: item.realname,
              outBurstTime: item.OutBurstTime,
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
                }
              ]
            });
          });
        }
      } else this.$Message.error('请求数据失败, 请稍后重试');
    },
    handleTableItem(itemIndex, buttonIndex) {
      switch (buttonIndex) {
        case 0:
          this.openInfoModal(itemIndex);
          break;
        case 1:
          this.openEditModal(itemIndex);
          break;
        case 2:
          // ? 删除
          this.deleteItem(itemIndex);
          break;
      }
    },
    // ? modal-functions
    async openInfoModal(itemIdx) {
      const {
        id,
        className,
        nickname,
        outBurstScene,
        realname
      } = this.dataList[itemIdx];
      const result = await getOutBurstDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = JSON.parse(JSON.stringify(dataSource));
        this.infos = {
          className,
          nickname,
          outBurstName: data.OutBurstName || '',
          outBurstScene,
          outBurstContent: data.OutBurstContent || '',
          realname,
          pictures: data.pictures || []
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async openEditModal(itemIdx) {
      const { id, className, nickname, realname } = this.dataList[itemIdx];
      const result = await getOutBurstDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.edits = {
          id,
          ...info,
          className,
          nickname,
          realname
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      } else this.$Message.error('请求失败, 请稍后重试');
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    deleteItem(itemIndex) {
      const { id } = this.dataList[itemIndex];
      this.$Modal.confirm({
        title: '删除内容',
        content: '确认删除? 删除后数据无法恢复!',
        onOk: async () => {
          const result = await deleteOutBurst({ id });
          if (handleOpResult(result)) {
            this.$Message.success('删除成功');
            this.getTableData();
          } else this.$Message.error('操作失败, 请稍后重试');
        },
        onCancel: () => {}
      });
    },
    changeTableData(params) {
      this.getTableData(params);
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped></style>
