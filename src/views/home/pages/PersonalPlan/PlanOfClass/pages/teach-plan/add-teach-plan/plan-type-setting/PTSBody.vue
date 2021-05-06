<template>
  <div class="body">
    <Table
      border
      :columns="titleList"
      :data="dataList"
      :loading="tableIsLoading"
    >
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, key) in row.operations"
          :key="key"
          :type="item.type"
          @click.native="handleType(index, item.type)"
          :disabled="key === 1 && !row.ableDelete"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'PTSBody',

  components: {},

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

  computed: {},

  methods: {
    handleType(itemIndex, btnType) {
      this.$emit('handleType', itemIndex, btnType)
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  height: 60%;
  width: 100%;
  padding-top: 16rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .ivu-btn {
    margin: 0 0.6rem;
  }
}
</style>
