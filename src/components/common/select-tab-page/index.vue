<template>
  <div class="select-tab">
    <Button
      v-for="(item, key) in selectTabs"
      :key="key"
      :type="item.type"
      @click.native="handleSelectTab(key)"
    >
      {{ item.tag }}
    </Button>
    <slot v-if="currentIndex === 0" name="page1"></slot>
    <slot v-if="currentIndex === 1" name="page2"></slot>
    <slot v-if="currentIndex === 2" name="page3"></slot>
    <slot v-if="currentIndex === 3" name="page4"></slot>
    <slot v-if="currentIndex === 4" name="page5"></slot>
  </div>
</template>

<script>
export default {
  name: 'SelectTabPage',
  components: {},
  props: {
    selectTabs: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSelectTab(currentIndex) {
      this.$emit('handleSelectTab', currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.select-tab {
  padding: 1rem 0.3rem;
  .ivu-btn {
    margin: 0 0.6rem;
  }
}
</style>
