<template>
  <div class="week-day-wrapper">
    <Tabs :value="crtDay">
      <TabPane
        v-for="(itm, idx) of weekList"
        :key="idx + 1 + itm"
        :label="crtDayLabel[idx]"
        :name="itm"
      >
        <slot name="noon"></slot>
        <slot name="content"></slot>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// ? utils
import { getWeekDay } from './function';

export default {
  name: 'WeekContent',
  data: () => ({
    noonList: [
      {
        label: '上午',
        value: 'am'
      },
      {
        label: '下午',
        value: 'pm'
      }
    ],
    noon: 'am'
  }),
  props: {
    weekList: Array,
    crtDay: {
      type: String,
      default: 'Mon'
    }
  },
  computed: {
    crtDayLabel() {
      return this.weekList.map(week => getWeekDay(week));
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.week-day-wrapper {
  width: 100%;
  text-align: center;
  position: relative;
  .ivu-select {
    width: 10.8rem;
    z-index: 300;
  }
}
</style>
