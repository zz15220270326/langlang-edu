<template>
  <div class="add-specialty-item">
    <div class="left">
      <slot name="tag"></slot>
    </div>
    <div class="right" slot="content">
      <slot name="content"></slot>
    </div>
    <div class="img">
      <slot name="img"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RowItem'
};
</script>

<style lang="less" scoped>
#flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#common-style {
  margin-top: 0.6rem;
  width: 100%;
  :first-child {
    font-size: 0.9rem;
    margin-left: 1.5rem;
  }
  :last-child {
    margin-left: 0.6rem;
    width: 22.5rem;
  }
}
.add-specialty-item {
  #flex-center;
  width: 80%;
  position: relative;
  .left {
    flex: 3;
    text-align: center;
  }
  .right {
    flex: 7;
    margin: 1rem auto;
  }
  .img {
    position: absolute;
    img {
      width: 6rem;
      height: 6rem;
    }
  }
}
</style>
