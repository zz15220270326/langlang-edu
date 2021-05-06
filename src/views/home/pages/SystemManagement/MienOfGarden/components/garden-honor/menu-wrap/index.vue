<template>
  <div class="menu-wrap">
    <querymenu>
      <div slot="first" class="op1">
        <Button type="info" @click.native="handleSelectAll">
          {{ selectAllText }}
        </Button>
        <Button type="error" @click.native="handleDeleteItems">删除</Button>
      </div>
      <div slot="second" class="op2">
        <Button type="success" @click.native="handleAdd">
          上传荣誉
        </Button>
      </div>
    </querymenu>
    <Modal
      title="上传园所荣誉"
      v-model="isShowAddModal"
      width="920"
      :footer-hide="true"
    >
      <add-honor @closeModals="closeModals" />
    </Modal>
  </div>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';

import AddHonor from '../change-honor';
// ? bus
import ghBus from '../ghBus';

export default {
  name: 'GardenHonorMenu',
  components: {
    Querymenu,

    AddHonor
  },
  data: () => ({
    // ? modals
    isShowAddModal: false
  }),
  props: {
    selectAllText: {
      type: String,
      default: ''
    }
  },
  computed: {},
  methods: {
    handleSelectAll() {
      this.$emit('handleSelectAll');
    },
    handleDeleteItems() {
      ghBus.$emit('deleteItems');
    },
    handleAdd() {
      this.$Message.info('新增');
      this.isShowAddModal = true;
    },
    closeModals() {
      this.isShowAddModal = false;
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-style {
  .ivu-btn {
    margin: 0 0.8rem;
    width: 6rem;
  }
}
.query-menu {
  margin-top: 1.2rem;
  padding: 1.2rem;
  .full_flex();
  .op1 {
    flex: 1;
    .btn-style;
  }
  .op2 {
    flex: 3;
    text-align: right;
    margin-right: 2rem;
    .btn-style;
    .ivu-btn {
      width: 7.2rem;
    }
  }
}
</style>
