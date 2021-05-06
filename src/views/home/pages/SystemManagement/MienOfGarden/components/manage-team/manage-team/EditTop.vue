<template>
  <div class="top-wrapper">
    {{ role }} - ( {{ name }} )
  </div>
</template>

<script>
import mtBus from '../mtBus';

export default {
  name: 'EditTop',

  components: {},

  data: () => ({
    uid: 0,
  }),

  props: {
    name: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    }
  },

  mounted() {
    mtBus.$on('dispatchEdits', ({ uid }) => {
      this.uid = uid;
    });
  },
  beforeDestroy() {
    mtBus.$off('dispatchEdits');
  }
};
</script>

<style lang="less" scoped>
.top-wrapper {
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 580;
}
</style>
