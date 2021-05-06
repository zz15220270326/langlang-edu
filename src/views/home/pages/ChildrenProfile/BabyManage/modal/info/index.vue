<template>
  <div class="info-content">
    <div class="title">
      <Button
        v-for="(item, index) in selectInfo"
        :key="index"
        :type="item.type"
        @click.native="handleSelect(index)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div class="content" v-show="crtIdx === 0">
      <base-info v-bind="myInfant" />
    </div>
    <div class="content" v-show="crtIdx === 1">
      <parent-info :pList="parents" />
    </div>
  </div>
</template>

<script>
// ? child-components
import BaseInfo from './BaseInfo'
import ParentInfo from './ParentInfo'

export default {
  name: 'InfoContent',
  components: {
    BaseInfo,
    ParentInfo
  },
  data: () => ({
    selectInfo: [
      {
        tag: '基本信息',
        type: 'primary'
      },
      {
        tag: '家长信息',
        type: 'default'
      }
    ],
    crtIdx: 0,
    inputPName: '',
    // ? 获取到的当前的添加列表
    currentList: [],
    myInfant: {}
  }),
  props: {
    infant: {
      type: Object,
      default: () => ({})
    },
    parents: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    parents(newVal) {
      this.setMyParents(newVal)
    }
  },
  computed: {},
  methods: {
    handleSelect(crtIdx) {
      this.crtIdx = crtIdx
      this.selectInfo.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default')
      })
    },
    setMyParents(parents) {
      this.myInfant = {
        parents,
        ...this.infant
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info-content {
  height: 36rem;
  overflow-y: auto;
  .title {
    width: 100%;
    padding: 0.6rem 0;
    .ivu-btn {
      margin: 0 0.6rem;
    }
  }
}
</style>
