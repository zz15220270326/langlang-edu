<template>
  <Card class="footer-item">
    <p slot="title" class="title-wrapper">
      <span>{{ title }}</span>
      <span
        v-show="isShowCheck"
        v-for="item of types"
        :key="item.tag"
        :class="['base-link', { 'active-link': item.key === crtType }]"
        @click="selectType(item.key)"
      >
        {{ item.tag }}
      </span>
    </p>
    <div class="content-wrapper">
      <my-cookie :propOption="crtOptions" :chartStyle="cookieStyle" />
    </div>
  </Card>
</template>

<script>
// ? components
import MyCookie from '@common/echart/CookiePicture';

// ? utils
import { getCookiesData } from '@/utils';

export default {
  name: 'FootItem',
  components: { MyCookie },
  data: () => ({
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
    crtType: 'am',
    cookieStyle: {
      width: '16rem',
      height: '10rem'
    }
  }),
  props: {
    title: {
      type: String,
      default: '默认展示标题'
    },
    cOption: {
      type: Object,
      default: () => ({})
    },
    pOption: {
      type: Object,
      default: () => ({})
    },
    isShowCheck: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    crtOptions() {
      const tarInfos = this.cOption[this.crtType] || this.pOption || {},
        { infoList, optionList, colorList } = tarInfos,
        showOptions = getCookiesData(infoList, optionList, colorList);
      return showOptions;
    }
  },
  methods: {
    selectType(crtType) {
      this.crtType = crtType;
    }
  }
};
</script>

<style lang="less" scoped>
.footer-item {
  width: 28%;
  margin-top: 0.6rem;
  padding: 0 0.6rem;
  overflow: hidden;
  .title-wrapper {
    .base-link {
      font-size: 0.8rem;
      margin-left: 0.3rem;
      cursor: pointer;
      &:hover {
        color: skyblue;
      }
    }
    .active-link {
      color: #0e87f6;
      font-size: 0.9rem;
    }
  }
  .content-wrapper {
    #cookie {
      position: relative;
      right: 1.68rem;
    }
  }
}
// #0E87F6
</style>
