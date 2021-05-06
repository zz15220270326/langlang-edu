<template>
  <div class="top">
    <Tag size="large" color="lime">整体预设方案</Tag>
    <time-span @getChangeTime="getChangeTime" />
    <Button type="info" @click.native="handleUseAll">应用到每一天</Button>
  </div>
</template>

<script>
// ? import components
import TimeSpan from '@common/time-span';

export default {
  name: 'Top',
  components: {
    TimeSpan
  },
  data: () => ({
    startTime: '',
    endTime: ''
  }),
  methods: {
    getChangeTime(timeSpan) {
      const { startTime, endTime } = timeSpan;
      this.startTime = startTime;
      this.endTime = endTime;
    },
    handleUseAll() {
      if (this.startTime === '' || this.endTime === '') {
        this.$Message.warning('请设置开始时间或结束时间');
      } else {
        this.$Message.info('请求设置到每一天...');
        const timeSpan = {
          startTime: this.startTime,
          endTime: this.endTime
        };
        this.$emit('handleUseAll', timeSpan);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  height: 10%;
  padding: 0.3rem 0;
  .full_flex();
  .ivu-btn {
    margin: 0 0.8rem;
  }
}
</style>
