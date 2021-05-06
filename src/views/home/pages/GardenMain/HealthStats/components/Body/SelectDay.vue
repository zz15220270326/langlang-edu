<template>
  <div class="select-day">
    <Button
      v-for="(itm, idx) in days"
      :key="idx + itm"
      :type="itm.type"
      @click.native="selectDay(idx)"
    >
      {{ itm.tag }}
    </Button>
  </div>
</template>

<script>
export default {
  name: 'SelectDay',
  data: () => ({}),
  props: {
    days: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectDay(crtIdx = 0) {
      this.$emit('selectDay', crtIdx);
    }
  }
};
</script>

<style lang="less" scoped>
.select-day {
  position: absolute;
  left: 18rem;
  top: 0rem;
  .ivu-btn {
    margin: 0 0.5rem;
  }
}
</style>
