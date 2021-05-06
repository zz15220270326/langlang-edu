<template>
  <div class="base-upload-image">
    <my-menu
      :typeInfos="typeInfos"
      @handleSearch="handleSearch"
      @deleteItems="deleteItems"
    />
    <div class="content">
      <my-content
        :tableIsLoading="tableIsLoading"
        :titleList="videoColumns"
        :dataList="videoData"
        @getSelectItem="getSelectItem"
        @editItem="handlePreview"
      />
    </div>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      size="small"
      @changeTableData="getContentByPage"
    />
    <div class="upload-wrapper">
      <my-upload-bar
        :totalMemories="totalMemories"
        :usedMemories="usedMemories"
        @handleSaveVideo="openSaveModal"
        @handleCloseModals="handleCloseModals"
      />
    </div>
    <!-- Modal Content -->
    <!-- // ? 预览视频 -->
    <Modal
      v-model="isShowPreviewModal"
      :title="previewTitle"
      :footer-hide="true"
      width="850"
    >
      <upload-content v-bind="playerInfo" />
    </Modal>
    <!-- // ? 上传视频 -->
    <Modal
      v-model="isShowSaveModal"
      title="保存到视频列表"
      width="920"
      :footer-hide="true"
    >
      <add-video @uploadToBoards="uploadToBoards" @handleCancel="closeModals" />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import MyMenu from './UploadMenu';
import MyContent from 'HomePage/SystemManagement/SMTable';

import DivPage from '@common/bottom-account';

import MyUploadBar from './UploadBar';
import UploadContent from './PlayM3u8';

import AddVideo from '../../components/add-to-video';

// ? request
import {
  deleteVideoInfo,
  getVideoByContent
} from '@/request/system-management';
// ? utils
import {
  // ? request
  handleOpResult,
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? import mixins
import videoContentMix from '../../../videoContentMix';

export default {
  name: 'BaseUploadVideo',
  components: {
    // Querymenu,
    // SelectMenu,
    MyMenu,
    MyContent,
    DivPage,

    MyUploadBar,
    UploadContent,

    AddVideo
  },
  mixins: [videoContentMix],
  data: () => ({
    // ? menus
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    // ? table-data
    pageSize: 7,
    selectItem: [],
    // ? 表格数据
    // ? preview-video
    previewTitle: '',
    isShowPreviewModal: false,
    playerInfo: {},
    // ? 保存弹窗
    isShowSaveModal: false
  }),
  props: {},
  computed: {},
  methods: {
    // ? menus
    handleSearch(params) {
      this.getVideoInfo(params);
    },
    deleteItems() {
      if (!this.selectItem.length) {
        this.$Message.warning('请先选择需要删除的内容');
        return;
      } else {
        this.$Modal.confirm({
          title: '批量删除视频',
          content: '确认删除? 删除后数据无法恢复, 请谨慎操作!',
          onOk: () => {
            const vid = this.selectItem.map(item => item.id).toString();
            this.confirmDelete(vid);
          }
        });
      }
    },
    async confirmDelete(vid) {
      const result = await deleteVideoInfo({ vid });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getVideoInfo();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    // ? contents
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    async handlePreview(itemIndex, tag) {
      switch (tag) {
        case '点击播放':
          this.$Message.info(`预览第${itemIndex + 1}个视频`);
          this.setVideoContent(this.videoData[itemIndex].content);
          break;
      }
    },
    async setVideoContent(content = '') {
      const result = await getVideoByContent(content),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { cover, transcodedVideoList } = deepCopyObj(dataSource);
        // console.log(dataSource);
        this.playerInfo = {
          poster: cover || '',
          // ? 0: 高清; 1: 标准; 2: 流畅
          urlList: transcodedVideoList || []
        };
        this.previewTitle = `预览视频`;
        this.isShowPreviewModal = true;
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    openSaveModal() {
      if (!this.selectItem.length) {
        this.$Message.warning('您还未挑选要上传的视频');
        return false;
      }
      this.isShowSaveModal = true;
    },
    handleCloseModals() {
      this.isShowSaveModal = false;
      this.$emit('closeModals');
    },
    uploadToBoards(info) {
      const vid = this.selectItem.map(item => item.id).toString(),
        params = Object.assign({}, info, { vid });
      console.log(params);
    },
    closeModals() {
      this.isShowPreviewModal = false;
      this.isShowSaveModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    // ? this.getVideoInfo();
    this.getVideoInfo();
  }
};
</script>
