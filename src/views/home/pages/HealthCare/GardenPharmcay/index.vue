<template>
  <div class="drug-records">
    <d-r-menu
      @handleSearchItems="handleSearchItems"
      @handleDeleteItems="handleDeleteItems"
      @handleExport="handleExport"
    />
    <h-c-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
      @getTable="getTable"
      @handleTableItem="handleTableItem"
    />
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      :page="page"
      :pageSize="pageSize"
    />
    <!-- modal-content -->
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowUseDrugModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <use-drug
        v-bind="useDrugs"
        @closeModals="closeModals"
        @refreshPage="getTableData"
      />
    </Modal>
    <Modal
      v-model="isShowRecordModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <record v-bind="records" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import BottomAccount from '@common/bottom-account';

import DRMenu from './components/DRMenu';
import HCTable from '../HCTable';

import Info from './components/modal/Info';
import UseDrug from './components/modal/UseDrug';
import Record from './components/modal/Record';

// ? request (info drug record)
import {
  getRecordList,
  getRecords,
  deleteRecords
} from '@/request/health-care';

// ? import utils
import {
  // ? 处理请求
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? 处理时间
  dateToMs,
  transformTimeStamp
} from '@/utils';
import { titleList } from './myUtils';

export default {
  name: 'DrugRecords',
  components: {
    BottomAccount,

    DRMenu,
    HCTable,

    Info,
    UseDrug,
    Record
  },
  data: () => ({
    // ? menu-data
    exportName: '',
    // ? table-data
    titleList: JSON.parse(JSON.stringify(titleList)),
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    selectItem: [],
    thisTable: {},
    // ? modal-data
    modalTitle: '',
    isShowInfoModal: false,
    infos: {},
    isShowUseDrugModal: false,
    useDrugs: {},
    isShowRecordModal: false,
    records: {}
  }),
  methods: {
    // ? menu-functions
    handleSearchItems(params) {
      this.getTableData(params);
    },
    handleDeleteItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除? 删除后数据无法恢复',
        onOk: () => this.confirmDelete(),
        onCancel: () => this.$Message.info('您取消了本次操作')
      });
    },
    async confirmDelete() {
      const id = this.selectItem.map(item => item.id).toString();
      const result = await deleteRecords({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else this.$Message.error('删除失败, 请稍后重试');
    },
    handleExport() {
      const that = this;
      if (this.thisTable !== {}) {
        this.$Modal.confirm({
          title: '导出表格',
          render: createElement => {
            return createElement('Input', {
              props: {
                placeholder: '请输入导出表格的名称: 格式为".csv"(Excel格式)'
              },
              on: {
                input: val => (that.exportName = val)
              }
            });
          },
          onOk: () => {
            const { exportName } = that;
            if (exportName !== '') {
              this.thisTable.exportCsv({
                filename: exportName
              });
            } else this.$Message.warning('导出的表格名称不得为空');
          }
        });
      }
    },
    // ? table-functions
    getTable(table) {
      this.thisTable = table;
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    handleTableItem(itemIdx, btnIdx) {
      switch (btnIdx) {
        case 0:
          this.getInfoById(itemIdx);
          break;
        case 1:
          this.handleUseDrugs(itemIdx);
          break;
        case 2:
          // ? 记录
          this.getRecordById(itemIdx);
          break;
      }
    },
    handleUseDrugs(itemIdx = -1) {
      const { id } = this.dataList[itemIdx];
      // ? 服药
      this.useDrugs = {
        drugTime: transformTimeStamp(dateToMs(new Date()) / 1000),
        id
      };
      this.modalTitle = '服药';
      this.isShowUseDrugModal = true;
    },
    getInfoById(itemIdx) {
      const {
        infantName,
        malady,
        drugName,
        dosage,
        useTime,
        drugCircle,
        comment,
        createTime
      } = this.dataList[itemIdx];
      this.infos = {
        infantName,
        malady,
        drugName,
        dosage,
        useTime,
        drugCircle,
        comment,
        createTime
      };
      this.modalTitle = '详情';
      this.isShowInfoModal = true;
    },
    async getRecordById(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getRecords({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const dataList = [];
        dataSource.map(item => {
          dataList.push({
            createTime: transformTimeStamp(item.CreateTime),
            realname: item.realname,
            comment: item.Comment
          });
        });
        this.records = { dataList };
        this.modalTitle = '记录';
        this.isShowRecordModal = true;
      }
    },
    // ? table-functions
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getRecordList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page | 0;
        this.total = info.total | 0;
        this.totalPage = info.total_page | 0;
        if (info.list) {
          const { list } = info;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              id: item.id,
              infantId: item.InfantId,
              status: item.status,
              comment: item.Comment,
              createTime: transformTimeStamp(item.CreateTime),
              number: index + 1,
              infantName: item.nickname,
              malady: item.Malady,
              drugName: item.Instruction,
              dosage: item.Dosage,
              useTime: item.UseTime,
              drugCircle: `${item.UseDay}天`,
              operations: [
                {
                  tag: '详情',
                  type: 'info'
                },
                {
                  tag: '服药',
                  type: 'warning'
                },
                {
                  tag: '记录',
                  type: 'error'
                }
              ]
            });
          });
        }
      } else this.$Message.error('请求数据失败, 请稍后重试');
    },
    // ? modal-functions
    closeModals() {
      this.isShowInfoModal = false;
      this.isShowUseDrugModal = false;
      this.isShowRecordModal = false;
    }
  },
  /**
   * ! life-hooks
   */
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped></style>
