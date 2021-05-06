<template>
  <div class="local-upload-video">
    <div class="main">
      <div class="video-wrapper" v-if="videos.length">
        <video-item
          v-for="video of videos"
          :key="video.vId"
          :video="video"
          @removeVideo="removeVideo"
        />
      </div>
      <Progress
        class="progress-bar"
        v-show="percent > 0"
        :percent="percent"
        :status="status"
        :text-inside="false"
      />
      <Upload
        class="upload-wrapper"
        :multiple="false"
        :action="url"
        :before-upload="getFile"
        :format="['.mp4']"
        :max-size="307200"
      >
        <Button type="primary" size="large" :disabled="!ableUpload">
          上传本地视频
        </Button>
      </Upload>
      <Tag color="warning" class="desc-tag"> 仅支持MP4格式，最大支持300M </Tag>
    </div>
    <upload-bar
      @handleAddToVideoList="handleAddToVideoList"
      @handleCancelOperation="handleCancelOperation"
    />
    <Modal
      title="本地上传视频"
      v-model="isShowAdd"
      width="850"
      :footer-hide="true"
    >
      <add-video @handleCancel="closeModal" @uploadToBoards="uploadToBoards" />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import uploadBar from './UploadBar';
import VideoItem from './VideoItem';
import AddVideo from '../../components/add-to-video';

// ? mixins
import videoMixins from '@/mixins/Common/videoMixins';

export default {
  name: 'LocalUploadVideo',
  components: {
    VideoItem,
    uploadBar,

    AddVideo
  },
  mixins: [videoMixins],
  data: () => ({
    isShowAdd: false
  }),
  props: {},
  computed: {},
  methods: {
    // ? confirm-upload
    removeVideo(vId) {
      this.videos = this.videos.filter((v) => v.vId !== vId);
      this.$Message.success('删除成功');
    },
    handleAddToVideoList() {
      if (!this.videos.length) {
        this.$Message.warning('请先从本地选择视频');
        return;
      }
      this.isShowAdd = true;
    },
    closeModal() {
      this.$Message.info('您关闭了本次回话');
      this.isShowAdd = false;
    },
    async uploadToBoards(info) {
      const vid = this.videos.map((item) => item.vId).toString(),
        params = Object.assign({}, info, { vid });
      console.log(params);
    },
    // ? cancel-operations
    handleCancelOperation() {
      this.$emit('handleCancelOperation');
    }
  }
};
</script>
