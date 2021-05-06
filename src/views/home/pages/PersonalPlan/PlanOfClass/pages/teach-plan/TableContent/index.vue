<template>
  <!-- 教学计划表 -->
  <Table
    v-if="teachPlanTitle && teachPlanContent"
    class="teach-plan-table"
    border
    :columns="teachPlanTitle"
    :data="teachPlanContent"
  >
    <!-- 计划类型 -->
    <template slot-scope="{ row, index }" slot="planType">
      <Select
        v-if="row.planType.planTypeInfo.length > 0"
        v-model="row.planType.planTypeTitle"
        :default-label="row.planType.planTypeTitle"
        placement="bottom"
        :transfer="true"
        @on-change="selectPlan($event, index)"
      >
        <Option
          v-for="item in row.planType.planTypeInfo"
          :value="item.info ? item.info : null"
          :key="item.id"
        >
          {{ item.info ? item.info : null }}
        </Option>
      </Select>
    </template>
    <!-- 计划内容 -->
    <template slot-scope="{ row, index }" slot="planContent">
      <Input
        v-model="inputContent"
        maxlength="10"
        :show-word-limit="true"
        placeholder="请添加计划内容"
        @on-blur="handleChange(index)"
      />
    </template>
  </Table>
</template>

<script>
export default {
  name: 'ADD_PLAN_TABLE',
  data: () => ({
    inputContent: ''
  }),
  components: {
    // MyMenu
  },
  props: {
    teachPlanTitle: {
      type: Array,
      default: () => []
    },
    teachPlanContent: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectPlan(currentItem, rowIndex) {
      const params = {
        currentItem,
        rowIndex
      };
      this.$emit('selectPlan', params);
    },
    handleChange(rowIndex) {
      this.$emit('inputContentChange', this.inputContent, rowIndex);
    }
  }
};
</script>

<style lang="less" scoped>
.teach-plan-table {
  margin-top: 2rem;
  .ivu-table-body {
    position: fixed !important;
  }
  // .select-menu {
  // }
}
</style>

<!-- <my-menu
        :listTitle="row.planType.planTypeTitle"
        :listItems="row.planType.planTypeInfo"
        :key="index"
        @handleSelect="selectPlan($event, index)"
      /> -->
