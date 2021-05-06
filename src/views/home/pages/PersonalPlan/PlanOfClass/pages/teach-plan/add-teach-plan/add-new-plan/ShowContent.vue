<template>
  <Table border :columns="titleList" :data="dataList" :loading="tableIsLoading">
    <template slot-scope="{ row, index }" slot="operations">
      <Button
        v-for="(item, key) in row.operations"
        :key="key"
        :type="item.type"
        @click.native="handlePlan(key, index)"
      >
        {{ item.tag }}
      </Button>
    </template>
  </Table>
</template>

<script>
export default {
  name: 'ShowContent',
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    tableIsLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePlan(btnIndex, itemIndex) {
      this.$emit('handlePlan', btnIndex, itemIndex);
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-btn {
  margin: 0.5rem 0.6rem;
}
</style>
