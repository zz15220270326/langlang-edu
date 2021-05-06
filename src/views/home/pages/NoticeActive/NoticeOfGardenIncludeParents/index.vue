<template>
  <div class="inside-notice">
    <Spin fix v-show="isLoading">加载中...</Spin>
    <my-menu
      @handleSearch="handleSearch"
      @handleDeleteItems="handleDeleteItems"
      @handleAddModal="handleAddModal"
    />
    <notice-content
      :dataList="dataList"
      @getSelectItems="getSelectItems"
      @deleteItem="deleteItem"
      @handleOperation="handleOperation"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <base-footer />
    <!-- modal-content -->
    <Modal
      class-name="add-modal"
      v-model="isShowAddModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-notice @closeModals="closeModals" @handleAdd="confirmAdd" />
    </Modal>
    <Modal
      class-name="info-modal"
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info-notice :infoItem="infoItem" />
    </Modal>
    <!--  -->
  </div>
</template>

<script>
// ? import components
import MyMenu from './components/InsideNoticeMenu';
import NoticeContent from 'HomePage/NoticeActive/NoticeContent';
import BottomAccount from '@common/bottom-account';
import BaseFooter from '@common/base-footer';

import AddNotice from 'HomePage/NoticeActive/AddNotice';
import InfoNotice from 'HomePage/NoticeActive/InfoNotice';

// ? request
import {
  getInsideInfo,
  addInsideInfo,
  getInsideDetail,
  announceInsideDetail,
  deleteInsideDetail
} from '@/request/notice-active';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? time
  transformTimeStamp,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { handleNoticeStatus } from '../common';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InsideNotice',
  components: {
    MyMenu,
    NoticeContent,
    BottomAccount,
    BaseFooter,

    AddNotice,
    InfoNotice
  },
  data: () => ({
    // ? menu
    // ? content
    isLoading: false,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    selectItems: [],
    // ? modal
    modalTitle: '',
    isShowAddModal: false,

    isShowInfoModal: false,
    infoItem: {}
  }),
  computed: {
    ...mapState([
      'identify',
      'avatar',
      'uid',
      'defaultYear',
      'defaultMonth',
      'thisDay'
    ])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getTableData(params);
    },
    async handleDeleteItems() {
      if (this.selectItems.length === 0) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      const ids = this.selectItems.map(item => item.id).toString();
      this.$Modal.confirm({
        title: '删除',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
        onOk: () => this.confirmDelete(ids),
        onCancel: () => this.$Message.info('您取消了本次操作')
      });
    },
    deleteItem(itemIdx) {
      const ids = this.dataList[itemIdx].id;
      this.confirmDelete(ids);
    },
    async confirmDelete(ids) {
      const result = await deleteInsideDetail({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(`操作失败, 原因: ${handleErrorCode(result.code)}`);
    },
    // ? content
    async getTableData(params = { pageSize: this.pageSize }) {
      const result = await getInsideInfo(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource).data || deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        data.list.length > 0 && this.getDataList(data.list);
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    getDataList(list) {
      // console.log(list)
      this.dataList = [];
      list.map(item => {
        this.dataList.push({
          id: item.id,
          title: item.title,
          content: item.content,
          charger: item.sender_name || this.identify,
          avatar: item.icon_url || this.avatar,
          type: '园内通知',
          color: 'green',
          time: transformTimeStamp(item.createTime),
          operations: handleNoticeStatus(item.status)
        });
      });
    },
    getTableByPage(p) {
      const params = {
        pageSize: p.page_size,
        page: p.page
      };
      this.getTableData(params);
    },
    getSelectItems(selectItems) {
      this.selectItems = selectItems;
    },
    handleOperation(btnIdx, itemIdx) {
      switch (btnIdx) {
        case 0:
          this.openInfoModal(itemIdx);
          break;
        case 1:
          this.handlePublicInfo(itemIdx);
          break;
      }
    },
    // ? modal
    handleAddModal() {
      this.modalTitle = '添加';
      this.isShowAddModal = true;
    },
    async confirmAdd(params) {
      const result = await addInsideInfo(params);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.getTableData();
      } else {
        this.$Message.error(`添加失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.closeModals();
    },
    async openInfoModal(itemIdx) {
      const { id } = this.dataList[itemIdx],
        result = await getInsideDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infoItem = this.dataList[itemIdx];
        this.infoItem.urlInfo = dataSource.urlInfo || [];
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async handlePublicInfo(itemIdx) {
      const { id } = this.dataList[itemIdx],
        result = await announceInsideDetail({ id });
      if (handleOpResult(result)) {
        this.$Message.success('发布成功');
        this.getTableData();
      } else this.$Message.error(`发布失败, 原因: ${result.msg}`);
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.inside-notice {
  width: 100%;
  color: #666;
}
</style>
