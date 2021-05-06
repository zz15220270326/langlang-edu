<template>
  <div class="health-care">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'HealthCare'
}
</script>

<style lang="less" scoped>
.health-care {
  color: #666;
}
</style>
