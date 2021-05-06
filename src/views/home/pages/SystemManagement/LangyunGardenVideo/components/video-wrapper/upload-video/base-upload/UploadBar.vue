<template>
  <div class="upload-bar">
    <div class="desc">
      <Tag size="large" color="blue">空间容量:</Tag>
      <Tag size="large" color="orange">
        已使用: {{ usedMemories }}/{{ totalMemories }}
      </Tag>
    </div>
    <div class="bottom">
      <Button type="success" size="large" @click.native="handleSaveVideo">
        保存到视频列表
      </Button>
      <Button type="error" size="large" @click.native="handleCloseModals">
        取消操作
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadBar',
  props: {
    totalMemories: {
      type: [Number, String],
      default: 100
    },
    usedMemories: {
      type: [Number, String],
      default: 16.77
    }
  },
  methods: {
    handleSaveVideo() {
      this.$emit('handleSaveVideo');
    },
    handleCloseModals() {
      this.$Message.warning('您取消了本次操作');
      this.$emit('handleCloseModals');
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
.upload-bar {
  .full_flex();
  .ivu-btn {
    margin: 0 3/4rem;
  }
}
</style>
