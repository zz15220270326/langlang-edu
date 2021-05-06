<template>
  <Querymenu>
    <div slot="first" class="first">
      <Input
        v-model="inputKeyword"
        :placeholder="searchPlaceholder"
        @on-blur="getKeyWord"
      />
    </div>
    <div slot="second" class="second">
      <Button
        v-for="(item, index) in ops"
        :key="index"
        :type="item.type"
        @click.native="handleAll(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="third">
      <Button type="success" @click.native="handleAdd">
        添加工作汇报
        <Icon type="md-add" />
      </Button>
    </div>
  </Querymenu>
</template>

<script>
// ? import components
// ? 1. query-menu
import Querymenu from '@common/query-menu';

export default {
  name: 'WorkReportQueryMenu',
  components: {
    Querymenu
  },
  props: {},
  data: () => ({
    inputKeyword: '',
    ops: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    searchPlaceholder: '请输入标题关键字'
  }),
  methods: {
    getKeyWord() {
      this.$emit('getKeyWord', this.inputKeyword)
    },
    handleAll(btnTag) {
      this.$emit('handleAll', btnTag)
    },
    handleAdd() {
      this.$emit('handleAdd')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-style {
  .ivu-btn {
    margin-left: 0.6rem;
    width: 6rem;
  }
}
.flex-format {
  display: flex;
  justify-content: center;
  align-items: center;
}

.query-menu {
  background-color: #fff;
  color: #666;
  margin-top: 1.2rem;
  width: 100%;
  display: flex;
  .first {
    flex: 1;
    padding: 1.2rem;
    .flex-format;
    .ivu-input-wrapper {
      margin: 0 2rem;
    }
  }
  .second {
    flex: 2;
    margin-top: 1.2rem;
    .btn-style;
  }
  .third {
    flex: 1;
    text-align: right;
    margin: 1.2rem;
    padding-right: 3rem;
    .ivu-btn {
      width: 7.6rem;
    }
  }
}
</style>
