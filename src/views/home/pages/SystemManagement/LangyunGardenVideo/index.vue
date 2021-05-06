<template>
  <div class="garden-video">
    <video-wrapper v-bind="wrappers" />
    <video-menu @handleSearch="handleSearch" @addListItem="addListItem" />
    <video-content
      :propItem="contents"
      @addToList="itemAddToList"
      @deleteItem="deleteItem"
      @selectItemChange="selectItemChange"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <!-- :style="
        viewHeight < 560
          ? {
              position: 'fixed',
              bottom: '-0.2rem',
              left: '12.5%',
              'z-index': 999
            }
          : {}
      " -->
    <!-- add-to-list-modal -->
    <Modal
      v-model="isShowAddModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-to-list
        :vid="itemInfo.vid || 0"
        :propItem="itemInfo"
        @handleCancel="handleCancel"
        @refreshPage="getContentData"
      />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add-to-list
        :vid="itemInfo.vid || 0"
        :propItem="itemInfo"
        @handleCancel="handleCancel"
        @refreshPage="getContentData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import VideoWrapper from './components/video-wrapper';
import VideoMenu from './components/video-menu';
import VideoContent from './components/video-content';
import DivPage from '@common/bottom-account';

import AddToList from './components/add-to-list';
// ? request
import {
  getVideoList,
  getEditVideoInfo,
  deleteVideoInfo
} from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'GardenVideo',
  components: {
    VideoWrapper,
    VideoMenu,
    VideoContent,
    DivPage,
    AddToList
  },
  data: () => ({
    // ? wrappers
    wrappers: {},
    // ? menus
    // ? contents
    contents: [],
    viewHeight: document.documentElement.clientHeight,
    page: 0,
    pageSize: 5,
    total: 0,
    totalPage: 0,
    // ? modals
    modalTitle: '',
    // ?? add-a-lot
    isShowEditModal: false,
    // currentGardenCards: [],
    // currentClassCards: [],
    itemInfo: {},
    selectItems: [],
    // ?? add-item
    isShowAddModal: false
  }),
  methods: {
    // ? wrappers
    // ? menus
    handleSearch(title) {
      const params = {
        title,
        pageSize: this.pageSize
      };
      this.getContentData(params);
    },
    addListItem() {
      if (this.selectItems.length === 0) {
        this.$Message.warning('请先选择视频');
        return;
      }
      this.itemInfo = {
        vid: this.selectItems.map(item => item.id).toString(),
        checkedClasses: [],
        checkedGardenBoards: []
      };
      this.modalTitle = '添加至播放列表';
      this.isShowAddModal = true;
    },
    // ? contents
    async getContentData(params = { pageSize: this.pageSize }) {
      const result = await getVideoList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { usedSpace, allSpace, data } = deepCopyObj(dataSource);
        this.wrappers = {
          usedSpace,
          allSpace
        };
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.contents = [];
        data.list && data.list.length && this.setContent(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setContent(list = []) {
      // console.log(list);
      list.forEach((item, index) => {
        this.contents.push({
          number: index + 1,
          id: item.id || 0,
          uid: item.uid || 0,
          source: item.source || '',
          sourceId: item.source_id || 0,
          status: item.status || 0,
          videoName: item.videoName || '',
          className: item.className || '',
          thumbnails: item.thumbnails,
          type: item.type || '',
          size: item.size || '',
          duration: item.duration || '',
          time: item.create_time || '',
          isChecked: false
        });
      });
    },
    async itemAddToList(itemIdx) {
      this.$Message.info(`添加第${itemIdx + 1}项到播放列表`);
      const { id } = this.contents[itemIdx];
      const result = await getEditVideoInfo({ vid: id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const {
          checkedClasses,
          checkedGardenBoards,
          isExceedPackage,
          vid
        } = deepCopyObj(dataSource);
        this.itemInfo = {
          vid,
          checkedClasses,
          checkedGardenBoards,
          isExceedPackage
        };
        this.modalTitle = '添加至播放列表';
        this.isShowEditModal = true;
      }
    },
    async deleteItem(vid) {
      console.log(vid);
      const result = await deleteVideoInfo({ vid });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    selectItemChange(selectItems) {
      this.selectItems = selectItems;
    },
    getContentByPage(params) {
      this.getContentData(params);
    },
    // ? modal-functions
    handleCancel() {
      this.isShowEditModal = false;
      this.isShowAddModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getContentData();
  }
};
</script>

<style lang="less" scoped>
.garden-video {
  color: #666;
  height: 100vh;
}
</style>
