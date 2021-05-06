<template>
  <div class="wrapper">
    <querymenu>
      <div slot="first" class="progress">
        <div class="progress-content">
          <Progress
            v-show="allSpace > 0"
            status="active"
            :percent="(usedSpace / allSpace) * 100"
            :stroke-width="22"
          ></Progress>
          <!-- text-inside -->
        </div>
        <div class="desc">
          <Tag size="large" color="green"> 空间总容量:{{ allSpace }}G</Tag>
          <Tag size="large" color="orange">
            已使用:{{ usedSpace }}/{{ allSpace }}G
          </Tag>
        </div>
      </div>
      <div slot="second" class="operations">
        <Button
          size="large"
          v-for="(item, key) in operations"
          :key="key"
          :type="item.type"
          @click.native="handleOperations(key)"
        >
          <span>{{ item.tag }}</span>
          <Icon :type="item.icon" />
        </Button>
      </div>
    </querymenu>
    <Modal
      v-model="isShowGardenModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <garden-card-list />
    </Modal>
    <Modal
      v-model="isShowClassModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <class-card-list />
    </Modal>
    <Modal
      v-model="isShowUploadModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <upload-video
        @handleAddToVideoList="handleAddToVideoList"
        @handleCancelOperation="handleCancelOperation"
      />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? import components
// ?? common
import Querymenu from '@common/query-menu';
// ?? children (主要是弹窗页面)
import GardenCardList from './garden-card-list';
import ClassCardList from './class-card-list';
import UploadVideo from './upload-video';

export default {
  name: 'GardenVideoWrapper',
  components: {
    Querymenu,

    GardenCardList,
    ClassCardList,
    UploadVideo
  },
  data: () => ({
    // ? operation-data
    page: 0,
    pageSize: 5,
    total: 0,
    totalPage: 0,
    operations: [
      {
        tag: '园牌播放列表',
        type: 'primary',
        icon: 'ios-key-outline'
      },
      {
        tag: '班牌播放列表',
        type: 'info',
        icon: 'ios-people-outline'
      },
      {
        tag: '上传视频',
        type: 'success',
        icon: 'ios-cloud-upload'
      }
    ],
    // ? modal-data
    modalTitle: '',
    // ?? 班牌
    isShowClassModal: false,
    // ?? 园牌
    isShowGardenModal: false,
    // ?? 上传
    isShowUploadModal: false,
    // ?? 添加到列表
    isShowAddModal: false
  }),
  props: {
    allSpace: {
      type: Number,
      default: 2
    },
    usedSpace: {
      type: Number,
      default: 0.33432
    }
  },
  computed: {},
  methods: {
    // ? contents
    handleOperations(btnIndex) {
      switch (btnIndex) {
        case 0:
          // ? 园牌
          this.openGardenModal();
          break;
        case 1:
          // ? 班牌
          this.openClassModal();
          break;
        // ? 上传
        case 2:
          this.openUploadModal();
          break;
      }
    },
    openGardenModal() {
      this.modalTitle = '园牌播放列表';
      this.isShowGardenModal = true;
    },
    openClassModal() {
      this.modalTitle = '班牌播放列表';
      this.isShowClassModal = true;
    },
    openUploadModal() {
      this.modalTitle = '上传视频';
      this.isShowUploadModal = true;
    },
    // ? add-to-video-list
    handleAddToVideoList(videos) {
      this.$Spin.show();
      setTimeout(() => {
        this.$Message.success(`上传视频 ${videos} 成功`);
        this.$Spin.hide();
        this.isShowUploadModal = false;
      }, 800);
    },
    // ? cancel-operations
    handleCancelOperation() {
      this.isShowUploadModal = false;
    }
  }
};
</script>
