<template>
  <Header>
    <Menu class="menu-wrapper" mode="horizontal" :active-name="topRouteName">
      <MenuItem
        v-for="(item, index) in routerList"
        :key="index"
        :name="item.path"
        @click.native="clickMenuTop(index, item.path)"
        v-show="index > 0"
      >
        <img
          v-if="item.iconUrl !== ''"
          class="router-icon"
          :src="item.iconUrl"
          alt=""
        />
        <span>
          {{ item.showName }}
        </span>
      </MenuItem>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: 'HomeTopBar',
  data: () => ({}),
  props: {
    topRouteName: {
      type: String,
      default: ''
    },
    routerList: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  methods: {
    clickMenuTop(crtIdx = 0, crtPath = '') {
      // console.log(crtIdx, crtPath)
      this.$emit('clickMenuTop', crtIdx, crtPath);
    }
  }
};
</script>

<style lang="less" scoped>
.menu-wrapper {
  position: relative;
  top: 0;
  left: 0;
  overflow-x: auto;
}
</style>
