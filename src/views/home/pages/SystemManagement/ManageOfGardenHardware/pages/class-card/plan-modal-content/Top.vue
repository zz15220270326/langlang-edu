<template>
  <div class="top">
    <!-- <Tag size="large" color="lime">整体预设方案</Tag> -->
    <Tag size="large" color="lime">整体预设方案</Tag>
    <!-- <time-span @getChangeTime="getChangeTime" /> -->
    <TimePicker
      class="select-time"
      :confirm="false"
      type="timerange"
      placement="bottom-end"
      placeholder="请选择整体预设方案时间段"
      @on-change="getChangeTime"
    ></TimePicker>
    <Button type="info" @click.native="handleUseAll">应用到每一天</Button>
  </div>
</template>

<script>
// ? bus
import ccBus from '../ccBus';

export default {
  name: 'Top',
  data: () => ({
    params: {
      openTime: '',
      closeTime: ''
    }
  }),
  methods: {
    getChangeTime(timeSpan) {
      const [openTime, closeTime] = timeSpan;
      this.params = {
        openTime,
        closeTime
      };
    },
    handleUseAll() {
      if (!this.params.openTime.length || !this.params.closeTime.length) {
        this.$Message.warning('请选择开始到结束的时间段');
        return;
      } else {
        this.$Modal.confirm({
          title: '应用到每一天',
          content: '确认操作?',
          onOk: () => ccBus.$emit('handleUseInEveryday', this.params)
        });
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
  .select-time {
    margin: 0 1rem;
  }
}
</style>
