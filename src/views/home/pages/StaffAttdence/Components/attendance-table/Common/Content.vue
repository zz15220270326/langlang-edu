<template>
  <div class="content">
    <Table
      ref="currentRowTable"
      :columns="titleList"
      :data="dataList"
      :loading="loading"
      :border="true"
      :size="size"
    />
    <!-- :height="dataList.length > 5 ? 600 : undefined" -->
  </div>
</template>

<script>
export default {
  name: 'TableContent',
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    renderRow(row, index) {
      if (index === 0) {
        return 'render-row';
      }
      return '';
    },
    rowClick() {
      /* @click.native="rowClick" */
      // console.log(this.$refs.currentRowTable.data);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "~@/views/home/index.less";

.content {
  margin-top: 2rem;
  .ivu-table-wrapper > tr > th {
    // background: #fff !important;
    white-space: nowrap !important; // 防止IE等浏览器不支持'max-content'属性 导致内容换行
    background: #fafafa !important;
    color: #000000;
    border-bottom: 0.2rem solid #e8e8e8;
  }

  #common-scroll;
}
</style>
