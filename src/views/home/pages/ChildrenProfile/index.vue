<template>
  <div class="children-profile">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'ChildrenProfile'
}
</script>

<style lang="less" scoped>
.children-profile {
  background-color: #f6f6f6;
}
</style>
