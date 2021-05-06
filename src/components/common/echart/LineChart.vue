<template>
  <div id="line" ref="line" :style="chartStyle"></div>
</template>

<script>
// ? echarts
import echarts from 'echarts';

export default {
  name: 'LineChart',

  components: {},

  data: () => ({}),

  props: {
    chartStyle: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    option(newOption) {
      const line = echarts.init(this.$refs.line)
      line.setOption(newOption)
      this.$Message.success('刷新成功')
    }
  },

  methods: {
    drawLine() {
      const line = echarts.init(this.$refs.line)
      line.setOption(this.option)
    }
  },
  /**
   * ! life-hooks
   */
  mounted() {
    this.drawLine()
  }
}
</script>

<style lang="less" scoped></style>
