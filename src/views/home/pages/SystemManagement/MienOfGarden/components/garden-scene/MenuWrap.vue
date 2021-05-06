<template>
  <div class="menu-wrapper">
    <querymenu>
      <div slot="first" class="op1">
        <Button type="info" @click.native="handleSelectAll">
          {{ selectAllText }}
        </Button>
        <Button type="error" @click.native="deleteItems">删除</Button>
      </div>
      <div slot="second" class="op2">
        <Button type="success" @click.native="handleUpload">上传图片</Button>
      </div>
    </querymenu>
    <Modal
      title="上传图片"
      v-model="isShowUpload"
      width="960"
      :footer-hide="true"
    >
      <upload-content @closeModals="closeModals" />
    </Modal>
  </div>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';

import UploadContent from './UploadContent';
// ? bus
import menuBus from './menuBus';

export default {
  name: 'AppearanceMenu',
  components: { Querymenu, UploadContent },
  data: () => ({
    isShowUpload: false
  }),
  props: {
    selectAllText: {
      type: String,
      default: '全选'
    }
  },
  methods: {
    handleSelectAll() {
      this.$emit('handleSelectAll');
    },
    deleteItems() {
      menuBus.$emit('deleteItems');
    },
    handleUpload() {
      this.isShowUpload = true;
    },
    closeModals() {
      this.isShowUpload = false;
    }
  }
};
</script>

<style lang="less" scoped>
.btn-style {
  .ivu-btn {
    margin: 0 0.8rem;
    width: 6rem;
  }
}
.query-menu {
  margin-top: 1.2rem;
  width: 100%;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .op1 {
    flex: 1;
    .btn-style;
  }
  .op2 {
    flex: 3;
    text-align: right;
    margin-right: 3rem;
    .btn-style;
  }
}
</style>
