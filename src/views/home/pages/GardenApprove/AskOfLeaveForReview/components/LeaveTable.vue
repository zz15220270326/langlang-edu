<template>
  <div class="leave-table">
    <Table border :columns="titleList" :data="dataList">
      <template slot-scope="{ row }" slot="holidaySpan">
        <div>开始:{{ row.holidaySpan.start_time }}</div>
        <div>结束:{{ row.holidaySpan.end_time }}</div>
      </template>
      <template slot-scope="{ index }" slot="operations">
        <Button
          v-for="(item, key) in operations"
          :key="key"
          :type="item.type"
          @click.native="handleSelectApprove(index, item.tag)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'LeaveTable',
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    operations: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectApprove(index, tag) {
      this.$emit('handleSelectApprove', index, tag)
    }
  }
}
</script>

<style lang="less" scoped>
.leave-table {
  width: 90%;
  .ivu-btn {
    width: 5.3rem;
  }
}
</style>
