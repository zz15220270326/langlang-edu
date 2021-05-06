<template>
  <div class="modal-row-item">
    <div class="tag">
      <slot name="tag"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalRowItem',
  props: {}
};
</script>

<style lang="less" scoped>
.flex-format {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tag-content {
  .tag {
    flex: 2;
    .flex-format;
  }
  .content {
    flex: 8;
    .flex-format;
    .select-menu {
      padding: 0.8rem 0;
      margin-right: 28rem;
    }
  }
}
.common-style {
  .flex-format;
  .tag-content;
}

.modal-row-item {
  margin: 1rem 0;
  .common-style;
}
</style>
