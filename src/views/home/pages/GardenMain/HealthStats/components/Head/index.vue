<template>
  <div class="my-header">
    <head-item
      v-for="(itm, idx) in headerItem"
      :key="idx + itm"
      :item="itm"
      :index="idx"
    />
  </div>
</template>

<script>
// ? components
import HeadItem from './HeadItem';

export default {
  name: 'HealthStatHeader',
  components: {
    HeadItem
  },
  props: {
    headerItem: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.my-header {
  padding: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
