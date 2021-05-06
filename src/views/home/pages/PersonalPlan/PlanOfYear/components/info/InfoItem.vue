<template>
  <div class="info-item">
    <div class="tag">
      <Tag :size="size" :color="color">
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
  name: 'InfoItem',

  props: {
    title: {
      type: String,
      default: ''
    },
    size: { type: String, default: '' },
    color: { type: String, default: '' },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.info-item {
  margin-top: 1.2rem;
  .content {
    margin-top: 0.6rem;
  }
}
</style>
