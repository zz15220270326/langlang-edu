<template>
  <div class="garden-notice">
    <Spin fix v-show="isLoading">加载中...</Spin>
    <garden-notice-menu
      @handleSearch="handleSearch"
      @handleDeleteItems="handleDeleteItems"
      @openAddModal="openAddModal"
    />
    <notice-content
      :dataList="list"
      @getSelectItems="getSelectItems"
      @deleteItem="deleteItem"
      @handleOperation="handleOperation"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getListByPage"
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
      <add-notice @handleAdd="handleAdd" @closeModals="closeModals" />
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
import './components/index.less';
// ? components
import GardenNoticeMenu from './components/GardenNoticeMenu';
import NoticeContent from 'HomePage/NoticeActive/NoticeContent';
import AddNotice from 'HomePage/NoticeActive/AddNotice';
import InfoNotice from 'HomePage/NoticeActive/InfoNotice';

import BottomAccount from '@common/bottom-account';
import BaseFooter from '@common/base-footer';

// ? request
import {
  getGNList,
  deleteGNotice,
  addGardenNotice,
  getGardenDetail,
  releaseGNotice
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
  name: 'GardenNotice',
  components: {
    GardenNoticeMenu,
    NoticeContent,
    AddNotice,
    InfoNotice,

    BottomAccount,
    BaseFooter
  },
  data: () => ({
    // ? content
    list: [],
    selectItems: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    isLoading: false,
    // ? modal
    modalTitle: '',
    // ??add-modal
    isShowAddModal: false,
    // ?? info-modal
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
      'defaultDay'
    ])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContentData(params);
    },
    handleDeleteItems() {
      if (this.selectItems.length === 0) {
        this.$Message.warning('请选择要批量删除的内容');
        return;
      }
      const ids = this.selectItems.map(item => item.id).toString();
      this.$Modal.confirm({
        title: '删除',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => this.handleDelete(ids)
      });
    },
    async handleDelete(ids) {
      const result = await deleteGNotice({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else
        this.$Modal.error({
          title: '删除失败',
          content: `原因: ${result.msg || handleErrorCode(result.code)}`
        });
    },
    openAddModal() {
      this.modalTitle = '新建草稿';
      this.isShowAddModal = true;
    },
    // ? content
    async getContentData(params = { pageSize: this.pageSize }) {
      const result = await getGNList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource).data || deepCopyObj(dataSource);
        this.page = data.page;
        this.total = data.count;
        this.totalPage = data.pageCount;
        if (data.list) {
          this.getList(data.list);
        }
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    getList(list = []) {
      this.list = [];
      // console.log(list)
      list.map(item => {
        this.list.push({
          id: item.id,
          title: item.title,
          content: item.content,
          charger: item.sender_name || this.identify,
          avatar: item.icon_url || this.avatar,
          type: '园务通知',
          color: 'orange',
          time: transformTimeStamp(item.createTime),
          operations: handleNoticeStatus(item.status)
        });
      });
    },
    getListByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size
      };
      this.getContentData(params);
    },
    // ?? items-functions
    getSelectItems(selectItems) {
      this.selectItems = selectItems;
    },
    // ?? operate-item
    deleteItem(itemIdx) {
      this.$Modal.confirm({
        title: `删除第${itemIdx + 1}条内容`,
        content: '是否删除? 删除后数据无法恢复',
        onOk: () => this.handleDelete(this.list[itemIdx].id),
        onCancel: () => this.$Message.info('您取消了本次操作')
      });
    },
    handleOperation(btnIndex, itemIdx) {
      switch (btnIndex) {
        case 0:
          this.openInfoModal(itemIdx);
          break;
        case 1:
          this.handlePublish(itemIdx);
          break;
      }
    },
    async openInfoModal(itemIdx) {
      // ? 显示详情
      const { id } = this.list[itemIdx];
      const result = await getGardenDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { urlInfo } = dataSource;
        this.infoItem = this.list[itemIdx];
        this.infoItem.content = dataSource.noticeInfo.content;
        this.infoItem.urlInfo = urlInfo;
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async handleAdd(params) {
      const result = await addGardenNotice(params);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.getContentData();
      } else {
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      }
      this.closeModals();
    },
    handlePublish(itemIdx) {
      // ? (发布 ??)
      const { id } = this.list[itemIdx];
      this.$Modal.confirm({
        title: '发布内容',
        content: '确认操作',
        onOk: () => this.confirmPublish(id)
      });
    },
    async confirmPublish(id) {
      const result = await releaseGNotice({ id });
      if (handleOpResult(result)) {
        this.$Modal.success({
          title: '发布成功'
        });
        this.getContentData();
      } else {
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      }
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {
    this.getContentData();
  }
};
</script>
