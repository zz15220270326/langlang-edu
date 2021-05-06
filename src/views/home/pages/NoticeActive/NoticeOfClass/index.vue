<template>
  <div class="class-notice">
    <Spin fix v-show="isLoading">加载中...</Spin>
    <class-notice-menu
      @handleSearch="handleSearch"
      @handleDelete="handleDelete"
      @handleAddModal="handleAddModal"
    />
    <notice-content
      :dataList="dataList"
      @getSelectItems="getSelectItems"
      @handleOperation="handleOperation"
      @deleteItem="deleteItem"
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
      <add-notice
        :isRenderClass="true"
        @handleAdd="handleAdd"
        @closeModals="closeModals"
      />
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
import ClassNoticeMenu from './components/ClassNoticeMenu';
import NoticeContent from 'HomePage/NoticeActive/NoticeContent';
import BottomAccount from '@common/bottom-account';
import BaseFooter from '@common/base-footer';

import AddNotice from 'HomePage/NoticeActive/AddNotice';
import InfoNotice from 'HomePage/NoticeActive/InfoNotice';

// ? request
import {
  getClassNoticeList,
  addClassNotice,
  getClassNoticeDetail,
  publicClassNotice,
  deleteClassNotice
} from '@/request/notice-active';
// ? utils
import {
  // ? time
  transformTimeStamp,
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { handleNoticeStatus } from '../common';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'ClassNotice',
  components: {
    ClassNoticeMenu,
    NoticeContent,
    BottomAccount,
    BaseFooter,

    AddNotice,
    InfoNotice
  },
  data: () => ({
    // ? content
    selectItems: [],
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    isLoading: false,
    // ? modal
    modalTitle: '',

    isShowAddModal: false,
    addInputTitle: '',
    addInputContent: '',
    addImgList: [],

    isShowInfoModal: false,
    infoItem: {}
  }),
  computed: {
    ...mapState([
      'userName',
      'avatar',
      'uid',
      'defaultYear',
      'defaultMonth',
      'defaultDay'
    ])
  },
  methods: {
    // ?? menu-functions
    handleSearch(params) {
      this.getList(params);
    },
    handleDelete() {
      if (this.selectItems.length === 0) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.selectItems.map(item => item.id).toString();
          this.confirmDelete(ids);
        }
      });
    },
    async confirmDelete(ids) {
      this.isLoading = true;
      const result = await deleteClassNotice({ ids });
      if (handleOpResult(result)) {
        this.$Modal.success({
          title: '删除成功'
        });
        this.getList();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.isLoading = false;
    },
    handleAddModal() {
      this.modalTitle = '创建通知草稿';
      this.isShowAddModal = true;
    },

    getSelectItems(selectItems) {
      this.selectItems = selectItems;
    },
    handleOperation(btnIndex, itemIdx) {
      switch (btnIndex) {
        case 0:
          this.openInfoModal(itemIdx);
          break;
        case 1:
          this.handlePublic(itemIdx);
          break;
      }
    },
    handlePublic(itemIdx) {
      const { id } = this.dataList[itemIdx];
      this.$Modal.confirm({
        title: '发布',
        content: '确认操作?',
        onOk: async () => {
          const result = await publicClassNotice({ id });
          if (handleOpResult(result)) {
            this.$Message.success('发布成功');
            this.getList();
          } else
            this.$Message.error(
              `发布失败, 原因: ${result.msg || handleErrorCode(result.code)}`
            );
        }
      });
    },
    deleteItem(itemIdx) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认操作? 删除后数据无法恢复, 请谨慎操作',
        onOk: () => {
          const ids = this.dataList[itemIdx].id;
          this.confirmDelete(ids);
        }
      });
    },
    async getList(params = { pageSize: this.pageSize }) {
      const result = await getClassNoticeList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource).data || deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        if (data.list) {
          this.setDataList(data.list);
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    setDataList(list = []) {
      // console.log(list)
      this.dataList = [];
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          title: item.title,
          content: item.content,
          charger: item.sender_name || this.identify,
          avatar: item.icon_url || this.avatar,
          type: '班级通知',
          color: 'blue',
          time: transformTimeStamp(item.createTime),
          operations: handleNoticeStatus(item.status)
        });
      });
    },
    getListByPage(params) {
      const _params = {
        page: params.page,
        pageSize: params.page_size
      };
      this.getList(_params);
    },
    // ?? modal
    async handleAdd(params) {
      const result = await addClassNotice(params);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.getList();
      } else
        this.$Message.error(
          `添加失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.closeModals();
    },
    async openInfoModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getClassNoticeDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { urlInfo } = dataSource;
        this.infoItem = this.dataList.find(item => item.id === id);
        this.infoItem.urlInfo = urlInfo || [];
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.class-notice {
  color: #666;
  .ivu-divider {
    background-color: skyblue;
  }
}
</style>
