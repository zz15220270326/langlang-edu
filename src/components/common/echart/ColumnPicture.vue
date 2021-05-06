<template>
  <div id="columnPicture" ref="columnPicture" :style="chartStyle"></div>
</template>
<script>
// ? echarts
import echarts from 'echarts';

export default {
  name: 'ColumnPicture',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      option: {}
    };
  },
  props: {
    chartStyle: {
      type: Object,
      default: () => {}
    },
    render: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    render() {
      this.drawLine();
    }
  },

  methods: {
    // ? async function
    // ? 绘制图标要等数据, 是异步方法
    drawLine() {
      setTimeout(() => {
        let columnPicture = echarts.init(this.$refs.columnPicture);
        columnPicture.setOption(this.render);
      }, Math.round(Math.random() * 1000));
    }
  },
  // ? life-hooks
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  }
};
</script>
<style lang="less" scoped></style>
