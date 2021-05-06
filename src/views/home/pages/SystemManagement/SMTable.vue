<template>
  <div class="table-content">
    <Table
      border
      ref="selection"
      :columns="titleList"
      :data="dataList"
      :loading="tableIsLoading"
      @on-select-all="getSelectItem"
      @on-select-all-cancel="getSelectItem"
      @on-select="getSelectItem"
      @on-select-cancel="getSelectItem"
    >
      <template
        v-if="row.machinePlan"
        slot-scope="{ row, index }"
        slot="machinePlan"
      >
        <Button
          class="plan-btn"
          :type="row.machinePlan.type"
          size="default"
          @click.native="handleItemPlan(index)"
        >
          <span>{{ row.machinePlan.tag }}</span>
        </Button>
      </template>
      <template
        v-if="row.openTime || row.openTime === ''"
        slot-scope="{ row, index }"
        slot="openTime"
      >
        <div v-show="row.operation.tag === '编辑'">
          {{ row.openTime }}
        </div>
        <div v-if="row.operation.tag === '确认编辑'">
          <exact-time
            :propTime="row.openTime"
            @handleChangeTime="handleStartTime($event, index)"
          />
        </div>
      </template>
      <template
        v-if="row.closeTime || row.closeTime === ''"
        slot-scope="{ row, index }"
        slot="closeTime"
      >
        <div v-show="row.operation.tag === '编辑'">
          {{ row.closeTime }}
        </div>
        <div v-show="row.operation.tag === '确认编辑'">
          <exact-time
            :propTime="row.closeTime"
            @handleChangeTime="handleEndTime($event, index)"
          />
        </div>
      </template>
      <template
        v-if="row.operation"
        slot-scope="{ row, index }"
        slot="operation"
      >
        <Button
          class="op-btn"
          :type="row.operation.type"
          @click.native="editItem(index, row.operation.tag)"
        >
          <span>{{ row.operation.tag }}</span>
        </Button>
      </template>
      <!-- // ? 视频列表 -->
      <template v-if="row.image" slot-scope="{ row }" slot="image">
        <img :src="row.image" alt="" />
      </template>
      <template
        v-if="row.sort || parseInt(row.sort) >= 0"
        slot="sort"
        slot-scope="{ row, index }"
      >
        <InputNumber
          :value="row.sort"
          :min="0"
          :readonly="false"
          :disabled="false"
          @on-change="handleChangeSort($event, index)"
        ></InputNumber>
      </template>
    </Table>
  </div>
</template>

<script>
// ? import components
import ExactTime from '@common/exact-time';

export default {
  name: 'SMTable',
  components: {
    ExactTime
  },
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
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getSelectItem(selectItem) {
      this.$emit('getSelectItem', selectItem);
    },
    // ? content-functions
    handleItemPlan(index) {
      this.$emit('handleItemPlan', index);
    },
    editItem(index, tag) {
      this.$emit('editItem', index, tag);
    },
    // ? modal-functions
    handleStartTime(startTime, index) {
      this.$emit('handleStartTime', startTime, index);
    },
    handleEndTime(endTime, index) {
      this.$emit('handleEndTime', endTime, index);
    },
    // ? 排序 顺序播放 移出
    handleChangeSort(value, index) {
      this.$emit('handleChangeSort', { value, index })
    }
  },
  mounted() {
    this.$emit('getTable', this.$refs.selection);
  }
};
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 2rem;
  .plan-btn {
    margin: 0 0.5rem;
    width: 6rem;
  }
  .op-btn {
    margin: 0 0.5rem;
    width: 5.4rem;
  }
  img {
    height: 4rem;
    width: 8rem;
  }
}
</style>
