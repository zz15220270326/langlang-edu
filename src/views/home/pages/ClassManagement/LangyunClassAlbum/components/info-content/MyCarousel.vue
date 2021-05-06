<template>
  <div class="c-wrapper">
    <Carousel
      :loop="loop"
      :autoplay="autoplay"
      :trigger="trigger"
      :autoplay-speed="autoplaySpeed"
    >
      <!-- easing="linear" -->
      <CarouselItem
        class="c-item"
        v-for="(itm, idx) of propItem"
        :key="idx + 1 + ' ' + itm"
      >
        <img
          :src="itm.src"
          alt=""
          :style="{ width: itm.src ? '100%' : '35rem' }"
        />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: 'InfoCarousel',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    autoplaySpeed: {
      type: Number,
      default: 1500
    },
    trigger: {
      type: String,
      default: 'click' // hover
    },

    propItem: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.c-wrapper {
  position: relative;
  height: 30rem;
  .ivu-carousel {
    padding-top: 2rem;
    text-align: center;
    .c-item {
      img {
        width: 30rem;
        height: 25rem;
        z-index: 9999;
      }
    }
  }
}
</style>
