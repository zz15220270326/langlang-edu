<template>
  <div class="single-img-wrapper">
    <Tooltip
      class="img-content"
      content="点击按钮修改照片或删除照片"
      placement="right"
    >
      <img :src="item.src" alt="" />
    </Tooltip>
    <Input placeholder="请输入照片的名称" @on-blur="getCrtItemName" />
    <template class="button-group">
      <Button
        type="primary"
        shape="circle"
        icon="ios-build-outline"
        @click.native="updateCrtItem"
      />
      <Button
        type="error"
        shape="circle"
        icon="ios-trash-outline"
        @click.native="removeCrtItem"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
  props: {
    item: {
      type: Object,
      default: () => ({
        // pId: 0,
        // src: ''
      })
    },
    index: {
      type: Number,
      default: -1
    }
  },
  methods: {
    getCrtItemName(e) {
      const { value } = e.target;
      this.$emit('getCrtItemName', value, this.index);
    },
    updateCrtItem() {
      this.$emit('updateCrtItem', this.item.pId);
    },
    removeCrtItem() {
      this.$emit('removeCrtItem', this.index);
    }
  }
};
</script>

<style lang="less" scoped>
.single-img-wrapper {
  margin-top: 0.8rem;
  margin-left: 3rem;
  position: relative;
  padding: 1.3rem 0;
  .img-content {
    position: absolute;
    left: 0.8rem;
    top: 0;
    z-index: 999;
    img {
      width: 6rem;
      height: 5rem;
    }
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .ivu-input-wrapper {
    width: 28rem;
    margin: 0 2rem;
    position: absolute;
    left: 6rem;
    top: 30%;
  }
  .ivu-btn {
    position: relative;
    left: 38rem;
    top: 30%;
    margin: 0 0.8rem;
  }
}
</style>
