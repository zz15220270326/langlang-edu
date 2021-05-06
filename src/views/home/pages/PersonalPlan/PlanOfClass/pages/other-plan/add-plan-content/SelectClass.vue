<template>
  <div class="select-class">
    <div class="tag">
      <Tag color="blue" size="large">选择班级:</Tag>
    </div>
    <div class="content">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
  </div>
</template>

<script>
// ? import components
import { SelectMenu } from '@common/select-menu';

export default {
  name: 'SelectClass',
  components: {
    SelectMenu
  },
  props: {
    classTitle: {
      type: String,
      default: ''
    },
    classList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectClass(selectItem) {
      this.$emit('selectClass', selectItem);
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
.style {
  .tag {
    flex: 2;
    .full_flex();
  }
  .content {
    flex: 8;
    .full_flex();
    .select-menu {
      margin-right: 199 / 5rem;
    }
  }
}
.select-class {
  margin-top: 0.8rem;
  height: 2rem;
  .full_flex();
  .style;
}
</style>
