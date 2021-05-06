<template>
  <div v-if="propOption" id="cookie" ref="cookie" :style="chartStyle"></div>
  <!-- v-if="Object.keys(propOption).length > 0" -->
</template>

<script>
// ? echarts
import echarts from 'echarts';

export default {
  name: 'CookiePicture',

  components: {},

  data: () => ({
    // ? 饼状图的配置
    option: {},
    chartStyle: {
      width: '30rem',
      height: '20rem'
    }
  }),

  props: {
    propOption: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    propOption(newVal) {
      const cookie = echarts.init(this.$refs.cookie)
      // console.log(cookie)
      cookie.setOption(newVal)
      // this.$Message.success('刷新成功')
    }
  },

  methods: {
    drawLine() {
      // const cookie = echarts.init(this.$refs.cookie)
      // cookie.setOption(this.propOption)
      setTimeout(() => {
        const cookie = echarts.init(this.$refs.cookie)
        cookie.setOption(this.propOption)
      }, 800)
    }
  },

  /**
   * ! life-hooks
   */
  created() {
    this.drawLine()
  },
  mounted() {}
}
</script>

<style lang="less" scoped></style>
