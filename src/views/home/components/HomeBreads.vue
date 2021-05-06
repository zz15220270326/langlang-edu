<template>
  <Breadcrumb class="home-bread">
    <!-- <BreadcrumbItem>
      <img :src="projectIcon" alt="" />
    </BreadcrumbItem> -->
    <BreadcrumbItem>
      <!-- Affix -->
      <span size="large" color="green">当前页面: </span>
    </BreadcrumbItem>
    <BreadcrumbItem>
      {{ firstTitle }}
    </BreadcrumbItem>
    <BreadcrumbItem v-if="false">
      <span class="about-us" @click="handleShowUs">关于我们</span>
      <!-- <Button></Button> -->
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomeBreads',

  props: {
    firstTitle: {
      type: String,
      require: true
    },
    firstRoute: {
      type: String,
      require: true
    }
  },

  computed: {
    ...mapState(['projectIcon'])
  },

  methods: {
    handleShowUs() {
      // this.$Message.info('欢迎')
      // const crtPath = this.$route.path
      // if (crtPath !== '/garden/GardenMain/Overview') {
      //   this.$router.replace('/garden/GardenMain/Overview')
      // }
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/themes/index.less';
.home-bread {
  font-size: 0.96rem;
  padding: 1.2rem 1rem;
  .about-us {
    color: @primary-color;
    cursor: pointer;
  }
}
</style>
