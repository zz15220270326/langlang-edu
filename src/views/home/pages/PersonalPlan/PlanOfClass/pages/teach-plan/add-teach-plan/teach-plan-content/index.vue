<template>
  <div class="teach-plan-content">
    <week-content :weekList="weekList">
      <div slot="noon" class="nonn-wrapper">
        <Select v-model="noon" :transfer="true" @on-select="handleSelectNoon">
          <Option
            v-for="itm2 of noonList"
            :key="itm2.value"
            :value="itm2.value"
          >
            {{ itm2.label }}
          </Option>
        </Select>
        <main-content
          slot="content"
          :data="data"
          :typeList="typeList"
          @handleSelectItemType="handleSelectItemType"
        ></main-content>
      </div>
    </week-content>
  </div>
</template>

<script>
// ? data
import mainParams from './data/mainParams';
// ? components
import WeekContent from './WeekContent';
import MainContent from './ChangeTable';
// ? request
import { getTimePlanDetail } from '@/request/plan/1-class-plan';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? bus
import tpcBus from './tpcBus';

export default {
  name: 'TeachPlanContent',
  components: { WeekContent, MainContent },
  data: () => ({
    mainParams,
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
    day: 'Mon',
    noon: 'am',
    timeList: [],
    typeList: [],
    data: []
  }),
  computed: {
    weekList() {
      const weekData = Object.getOwnPropertyNames(this.mainParams).filter(
        k => k !== '__ob__'
      );
      return weekData;
    },
    focusParam() {
      return this.mainParams[this.day][this.noon];
    }
  },
  methods: {
    async getTimePlanById(id) {
      const result = await getTimePlanDetail(id),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.timeList = [];
        this.data = [];
        const { list } = deepCopyObj(dataSource);
        list.forEach(item => {
          this.timeList.push(`${item.start_time}-${item.end_time}`);
        });
        this.data = this.timeList
          .map(item => ({
            time: item,
            type: '',
            class: ''
          }))
          .filter(item => parseInt(item.time.split(':')[0]) <= 12);
      }
    },
    handleSelectNoon(item) {
      switch (item.value) {
        case 'am':
          this.data = this.timeList
            .map((item, index) => ({
              time: item,
              type: this.mainParams[this.weekList[index]]['am'].type[index],
              class: this.mainParams[this.weekList[index]]['am'].class[index]
            }))
            .filter(item => parseInt(item.time.split(':')[0]) <= 12);
          break;
        case 'pm':
          this.data = this.timeList
            .map((item, index) => ({
              time: item,
              type: this.mainParams[this.weekList[this.day]]['pm'].type[index],
              class: this.mainParams[this.weekList[this.day]]['pm'].class[index]
            }))
            .filter(item => parseInt(item.time.split(':')[0]) > 12);
          break;
        default:
          break;
      }
    },
    handleSelectItemType({ item, index }) {
      this.mainParams[this.day][this.noon].type[index] = item.value;
    }
  },
  /**
   * @description
   */
  mounted() {
    this.$bus.$on('emitSelectPlanId', planId => this.getTimePlanById(planId));
    tpcBus.$on('getTypeList', typeList => (this.typeList = typeList));
  },
  beforeDestroy() {
    this.$bus.$off('emitSelectPlanId');
    tpcBus.$off('getTypeList');
  }
};
</script>

<style lang="less" scoped>
.teach-plan-content {
  .ivu-select {
    width: 10.8rem;
    z-index: 300;
  }
}
</style>
