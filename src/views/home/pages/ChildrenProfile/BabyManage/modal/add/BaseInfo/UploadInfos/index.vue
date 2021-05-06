<template>
  <div class="upload">
    <Upload
      :action="url"
      :multiple="false"
      :format="['jpg', 'jpeg', 'png']"
      accept=".jpg, .jpeg, .png"
      :show-upload-list="false"
      :max-size="2048"
      :before-upload="getSingleFile"
      type="drag"
    >
      <div class="avatar-wrapper">
        <img v-if="img.src" :src="img.src" alt="" />
        <Icon v-else type="ios-contact" size="36"></Icon>
      </div>
      <Tag color="lime">点击或拖拽上传头像</Tag>
    </Upload>
    <Progress
      v-show="singleProgress > 0"
      :progress="singleProgress"
      :status="singleStatus"
      class="avatar-progress"
    />
  </div>
</template>

<script>
// ? mixins
import imgMixin from '@/mixins/Common/imgMixin';
// ? utils
import { bmBus } from '../../../../my-utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'UploadInfos',
  components: {},
  mixins: [imgMixin],
  data: () => ({
    imgs: []
  }),
  props: {
    eIcon: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    eIcon(params) {
      this.setIcon(params);
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    setIcon({ src, pId }) {
      // ? mock img
      this.img = {
        src: src || this.platformUrl,
        pId: pId || 0
      };
      this.$emit('getImg', this.img);
    }
  },
  mounted() {
    bmBus.$on('clearInputAndSelect', () =>
      Object.assign(this.$data, this.$options.data())
    );
  },
  beforeDestroy() {
    bmBus.$off('clearInputAndSelect');
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload {
  flex: 3;
  .flex-center;
  position: relative;
  .avatar-wrapper {
    width: 100%;
    height: 8.8rem;
    line-height: 8.8rem;
    img {
      height: 6.66rem;
      width: 6.66rem;
    }
  }
  .avatar-progress {
    position: absolute;
    bottom: -1.6rem;
    left: 1.2rem;
  }
}
</style>
