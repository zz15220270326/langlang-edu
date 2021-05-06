<template>
  <Card class="my-body">
    <p slot="title" class="title-wrapper">
      <span class="crt-title">幼儿健康异常变化趋势</span>
      <days :days="days" @selectDay="selectDay" />
      <span
        :class="['types', { isActive: item.key === crtKey }]"
        v-for="item of types"
        :key="item.key"
        @click="selectType(item.key)"
      >
        {{ item.tag }}
      </span>
    </p>
    <div class="content-wrapper" v-if="bodyItems.length > 0">
      <line-chart
        v-if="lineOption"
        :chartStyle="chartStyle"
        :option="lineOption"
      />
    </div>
  </Card>
</template>

<script>
import './index.less';
// ? components
import Days from './SelectDay';

import LineChart from '@common/echart/LineChart';

// ? utils
import { getLineOption } from '@/utils';

export default {
  name: 'HealthStatBody',
  components: {
    Days,
    LineChart
  },
  data: () => ({
    days: [
      {
        tag: '7天',
        type: 'primary'
      },
      {
        tag: '14天',
        type: 'default'
      },
      {
        tag: '30天',
        type: 'default'
      }
    ],
    crtIdx: 0,
    types: [
      {
        tag: '晨检',
        key: 'am'
      },
      {
        tag: '午检',
        key: 'pm'
      }
    ],
    crtKey: 'am',
    chartStyle: {
      width: '80rem',
      height: '30rem'
    }
  }),

  props: {
    bodyItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    lineOption() {
      const list = this.bodyItems[this.crtIdx][this.crtKey] || [];
      const options = getLineOption(
        `${this.days[this.crtIdx].tag}变化趋势`,
        this.types.find(item => item.key === this.crtKey).tag,
        '幼儿健康异常变化趋势',
        list
      );
      return options;
    }
  },
  methods: {
    selectDay(crtIdx) {
      this.crtIdx = crtIdx;
      this.days.forEach((item, index) =>
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default')
      );
    },
    selectType(key) {
      // ? event-proxy
      // const { type } = e.target.dataset
      this.crtKey = key;
    }
  }
};
</script>
