<template>
  <div class="select-day">
    <Button
      v-for="(itm, idx) of workdayList"
      :key="idx"
      size="large"
      :type="itm.type"
      @click.native="selectDay(idx)"
    >
      {{ itm.tag }}
    </Button>
  </div>
</template>

<script>
export default {
  name: 'SelectWorkday',
  data: () => ({
    workdayList: [
      {
        tag: '周一',
        type: 'primary'
      },
      {
        tag: '周二',
        type: 'info'
      },
      {
        tag: '周三',
        type: 'info'
      },
      {
        tag: '周四',
        type: 'info'
      },
      {
        tag: '周五',
        type: 'info'
      }
    ],
    dayIndex: 0
  }),
  watch: {
    dayIndex(dayIndex) {
      this.workdayList.forEach((item, index) => {
        index === dayIndex ? (item.type = 'primary') : (item.type = 'info');
      });
      this.$bus.$emit('selectWorkDay', dayIndex);
    }
  },
  methods: {
    selectDay(dayIndex) {
      this.dayIndex = dayIndex;
    },
    initWorkDay() {
      this.$bus.$on('emitSelectPlanId', () => {
        this.dayIndex = 0;
      });
    }
  },
  mounted() {
    this.initWorkDay();
  }
};
</script>

<style lang="less" scoped>
.select-day {
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .ivu-btn {
    width: 8rem;
  }
}
</style>
