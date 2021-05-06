<template>
  <div class="title">
    <div class="tag">
      <Tag color="lime" size="large">标题:</Tag>
    </div>
    <div class="content">
      <Input
        v-model="inputTitle"
        maxlength="30"
        placeholder="请填写标题。。。"
        @on-change="inputTitleChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputTitle',
  data: () => ({
    inputTitle: ''
  }),
  props: {
    propTitle: {
      type: String,
      default: ''
    }
  },
  watch: {
    propTitle(newValue) {
      if (newValue !== '') {
        this.inputTitle = newValue;
      }
    }
  },
  methods: {
    inputTitleChange() {
      this.$emit('inputTitleChange', this.inputTitle);
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.common-style {
  .tag {
    flex: 2;
    .full_flex();
  }
  .content {
    flex: 8;
    .full_flex();
    .select-menu {
      margin-bottom: 0.8rem;
      margin-right: 28rem;
    }
  }
}
.title {
  margin-top: 0.8rem;
  .full_flex();
  .common-style;
}
</style>
