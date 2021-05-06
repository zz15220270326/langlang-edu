<template>
  <div class="bottom">
    <Button
      size="large"
      v-for="(item, key) in operations"
      :key="key"
      :type="item.type"
      @click.native="handleBottom(key)"
    >
      <span>{{ item.tag }}</span>
      <Icon :type="item.icon" />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    operations: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleBottom(key) {
      this.$emit('handleBottom', key);
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
  height: 15%;
  padding: 1rem 0;
  text-align: center;
  .ivu-btn {
    margin: 0 0.75rem;
  }
}
</style>
