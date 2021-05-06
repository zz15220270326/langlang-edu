<template>
  <div class="add-parent-info">
    <Button type="default" icon="md-add" @click.native="addParent">
      添加家长信息
    </Button>
  </div>
</template>

<script>
export default {
  name: 'AddBtns',
  methods: {
    addParent() {
      this.$bus.$emit('addInfantParents');
    }
  }
};
</script>

<style lang="less" scoped>
.add-parent-info {
  margin-top: 1.6rem;
  width: 100%;
  text-align: center;
  // position: fixed;
  position: absolute;
  left: 0;
  // bottom: 23rem;
  bottom: 18rem;
}
</style>
