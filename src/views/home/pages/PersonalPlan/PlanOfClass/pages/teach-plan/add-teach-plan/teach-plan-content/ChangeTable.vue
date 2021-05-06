<template>
  <div class="change-teach-plan-content">
    <Table :border="true" :columns="columns" :data="data" width="1080">
      <template slot="type" slot-scope="{ row, index }">
        <Select
          :value="row.type"
          :transfer="true"
          @on-select="handleSelectItemType($event, index)"
        >
          <Option
            v-for="type of typeList"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </Option>
        </Select>
      </template>
      <template slot="class" slot-scope="{ row }">
        <Input :value="row.class" />
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'ChangeTeachPlanContent',
  data: () => ({}),
  props: {
    columns: {
      type: Array,
      default: () => [
        {
          title: '计划时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '计划类型',
          slot: 'type',
          align: 'center'
        },
        {
          title: '计划内容',
          slot: 'class',
          align: 'center'
        }
      ]
    },
    data: Array,
    typeList: {
      type: Array,
      default: () => [
        {
          value: 'type1',
          label: '类型1'
        },
        {
          value: 'type2',
          label: '类型2'
        },
        {
          value: 'type3',
          label: '类型3'
        }
      ]
    }
  },
  computed: {},
  methods: {
    handleSelectItemType(item, index) {
      this.$emit('handleSelectItemType', { item, index });
    }
  }
};
</script>

<style lang="less" scoped>
.change-teach-plan-content {
  margin: 1.2rem 0;
  width: 100%;
  position: relative;
  left: 2rem;
}
</style>
