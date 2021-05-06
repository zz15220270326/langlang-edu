<template>
  <div class="attdance-content">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Attdance',
  components: {},
  data: () => ({
    isLoading: false
  }),
  methods: {
    handleLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.$Message.success('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.attdance-content {
  margin-top: 1.2rem;
  background-color: #f6f6f6;
  color: #666;
  height: 100vh;
  .header-tab {
    height: 3rem;
    background-color: #fff;
    margin: auto 0;
    padding-left: 1.2rem;
    .ivu-btn {
      margin: 0.5rem 0.6rem;
      padding: 0;
      border-radius: 0;
      width: 7rem;
      height: 2rem;
    }
  }
}
</style>
