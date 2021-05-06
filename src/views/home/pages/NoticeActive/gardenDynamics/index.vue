<template>
  <div class="garden-active">
    <simple-menu
      @handleSearch="handleSearch"
      @handleDelete="handleDelete"
      @handleCreate="handleAddModal"
    />
    <Divider :dashed="true" />
    <!--  -->
    <Spin fix v-show="isLoading">加载中...</Spin>
    <garden-active-content
      :commonList="dataList"
      @getSelectItems="getSelectItems"
      @delItem="delItem"
      @setTop="setItemTop"
      @editItem="openEdit"
      @openInfo="openInfo"
      @releaseItem="releaseItem"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <base-footer />
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-content @closeModals="closeModals" @refreshPage="getContent" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-content
        v-bind="edits"
        @closeModals="closeModals"
        @refreshPage="getContent"
      />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info-content v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import SimpleMenu from './components/SimpleMenu';
import GardenActiveContent from './components/GardenActiveContent';
import AddContent from './components/AddContent';
import InfoContent from './components/InfoContent';
import BottomAccount from '@common/bottom-account';

import BaseFooter from '@common/base-footer';

// ? request
import {
  getGAList,
  deleteGA,
  setTop,
  // getGAEdits,
  getGADetail,
  putGA
} from '@/request/notice-active';
// ? utils
import {
  // * request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // * time
  transformTimeStamp,
  // * arr / arr
  deepCopyObj
} from '@/utils';
import { handleUserOp, getOperationsByStatus } from '../common';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'GardenActive',
  components: {
    SimpleMenu,
    GardenActiveContent,
    AddContent,
    InfoContent,
    BottomAccount,
    BaseFooter
  },

  data: () => ({
    topList: [],
    dataList: [],
    selectItems: [],
    page: 0,
    pageSize: 10,
    total: 0,
    totalPage: 0,
    isLoading: false,
    // ? modal-functions
    modalTitle: '',
    // ??  add-modal
    isShowAddModal: false,
    // ??  edit-modal
    isShowEditModal: false,
    edits: {},
    // ??  info-modal
    isShowInfoModal: false,
    infos: {}
  }),
  computed: {
    ...mapState(['avatar', 'userName'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContent(params);
    },
    handleDelete() {
      if (this.selectItems.length === 0) {
        this.$Message.warning('请选择要删除的内容');
        return;
      } else {
        this.$Modal.confirm({
          title: '删除',
          content: '是否删除?删除后数据无法恢复, 请谨慎操作!',
          onOk: () => {
            const ids = this.selectItems.map(item => item.id).toString();
            this.confirmDelete(ids);
          }
        });
      }
    },
    async confirmDelete(ids) {
      const result = await deleteGA({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContent();
      } else this.$Message.error(`操作失败, 原因: ${result.code}`);
    },
    // ? content
    async getContent(params = { pageSize: this.pageSize }) {
      const result = await getGAList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource).data || deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        if (data.list) {
          this.getDataList(data.list);
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    getDataList(list = []) {
      if (list.length > 0) {
        this.dataList = [];
        list.map((item, index) => {
          this.dataList.push({
            number: index + 1,
            id: item.id,
            pId: item.pid || 0,
            avatar: this.avatar,
            author: item.sender_name || this.userName,
            content: item.content,
            time: transformTimeStamp(item.createTime),
            isTop: item.is_top === 0 ? '未置顶' : '已置顶',
            title: item.title,
            summary: item.summary,
            recipientIds: item.recipientIds,
            thumbnails: item.thumbnails || '',
            iconUrl: item.icon_url || '',
            type: '园所动态',
            color: 'pink',
            userOperations: handleUserOp(item.is_top, item.status),
            itemOperations: getOperationsByStatus(item.status)
          });
        });
      }
    },
    getContentByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size
      };
      this.getContent(params);
    },
    getSelectItems(selectItems) {
      this.selectItems = selectItems;
    },
    delItem(itemIdx) {
      const ids = this.dataList[itemIdx].id;
      this.confirmDelete(ids);
    },
    setItemTop(itemIdx, isTop) {
      this.$Modal.confirm({
        title: isTop === 1 ? '设置置顶' : '取消置顶',
        content: '确认操作?',
        onOk: async () => {
          const { id } = this.dataList[itemIdx];
          const params = {
            id,
            isTop
          };
          const result = await setTop(params);
          if (handleOpResult(result)) {
            this.$Message.success('操作成功');
            this.getContent();
          } else
            this.$Message.error(
              `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
            );
        }
      });
    },
    async openEdit(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getGADetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { noticeInfo } = dataSource;
        this.edits = {
          id,
          editTitle: noticeInfo.title || '',
          editIntroduce: this.dataList[itemIdx].summary,
          editInputContent: noticeInfo.content || '',
          isSetTop: this.dataList[itemIdx] === '已置顶' ? '是' : '否',
          editImg: {
            src: this.dataList[itemIdx].iconUrl,
            pId:
              this.dataList[itemIdx].pId ||
              Math.floor(Math.random() * 1000).toFixed(0) * 1000
          }
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    async openInfo(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getGADetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { noticeInfo } = dataSource;
        this.infos = {
          infoTitle: noticeInfo.title,
          infoContent: noticeInfo.content,
          infoTime: noticeInfo.time,
          infoAvatar: noticeInfo.avatar || this.avatar,
          infoAuthor: noticeInfo.author || this.userName
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async releaseItem(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await putGA({ id });
      if (handleOpResult(result)) {
        this.$Message.success('发布成功');
        this.getContent();
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    // ? modal
    handleAddModal() {
      this.modalTitle = '创建草稿';
      this.isShowAddModal = true;
    },
    showInfoModal() {
      this.modalTitle = '详情';
      this.isShowInfoModal = true;
    },
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getContent();
  }
};
</script>
