<template>
  <div class="bottom-item">
    <div class="tag">
      <Tag size="large" :color="color">
        {{ title }}
      </Tag>
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'pink'
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-item {
  margin: 1rem 0;
  .tag {
    margin: 0.5rem 0.5rem;
  }
  .content {
    margin: 0.5rem 1rem;
  }
}
</style>
