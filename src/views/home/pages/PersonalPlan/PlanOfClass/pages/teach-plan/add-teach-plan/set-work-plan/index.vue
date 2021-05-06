<template>
  <div class="set-plan-content">
    <select-day @selectDay="selectDay" />
    <select-noon @selectNoon="selectNoon" />
    <edit-plan @getAddTeachPlanData="getAddTeachPlanData" />
  </div>
</template>

<script>
// ? import components
import SelectDay from './SelectWorkday';
import SelectNoon from './SelectNoon';
import EditPlan from './EditPlan';

// ? import mixins

export default {
  name: 'SetWorkPlan',

  components: {
    SelectDay,
    SelectNoon,
    EditPlan
  },

  data: () => ({
    dayIndex: 0,
    noonIndex: 0
  }),

  methods: {
    selectDay(dayIndex) {
      this.dayIndex = dayIndex;
    },
    selectNoon(noonIndex) {
      this.noonIndex = noonIndex;
    },
    getAddTeachPlanData(postData) {
      this.$emit('getContent', postData);
    }
  }
};
</script>

<style lang="less" scoped></style>
