<template>
  <Select
    class="select-menu"
    v-model="selectItem"
    style="width:200px"
    v-if="renderList.length > 0"
    @on-change="getSelect"
  >
    <OptionGroup
      v-for="(itm1, idx1) of renderList"
      :key="(idx1 + 1) + itm1.label"
      :label="itm1.label"
    >
      <Option v-for="itm2 of itm1.list" :key="itm2.id" :value="itm2.id">
        {{ itm2.info ? itm2.info : '' }}
      </Option>
    </OptionGroup>
  </Select>
</template>

<script>
export default {
  data() {
    return {
      selectItem: ''
    };
  },
  props: {
    renderList: {
      type: Array,
      default: () => [
        {
          label: '类别名称',
          list: [
            {
              info: '标签1',
              id: 1
            },
            {
              info: '标签2',
              id: 2
            },
            {
              info: '标签3',
              id: 3
            }
          ]
        }
      ]
    }
  },
  methods: {
    getSelect(item) {
      let totalList = [];
      this.renderList.forEach(item1 =>
        item1.list.forEach(item2 => totalList.push(item2))
      );
      const label = totalList.find(item3 => item3.id === item).info;
      this.$emit('getSelect', item, label);
    }
  }
};
</script>

<style lang="less" scoped></style>
