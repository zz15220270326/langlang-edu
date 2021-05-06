<template>
  <Card class="video-item" :border="true">
    <p slot="title">视频名称: {{ video.name }}</p>
    <div class="content-wrapper">
      <div class="img-wrap">
        <img :src="video.src" alt="" />
        <span class="video-size"> 视频大小: {{ video.size }} </span>
      </div>
      <div class="btn-group">
        <Button type="info" @click.native="handlePlayVideo(video.url)">
          预览视频
        </Button>
        <Button type="warning" @click.native="handleRemoveVideo(video.vId)">
          取消上传的内容
        </Button>
      </div>
    </div>
    <Modal
      :title="`预览视频: ${video.name}`"
      v-model="isShowVideo"
      :footer-hide="true"
      width="800"
      @on-cancel="initVideoInfo"
    >
      <play-video v-bind="videoInfo" />
    </Modal>
  </Card>
</template>

<script>
import PlayVideo from '../../components/PlayVideo';

export default {
  name: 'VideoItem',
  components: {
    PlayVideo
  },
  data: () => ({
    videoInfo: {
      url: '',
      poster: '',
      autoplay: false,
      loop: false,
      muted: false
    },
    isShowVideo: false
  }),
  props: {
    video: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handlePlayVideo() {
      this.$Modal.confirm({
        title: '播放当前视频',
        content: '确认操作?',
        onOk: () => {
          const { url, src } = this.video;
          this.videoInfo = {
            url,
            poster: src,
            autoplay: true,
            muted: true,
            loop: false
          };
          this.isShowVideo = true;
        }
      });
    },
    handleRemoveVideo(vId) {
      this.$Modal.confirm({
        title: '取消上传该视频',
        content: '确认操作?',
        onOk: () => this.$emit('removeVideo', vId)
      });
    },
    initVideoInfo() {
      this.videoInfo = {
        url: '',
        poster: '',
        autoplay: false,
        loop: false,
        muted: false
      };
    }
  }
};
</script>

<style lang="less" scoped>
.video-item {
  width: 100%;
  height: 9.6rem;
  margin-bottom: 0.5rem;
  position: relative;
  // bottom: 8rem;
  padding: 0.8rem 0;
  .img-wrap {
    position: relative;
    img {
      width: 6rem;
      height: 4rem;
    }
    .video-size {
      position: absolute;
      bottom: 50%;
      left: 10%;
    }
  }
  .btn-group {
    position: absolute;
    right: 0.6rem;
    bottom: 20%;
    .ivu-btn {
      margin: 0 0.6rem;
    }
  }
}
</style>
