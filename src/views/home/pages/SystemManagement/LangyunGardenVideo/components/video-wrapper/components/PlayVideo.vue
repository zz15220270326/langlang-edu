<template>
  <div class="video-wrapper">
    <video
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :poster="poster"
      width="640"
      height="360"
      :controls="controls"
      :src="url"
    >
      <!-- <source :src="url"></source> -->
    </video>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlayVideo',
  data: () => ({}),
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.video-wrapper {
  height: 25rem;
  text-align: center;
}
</style>
