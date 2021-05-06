<template>
  <div class="my-footer">
    <foot-item
      v-if="Object.keys(todayStuHealth).length > 0"
      :cOption="todayStuHealthOption"
      title="今日全园幼儿健康情况"
    />
    <!-- 今日全园幼儿体温情况 √ -->
    <!-- 今日全员职工健康情况 √ -->
    <!-- 今日小班幼儿健康情况 √ -->
    <!-- 今日小班幼儿体温情况 √ -->
    <!-- 今日中班幼儿体温情况 √ -->
    <!-- 今日中班幼儿健康情况 √ -->
    <!-- 今日大班幼儿健康情况 -->
    <!-- 今日大班幼儿体温情况 -->
    <foot-item
      :pOption="StaffTempOption"
      title="今日全园幼儿体温情况"
      :isShowCheck="false"
    />
    <foot-item
      :pOption="StaffHealthOption"
      title="今日全员职工健康情况"
      :isShowCheck="false"
    />
    <foot-item
      :cOption="stu1HealthOption"
      title="今日小班幼儿健康情况"
      :isShowCheck="true"
    />
    <foot-item
      :cOption="stu2HealthOption"
      title="今日中班幼儿健康情况"
      :isShowCheck="true"
    />
    <foot-item
      :cOption="stu3HealthOption"
      title="今日大班幼儿健康情况"
      :isShowCheck="true"
    />
    <foot-item
      :cOption="stu1TempOption"
      title="今日小班幼儿体温情况"
      :isShowCheck="true"
    />
    <foot-item
      :cOption="stu2TempOption"
      title="今日中班幼儿体温情况"
      :isShowCheck="true"
    />
    <foot-item
      :cOption="stu3TempOption"
      title="今日大班幼儿体温情况"
      :isShowCheck="true"
    />
  </div>
</template>

<script>
// ? components
import FootItem from './FootItem';

import { colorList } from './data';

export default {
  name: 'HealthStatFooter',
  components: {
    FootItem
  },
  data: () => ({
    defaultOption: {}
  }),
  props: {
    todayStuHealth: {
      type: Object,
      default: () => ({})
    },
    stu1Health: {
      type: Object,
      default: () => ({})
    },
    stu2Health: {
      type: Object,
      default: () => ({})
    },
    stu3Health: {
      type: Object,
      default: () => ({})
    },
    stu1Temp: {
      type: Object,
      default: () => ({})
    },
    stu2Temp: {
      type: Object,
      default: () => ({})
    },
    stu3Temp: {
      type: Object,
      default: () => ({})
    },
    todayStaffTemperature: {
      type: Array,
      default: () => []
    },
    todayStaffHealth: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    todayStuHealthOption() {
      const options = {},
        { am, pm } = this.todayStuHealth;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu1HealthOption() {
      const options = {},
        { am, pm } = this.stu1Health;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu2HealthOption() {
      const options = {},
        { am, pm } = this.stu2Health;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu3HealthOption() {
      const options = {},
        { am, pm } = this.stu3Health;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu1TempOption() {
      const options = {},
        { am, pm } = this.stu1Temp;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu2TempOption() {
      const options = {},
        { am, pm } = this.stu2Temp;
      this.decorateOptions(options, am, pm);
      return options;
    },
    stu3TempOption() {
      const options = {},
        { am, pm } = this.stu3Temp;
      this.decorateOptions(options, am, pm);
      return options;
    },
    StaffTempOption() {
      const options = {
        infoList: this.todayStaffTemperature,
        optionList: this.todayStaffTemperature.map(item => item.name),
        colorList: ['gold', 'red', 'lime']
      };
      // console.log(options)
      return options;
    },
    StaffHealthOption() {
      const options = {
        infoList: this.todayStaffHealth,
        optionList: this.todayStaffHealth.map(item => item.name),
        colorList: ['gold', 'red', 'lime']
      };
      // console.log(options)
      return options;
    }
  },
  methods: {
    decorateOptions(options = {}, am = [], pm = []) {
      options.am = {
        infoList: am.map(item => ({
          name: item.name,
          value: item.value ? item.value : 0
        })),
        optionList: am.map(item => item.name),
        colorList
      };
      options.pm = {
        infoList: pm.map(item => ({
          name: item.name,
          value: item.value ? item.value : 0
        })),
        optionList: pm.map(item => item.name),
        colorList
      };
    }
  }
};
</script>

<style lang="less" scoped>
.my-footer {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.2rem 0;
  .footer-item {
    width: 32.6%;
  }
}
</style>
