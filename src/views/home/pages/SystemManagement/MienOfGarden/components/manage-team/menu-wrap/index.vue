<template>
  <div class="menu-wrap">
    <querymenu>
      <div slot="first" class="op1">
        <Button type="info" @click.native="handleSelectAll">
          {{ selectAllText }}
        </Button>
        <Button type="error" @click.native="handleSelectDelete">删除</Button>
      </div>
      <div slot="second" class="op2">
        <Button type="success" @click.native="handleAddModal">
          创建管理团队
        </Button>
      </div>
    </querymenu>
    <Modal
      title="创建管理团队"
      v-model="isShowAddModal"
      width="850"
      :footer-hide="true"
    >
      <add-content @closeModals="closeModals" />
    </Modal>
  </div>
</template>

<script>
// ? components
import Querymenu from '@common/query-menu';

import AddContent from '../manage-team';
// ? bus
import mtBus from '../mtBus';

export default {
  name: 'ManageTeamMenu',
  components: {
    Querymenu,

    AddContent
  },
  data: () => ({
    isShowAddModal: false
  }),
  props: {
    selectAllText: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSelectAll() {
      this.$emit('handleSelectAll');
    },
    handleSelectDelete() {
      mtBus.$emit('handleDeleteItems');
    },
    handleAddModal() {
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
