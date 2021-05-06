<template>
  <div class="wrapper">
    <img :src="currentImg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  data: () => ({
    phoneNumber: ''
  }),
  props: {
    currentImg: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding: 1rem 0.8rem;
  background-color: #0094ff;
  opacity: 0.8;
  img {
    width: 12%;
    height: 12%;
  }
}
</style>
