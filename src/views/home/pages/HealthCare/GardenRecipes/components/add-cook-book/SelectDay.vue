<template>
  <div class="select-day">
    <div class="left">选择天数:</div>
    <div class="right">
      <Button
        v-for="(item, idx) in weekDayList"
        :key="idx"
        :type="item.type"
        @click.native="selectWeekDay(idx)"
      >
        {{ item.tag }}
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectDay',
  data: () => ({
    weekDayList: [
      {
        tag: '周一',
        key: 0,
        type: 'error'
      },
      {
        tag: '周二',
        key: 1,
        type: 'info'
      },
      {
        tag: '周三',
        key: 2,
        type: 'info'
      },
      {
        tag: '周四',
        key: 3,
        type: 'info'
      },
      {
        tag: '周五',
        key: 4,
        type: 'info'
      }
    ],
    dayIndex: 0
  }),
  methods: {
    selectWeekDay(btnIdx) {
      this.dayIndex = btnIdx;
      this.weekDayList.forEach((item, index) => {
        index === btnIdx ? (item.type = 'error') : (item.type = 'info');
      });
      this.$bus.$emit('changeMenuWeekDay', this.dayIndex);
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-day {
  margin-top: 0.8rem;
  .flex-center;
  .left {
    flex: 2;
    text-align: right;
  }
  .right {
    flex: 7;
    width: 100%;
    padding-left: 1.2rem;
    .ivu-btn {
      margin: 0 0.8rem;
      width: 6rem;
    }
  }
}
</style>
