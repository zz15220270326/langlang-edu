<template>
  <Footer v-show="false" class="layout-footer-center">
    {{ desc }}
  </Footer>
</template>

<script>
export default {
  name: 'BaseFooter',
  components: {},
  props: {
    desc: {
      type: String,
      default: `2011-2016 &copy; 维权必究 2020-11-03`
    }
  }
};
</script>

<style lang="less" scoped>
.layout-footer-center {
  margin: 10rem 0;
}
</style>
