<template>
  <!-- format="HH’mm’ss" -->
  <TimePicker
    v-model="timeSpan"
    format="HH:mm"
    type="timerange"
    style="width: 300px"
    placement="bottom-end"
    placeholder="Select time"
    @on-open-change="getChangeTime"
  />
</template>

<script>
export default {
  name: 'TimeSpan',
  data: () => ({
    timeSpan: ['00:00:00', '01:00:00']
  }),
  methods: {
    getChangeTime() {
      const startTime = this.timeSpan[0]
      const endTime = this.timeSpan[1]
      const timeSpan = {
        startTime,
        endTime
      }
      this.$emit('getChangeTime', timeSpan)
    }
  }
}
</script>

<style lang="less" scoped></style>
