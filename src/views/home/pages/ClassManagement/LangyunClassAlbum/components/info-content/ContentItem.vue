<template>
  <div
    class="single-img"
    @mouseenter="singleOpsShow(index)"
    @mouseleave="singleOpsHide(index)"
  >
    <div class="operations" v-show="item.isShow">
      <Button
        v-for="(btn, btnIndex) in item.operations"
        :key="btnIndex"
        :type="btn.type"
        @click.native="handleItemOperations(index, btn.tag)"
      >
        {{ btn.tag }}
      </Button>
    </div>
    <img :src="item.src" alt="" />
    <Checkbox v-model="item.isChecked" @on-change="selectItem">
      选择进行删除
    </Checkbox>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
  data: () => ({
    operations: [
      {
        tag: '关闭会话',
        type: 'default'
      }
    ]
  }),
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    singleOpsShow(crtIdx) {
      this.$emit('singleOpsShow', crtIdx);
    },
    singleOpsHide(crtIdx) {
      this.$emit('singleOpsHide', crtIdx);
    },
    handleItemOperations(itemIdx, btnTag) {
      // this.$emit('handleItemOperations', itemIdx, btnTag);
      switch (btnTag) {
        case '详情':
          this.handleShowAll();
          break;
        case '编辑':
          this.handleEditItem(itemIdx);
          break;
        case '删除':
          this.handleDeleteItem(itemIdx);
          break;
        default:
          break;
      }
    },
    handleShowAll() {
      this.$emit('handleShowAll');
    },
    handleEditItem(crtIdx) {
      this.$emit('handleEditItem', crtIdx);
    },
    handleDeleteItem(crtIdx) {
      this.$Modal.confirm({
        title: '删除内容',
        content: '确认删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          if (crtIdx === this.index) {
            const params = {
              ids: this.item.pId,
              albumId: this.item.albumId
            };
            this.$emit('deleteItem', params);
          }
        }
      });
    },
    selectItem() {
      this.$emit('checkSelectItem');
    }
  }
};
</script>

<style lang="less" scoped>
.single-img {
  float: left;
  width: 25%;
  height: auto;
  text-align: center;
  position: relative;
  img {
    width: 13.2rem;
    height: 10rem;
    padding: 0.8rem 0.3rem;
  }
  .operations {
    position: absolute;
    top: 30%;
    left: 13.8%;
    .ivu-btn {
      margin: 0 0.3rem;
    }
  }
  // padding: 0 0.6rem;
}
</style>
