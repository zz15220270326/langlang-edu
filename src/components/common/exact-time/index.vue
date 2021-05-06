<template>
  <TimePicker
    v-model="pickTime"
    format="HH:mm"
    type="time"
    :closable="false"
    placeholder="pickTime"
    @on-change="handleChangeTime"
  />
</template>

<script>
export default {
  name: 'ExactTime',
  data: () => ({
    pickTime: ''
  }),
  props: {
    propTime: {
      type: String,
      default: ''
    }
  },
  watch: {
    propTime(newValue) {
      this.pickTime = newValue
    }
  },
  methods: {
    handleChangeTime() {
      this.$emit('handleChangeTime', this.pickTime)
    }
  }
}
</script>

<style lang="less" scoped></style>
