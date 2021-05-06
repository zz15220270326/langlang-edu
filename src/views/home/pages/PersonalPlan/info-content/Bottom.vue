<template>
  <div class="bottom">
    <bottom-item title="点评意见" :content="remarkContent" color="orange" />
    <bottom-item title="点评人" :content="name" color="lime" />
    <bottom-item title="点评时间" :content="remarkTime" color="red" />
  </div>
</template>

<script>
// ? children
import BottomItem from './bottom/BottomItem';

export default {
  name: 'Bottom',
  components: {
    BottomItem
  },
  props: {
    remarkContent: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    remarkTime: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
  margin-top: 2rem;
}
</style>
