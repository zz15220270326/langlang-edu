<template>
  <Menu
    class="slider-menu"
    :active-name="crtRoute"
    theme="light"
    width="auto"
    :open-names="childrenList.filter(item => item.showName)"
  >
    <!-- {{ sliderRoute }}
    {{ $route.path.split('/')[3] }} -->
    <img
      src="http://t2.aservice.langlangyun.com:5480/langyun/public/static/workplace/images/logo.png"
      alt=""
    />
    <MenuItem
      class="slider-menu-item"
      v-for="(item, index) in childrenList"
      v-show="index > 0"
      :key="item.path + item.showName"
      :name="item.path"
      @click.native="clickMenuLeft(index, item.path)"
      :disabled="index === 1"
    >
      <template>
        <Icon type="ios-apps-outline" :size="!isCollapsed ? '18' : '25'" />
        <span v-show="!isCollapsed">
          {{ item.showName }}
        </span>
      </template>
    </MenuItem>
    <Button
      v-show="!isCollapsed"
      class="refresh-btn"
      size="large"
      icon="ios-color-wand-outline"
      type="primary"
      shape="circle"
      :loading="loading"
      @click.native="handleRefresh"
    />
  </Menu>
</template>

<script>
export default {
  name: 'HomeSlider',

  data() {
    return {
      loading: false
    };
  },

  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    sliderStyle: {
      type: Object,
      default() {
        return {
          color: '#fff'
        };
      }
    },
    sliderRoute: {
      type: String,
      default: ''
    },
    childrenList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    crtRoute() {
      return this.$route.path.split('/')[3];
    }
  },
  methods: {
    selectMenu(firstRoute) {
      console.log('select-menu', firstRoute);
    },
    clickMenuLeft(crtIdx = 0, crtPath = '') {
      this.$emit('clickMenuLeft', crtIdx, crtPath);
    },
    handleRefresh() {
      this.loading = true;
      setTimeout(() => {
        this.$emit('handleRefresh');
        this.$router.push(this.$route.path);
        this.loading = false;
      }, 600);
    }
  }
};
</script>

<style lang="less" scoped>
.slider-menu {
  padding: 1rem 0;
  position: relative;
  .slider-menu-item {
    margin: 0.5rem 0 0 0;
  }
  img {
    margin: 0.8rem 0.6rem;
  }
  .refresh-btn {
    position: fixed;
    bottom: 5rem;
    left: 5rem;
    width: 3rem;
    height: 3rem;
    z-index: 999;
  }
}
</style>
