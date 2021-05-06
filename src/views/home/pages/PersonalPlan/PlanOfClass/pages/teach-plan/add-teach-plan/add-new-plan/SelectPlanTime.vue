<template>
  <div class="select-plan-time">
    <div class="body-tag">
      <span>开始-结束时间:</span>
    </div>
    <div class="exact-time-span">
      <TimeSpan @getChangeTime="getChangeTime" />
    </div>
    <div class="add-to-list">
      <Button type="success" @click.native="addToList">添加至列表</Button>
    </div>
  </div>
</template>

<script>
// ? components
import TimeSpan from '@common/time-span';

export default {
  name: 'SelectPlanTime',
  components: {
    TimeSpan
  },
  methods: {
    getChangeTime(timeSpan) {
      this.$emit('getChangeTime', timeSpan);
    },
    addToList() {
      this.$emit('addToList');
    }
  }
};
</script>

<style lang="less" scoped>
.select-plan-time {
  margin-top: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .body-tag {
    flex: 1;
    text-align: right;
    span {
      margin-right: 1.6rem;
    }
  }
  .exact-time-span {
    flex: 2;
    width: 100%;
    margin-left: 0.36rem;
  }
  .add-to-list {
    flex: 1;
  }
}
</style>
