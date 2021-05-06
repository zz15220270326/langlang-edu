<template>
  <div class="footer">
    <Button
      v-for="(item, key) in operations"
      :key="key"
      :type="item.type"
      @click.native="handleOp(item.tag)"
    >
      <span>{{ item.tag }}</span>
      <Icon :type="item.icon" />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    operations: []
  }),
  props: {
    op: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    op(newValue) {
      this.operations = newValue;
    }
  },
  methods: {
    handleOp(currentTag) {
      this.$emit('handleFooterOperations', currentTag);
    }
  },
  created() {
    this.operations = this.op;
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 0.6rem;
  height: 10vh;
  text-align: center;
  .ivu-btn {
    margin: 9/8rem 4/5rem;
    width: 8rem;
    height: 19/8rem;
    position: relative;
    top: 0.8rem;
  }
}
</style>
