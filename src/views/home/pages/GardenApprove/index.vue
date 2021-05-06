<template>
  <div class="garden-approve">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'GardenApprove',
  components: {},
  data: () => ({
    isLoading: false
  }),
  methods: {
    handleLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$Message.success('刷新成功')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.garden-approve {
  color: #666;
}
</style>
