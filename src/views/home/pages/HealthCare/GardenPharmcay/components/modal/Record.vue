<template>
  <div class="record" v-if="dataList.length > 0">
    <Table border :columns="titleList" :data="dataList" />
  </div>
</template>

<script>
export default {
  name: 'Record',
  data: () => ({
    titleList: [
      {
        title: '服药时间',
        key: 'createTime',
        align: 'center'
      },
      {
        title: '服药老师',
        key: 'realname',
        align: 'center'
      },
      {
        title: '备注',
        key: 'comment',
        align: 'center'
      }
    ]
  }),
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  created() {},
  updated() {}
}
</script>

<style lang="less" scoped>
.record {
  height: 28rem;
  width: 100%;
  .ivu-table-wrapper /deep/ {
    margin-top: 3rem;
  }
}
</style>
