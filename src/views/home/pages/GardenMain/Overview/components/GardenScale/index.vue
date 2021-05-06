<template>
  <div class="scale">
    <div class="gender">
      <div class="title">
        男女比例
      </div>
      <div class="content">
        <cookie-picture :propOption="sexOption" />
      </div>
    </div>
    <div class="nation">
      <div class="title">
        各民族比例
      </div>
      <div class="content">
        <cookie-picture :propOption="nationOption" />
      </div>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? import components
import CookiePicture from '@common/echart/CookiePicture';

import { formatObjList, getCookiesData } from '@/utils';

// ? import mixins

export default {
  name: 'GardenScale',

  components: {
    CookiePicture
  },

  data: () => ({
    sexOption: {},
    nationOption: {}
  }),

  props: {
    gardenSexStat: {
      type: Object,
      default: () => ({})
    },
    gardenNationStat: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    gardenSexStat(newVal) {
      if (Object.keys(newVal).length) this.formatSexOptions(newVal);
    },
    gardenNationStat(newVal) {
      newVal.length && this.formatNationOptions(newVal);
    }
  },

  methods: {
    formatSexOptions(infos) {
      const infoList = formatObjList(infos),
        sexList = infoList.map(item => item.name),
        colorList = ['#1cb1f5', '#ff5823'];
      this.sexOption = getCookiesData(infoList, sexList, colorList);
    },
    formatNationOptions(list) {
      const infoList = [];
      list.map(item => {
        infoList.push({
          name: item.nation,
          value: item.nationCount
        });
      });
      const nationList = infoList.map(item => item.name),
        nationColors = [
          '#FF5722',
          '#1cb1f5',
          '#00dd94',
          '#ff9400',
          '#37f032',
          '#A37583',
          '#9e7f03',
          '#19BE6B',
          '#BB19BE',
          '#8E3249',
          '#2CBAA8',
          '#4B2CBA',
          '#429886',
          '#429859',
          '#AFE860',
          '#394563',
          '#5A3963',
          '#613963',
          '#BE1C5A',
          '#B12F8F',
          '#AB8460'
        ];
      this.nationOption = getCookiesData(infoList, nationList, nationColors);
    }
  }
};
</script>
