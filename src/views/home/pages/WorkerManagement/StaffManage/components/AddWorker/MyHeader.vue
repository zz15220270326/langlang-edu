<template>
  <div class="header">
    <Button
      v-for="(item, index) in selectInfo"
      :key="index"
      :type="item.type"
      @click.native="switchInfo(index)"
    >
      {{ item.tag }}
    </Button>
  </div>
</template>

<script>
import eventBus from '../../eventBus';

export default {
  name: 'AddStaffHeader',
  components: {},
  props: {
    selectInfo: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  methods: {
    switchInfo(crtIdx) {
      this.$emit('switchInfo', crtIdx);
    },
    getInfos() {}
  },
  mounted() {
    eventBus.$on('clearContent', () => {});
  },
  beforeDestroy() {
    eventBus.$off('clearContent');
  }
};
</script>

<style lang="less" scoped>
.header {
  .ivu-btn {
    width: 5.4rem;
    margin: 0 0.5rem;
  }
}
</style>
