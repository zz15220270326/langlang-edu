<template>
  <div class="bottom-btns">
    <Button
      v-for="(item, idx) of operations"
      :key="idx"
      :type="item.type"
      :size="size"
      @click.native="handleBottomOperations(item.tag)"
    >
      {{ item.tag }}
      <!-- :icon="item.icon || undefined" -->
      <Icon v-if="item.icon" :type="item.icon" />
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ModalBottomBtns',
  props: {
    operations: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleBottomOperations(btnTag) {
      this.$emit('handleBottomOperations', btnTag);
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-btns {
  width: 100%;
  text-align: center;
  margin-top: 1.2rem;
  padding: 0.8rem 0;
  .ivu-btn {
    margin: 0 0.75rem;
    width: 5.4rem;
  }
}
</style>
