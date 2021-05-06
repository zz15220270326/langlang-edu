<template>
  <div class="home-content">
    <!-- Home组件下面的2级路由 -->
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->
    <router-view/>
  </div>
</template>

<script>
// import MyFooter from '@common/MyFooter'

export default {
  name: 'HomeContent',
  components: {}
};
</script>

<style lang="less" scoped>
.home-content {
  // height: 100vh;
  height: 100%;
  // position: relative;
  // bottom: 0;
  // right: 0;
}
</style>
