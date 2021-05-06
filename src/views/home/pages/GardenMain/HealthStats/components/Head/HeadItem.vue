<template>
  <Card class="head-item">
    <p slot="title" class="title-wrapper">{{ item.title }}/人</p>
    <div class="content-wrapper">
      <p>今日情况: {{ item.endTime }}</p>
      <p>今日情况: {{ item.startTime }}</p>
      <p :class="item.change ? 'up' : 'down'">
        整体变化情况: {{ item.change }}%
        <Icon :type="item.change ? 'md-arrow-up' : 'md-arrow-down'" />
      </p>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'HeadItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    color() {
      let color = '#2db7f5';
      if (this.item.change === 100) {
        color = '#5cb85c';
      }
      return color;
    }
  }
};
</script>

<style lang="less" scoped>
.head-item {
  width: 30%;
  .title-wrapper {
    font-size: 0.84rem;
    color: #666;
    text-align: center;
  }
  .content-wrapper {
    height: 8rem;
    .circle-item {
      color: #333;
      background-color: #2db7f5;
      width: 5rem;
      height: 5rem;
    }
  }
  .up {
    color: #5cb85c;
    font-size: 1rem;
  }
  .down {
    color: #f33;
    font-size: 1rem;
  }
}
</style>
