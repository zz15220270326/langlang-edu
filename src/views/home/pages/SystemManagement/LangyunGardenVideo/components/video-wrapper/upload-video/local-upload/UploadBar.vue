<template>
  <div class="upload-common-bar">
    <div class="desc" v-if="false">
      <Tag size="large" color="blue">空间容量:</Tag>
      <Tag size="large" color="orange">
        已使用: {{ usedMemories }}/{{ totalMemories }}
      </Tag>
    </div>
    <div class="bottom">
      <Button type="success" size="large" @click.native="handleAddToVideoList">
        添加到视频列表
      </Button>
      <Button type="error" size="large" @click.native="handleCancelOperation">
        取消操作
      </Button>
    </div>
  </div>
</template>

<script>
// ? import components

// ? import mixins
import memiesInfo from '../../getWrapperMix';

export default {
  name: 'UploadCommonBar',

  components: {},

  mixins: [memiesInfo],

  data: () => ({}),

  props: {},

  computed: {},

  methods: {
    handleAddToVideoList() {
      this.$emit('handleAddToVideoList', this.videos);
    },
    handleCancelOperation() {
      this.$emit('handleCancelOperation');
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-common-bar {
  height: 30%;
  .desc {
    height: 100 /3%;
    .full_flex();
  }
  .bottom {
    height: (100 / 3) * 2%;
    .full_flex();
    .ivu-btn {
      margin: 0 0.75rem;
    }
  }
}
</style>
