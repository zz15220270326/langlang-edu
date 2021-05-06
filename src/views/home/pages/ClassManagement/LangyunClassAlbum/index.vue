<template>
  <div class="class-ablums">
    <Spin size="large" fix v-if="isLoading">
      加载中
    </Spin>
    <my-menu
      :isSelectAll="isSelectAll"
      @handleSearch="handleSearch"
      @confirmSelectAll="confirmSelectAll"
      @cancelSelectAll="cancelSelectAll"
      @handleDelete="deleteItems"
      @openAddModal="openAddModal"
      @openUploadModal="openUploadModal"
    />
    <my-content
      v-show="ablumItems.length"
      :ablumItems="ablumItems"
      @handleCheckbox="handleCheckbox"
      @showInfo="showInfo"
      @handleItemShow="handleItemShow"
      @handleItemLeave="handleItemLeave"
      @handleUploadItem="handleUploadItem"
      @handleEditItem="handleEditItem"
      @handleDeleteAlbum="handleDeleteAlbum"
    />
    <Card class="empty-show" v-show="!ablumItems.length">
      <p>
        暂无数据,
      </p>
      <p>
        敬请期待!
      </p>
      <Divider dashed />
    </Card>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- modal-content -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-content @closeModals="closeModals" @refreshPage="getAblumItems" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <add-content
        :id="edits.id"
        :propItem="edits"
        @closeModals="closeModals"
        @refreshPage="getAblumItems"
      />
    </Modal>
    <Modal
      v-model="isShowUploadModal"
      class-name="upload-modal"
      :title="uploadModalTitle"
      width="1080"
      :footer-hide="true"
    >
      <upload-content @closeModals="closeModals" @refreshPage="getAblumItems" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      title="相册详情"
      class-name="info-modal"
      width="1200"
      :footer-hide="true"
    >
      <info-content
        v-bind="infos"
        @handleItemInfo="handleItemInfo"
        @closeAndRefreshContent="closeAndRefreshContent"
      />
    </Modal>
    <!--  -->
  </div>
</template>

<script>
import './index.less';
// ? components
import MyMenu from './components/album-menu';
import MyContent from './components/album-content';

import AddContent from './components/add-content';
import UploadContent from './components/upload-content';
import InfoContent from './components/info-content';

import DivPage from '@common/bottom-account';

// ? request
import { getAlbumEdit, deleteAlbum } from '@/request/class-management';
// ? utils
import {
  // ? request
  handleOpResult,
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { checkSelectAll, checkCancelAll } from './function';
// ? configs
// ? import-mixins
import getAblumItemsMix from './getAlbumMix';
// ? eventBus
import caBus from './caBus';

export default {
  name: 'ClassAlbum',
  components: {
    MyMenu,
    MyContent,
    DivPage,

    AddContent,
    UploadContent,
    InfoContent
  },
  mixins: [getAblumItemsMix],
  data: () => ({
    // ? menu
    isSelectAll: false,
    // ? content
    selectItem: [],
    // ? modal
    modalTitle: '',
    // ?? add
    isShowAddModal: false,
    // ? edit
    isShowEditModal: false,
    edits: {},
    // ?? upload-modal
    uploadModalTitle: '',
    isShowUploadModal: false,
    uploadIndex: 0,
    // ?? info-modal
    isShowInfoModal: false,
    infos: {}
  }),
  props: {},
  computed: {},
  methods: {
    // ? menu
    handleSearch(params) {
      this.getAblumItems(params);
    },
    confirmSelectAll() {
      this.ablumItems.map(item => {
        item.isChecked = true;
      });
      this.isSelectAll = true;
      this.selectItem = this.ablumItems;
      this.$Message.info('全选成功');
    },
    cancelSelectAll() {
      this.ablumItems.map(item => {
        item.isChecked = false;
      });
      this.isSelectAll = false;
      this.selectItem = [];
      this.$Message.info('取消');
    },
    deleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择需要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '批量删除',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
        onOk: () => {
          const ids = this.selectItem.map(item => item.id).toString();
          // console.log(ids);
          this.confirmDeleteAlbum(ids);
        }
      });
    },
    async confirmDeleteAlbum(ids) {
      const result = await deleteAlbum({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.getAblumItems();
      } else this.$Message.error(`删除失败, 原因: ${result.code}`);
    },
    openAddModal() {
      this.modalTitle = '新建';
      this.isShowAddModal = true;
    },
    openUploadModal() {
      this.uploadModalTitle = '上传';
      this.isShowUploadModal = true;
    },
    // ? content
    getContentByPage(params) {
      this.getAblumItems(params);
    },
    // ? content-functions
    async showInfo({ id }) {
      const crtItem = this.ablumItems.find(item => item.id === id);
      this.infos = { id, ...crtItem };
      console.log(this.infos);
      this.isShowInfoModal = true;
    },
    handleItemInfo(index) {
      switch (index) {
        case 0:
          this.uploadModalTitle = '上传';
          this.isShowUploadModal = true;
          break;
        case 1:
          this.$Modal.confirm({
            title: '删除',
            content: '确认删除?删除后数据无法恢复',
            onOk: () => {
              setTimeout(() => {
                this.$Message.success('删除成功');
              }, 500);
            }
          });
          break;
      }
    },
    handleCheckbox(isChecked, index) {
      this.ablumItems[index].isChecked = isChecked;
      this.selectItem = this.ablumItems.filter(item => item.isChecked);
      if (checkSelectAll(this.ablumItems)) {
        this.isSelectAll = true;
        this.$Message.info('全部选中');
      }
      if (!checkSelectAll(this.ablumItems)) {
        this.isSelectAll = false;
      }
      if (checkCancelAll(this.ablumItems)) {
        this.isSelectAll = false;
      }
    },
    handleUploadItem(itemIdx) {
      this.uploadIndex = itemIdx;
      this.uploadModalTitle = '上传';
      this.isShowUploadModal = true;
    },
    async handleEditItem(itemIdx) {
      const { id } = this.ablumItems[itemIdx],
        result = await getAlbumEdit({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { album_info } = deepCopyObj(dataSource);
        this.edits = album_info;
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      }
    },
    handleDeleteAlbum(itemIdx) {
      this.$Modal.confirm({
        title: `删除第${itemIdx + 1}项`,
        content: '是否删除? 删除后数据无法恢复',
        onOk: () => {
          const { id } = this.ablumItems[itemIdx];
          this.confirmDeleteAlbum(id);
        }
      });
    },
    // ? modals
    closeModals() {
      this.isShowAddModal = false;
      this.isShowEditModal = false;
      this.isShowUploadModal = false;
      this.isShowInfoModal = false;
    },
    closeAndRefreshContent() {
      this.closeModals();
      this.getAblumItems();
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    caBus.$on('refreshGetAlbums', () => this.getAblumItems());
  },
  beforeDestroy() {
    caBus.$off('refreshGetAlbums');
  }
};
</script>
