<template>
  <div class="header">
    <div class="left">
      <Tag color="lime" size="large">计划类型</Tag>
    </div>
    <div class="middle">
      <Input
        placeholder="请输入类型名称"
        v-model="typeName"
        @on-blur="getTypeName"
      />
    </div>
    <div class="right">
      <Button type="success" @click.native="addToList">
        添加至列表
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PTSHeader',
  data: () => ({
    typeName: ''
  }),
  methods: {
    getTypeName() {
      this.$emit('getTypeName', this.typeName);
    },
    addToList() {
      this.$emit('addToList');
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    flex: 1;
    text-align: center;
    span {
      margin-right: 3rem;
      color: #999;
      font-size: 1rem;
    }
  }
  .middle {
    flex: 2;
  }
  .right {
    flex: 1;
    .ivu-btn {
      width: 6.5rem;
      margin-left: 2.4rem;
    }
  }
}
</style>
