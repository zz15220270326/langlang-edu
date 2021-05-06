<template>
  <div class="preview-video">
    <div class="video-wrapper">
      <video
        id="gardenVideo"
        class="video-js vjs-default-skin imgs"
        :poster="poster"
        :preload="preload"
        muted
        autoplay
        loop
      >
        <!-- :width="width"
      :height="height" -->
        <!-- v-show="url.length" -->
        <!-- <source :src="url" type="application/x-mpegURL" /> -->
      </video>
    </div>
    <div class="btn-group">
      <Button
        v-for="(btn, btnIdx) of btnGroup"
        v-mode="{ btnGroup }"
        :index="btnIdx"
        :key="btn.tag"
        :type="btn.type"
        @click.native="handleSwitchVideo(btnIdx)"
      >
        {{ btn.tag }}
      </Button>
    </div>
  </div>
</template>

<script>
/**
 * @description
 * * 引入m3u8视频控件
 */
import 'video.js/dist/video-js.css';
import Video from 'video.js';

import mode from './mode';

export default {
  name: 'PlayM3u8',
  directives: { mode },
  data: () => ({
    singlePlayer: null,
    crtIdx: 0,
    btnGroup: [
      {
        tag: '流畅',
        type: 'primary'
      },
      {
        tag: '标清',
        type: 'default'
      },
      {
        tag: '高清',
        type: 'default'
      }
    ]
  }),
  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    poster: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: '800'
    },
    height: {
      type: [Number, String],
      default: '450'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    preload: {
      type: String,
      default: 'auto'
    }
  },
  watch: {
    urlList(newVal) {
      newVal.length && this.initVideo();
    }
  },
  computed: {
    url() {
      return this.urlList[this.crtIdx].hlsUrl;
    }
  },
  methods: {
    initVideo() {
      this.singlePlayer = null;
      const singlePlayer = Video('gardenVideo', {
        width: 800,
        height: 425,
        muted: false,
        autoplay: this.autoplay,
        controls: this.controls,
      });
      this.singlePlayer = singlePlayer;
      this.playVideo();
    },
    playVideo() {
      this.singlePlayer.src({
        src: this.url,
        // src: 'http://ivi.bupt.edu.cn/hls/cctv10.m3u8',
        type: 'application/x-mpegURL'
      });
      console.log(this.singlePlayer);
      this.singlePlayer.play();
    },
    handleSwitchVideo(crtIdx) {
      this.crtIdx = crtIdx;
      this.initVideo();
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  // mounted() {
  //   this.$nextTick(() => {
  //     this.url.length && this.initVideo();
  //   });
  // },
  // activated() {
  //   this.initVideo();
  // },
  beforeDestroy() {
    this.singlePlayer = null;
  }
};
</script>

<style lang="less" scoped>
.preview-video {
  width: 100%;
  height: 30rem;
  position: relative;
  .video-wrapper {
    video {
      position: absolute;
      background: #fff;
      overflow-y: hidden;
    }
  }
  .btn-group {
    width: 100%;
    text-align: center;
    .ivu-btn {
      width: 5.4rem;
      margin: 0.4rem 0.6rem;
    }
  }
}
</style>
