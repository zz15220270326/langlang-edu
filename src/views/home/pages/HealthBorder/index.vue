<template>
  <div class="health-border">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'HealthBorder'
}
</script>

<style lang="less" scoped></style>
