<template>
  <div class="cookbook-info">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <div class="content">
      <Table border :columns="titleList" :data="dataList"></Table>
    </div>
  </div>
</template>

<script>
// ? import components

export default {
  name: 'CookbookInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    titleList: [
      {
        title: '菜肴类型',
        key: 'type',
        width: 100,
        align: 'center'
      },
      {
        title: '周一',
        key: 'day1',
        align: 'center'
      },
      {
        title: '周二',
        key: 'day2',
        align: 'center'
      },
      {
        title: '周三',
        key: 'day3',
        align: 'center'
      },
      {
        title: '周四',
        key: 'day4',
        align: 'center'
      },
      {
        title: '周五',
        key: 'day5',
        align: 'center'
      }
    ]
  }),
  methods: {},
  created() {}
}
</script>

<style lang="less" scoped>
.cookbook-info {
  height: 32rem;
  width: 100%;
  .title {
    margin: 1.2rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #7bcbf4;
    color: #fff;
  }
  .content {
  }
}
</style>
