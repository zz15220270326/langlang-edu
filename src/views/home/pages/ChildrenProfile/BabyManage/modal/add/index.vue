<template>
  <!-- v-if="parentList.length > 0" -->
  <div class="add-content">
    <div class="title">
      <Button
        v-for="(item, index) in selectInfo"
        :key="index"
        :type="item.type"
        @click.native="handleSelect(index)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div class="content" v-show="crtIdx === 0">
      <base-info :myInfant="myInfant" @getBaseInfo="getParams" />
    </div>
    <div class="content" v-show="crtIdx === 1">
      <parent-info :eParents="parents" />
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
// ? components
import BaseInfo from './BaseInfo';
import ParentInfo from './ParentInfo';

import Btns from '@common/modal-bottom-btns';

// ? request
import { addInfant, editInfant } from '@/request/children-profile';
// ? utils
import {
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { bmBus } from '../../my-utils';
import { handleCheckParams } from './function';
// ? configs

export default {
  name: 'AddContent',
  components: {
    BaseInfo,
    ParentInfo,
    Btns
  },
  data: () => ({
    selectInfo: [
      {
        tag: '基本信息',
        type: 'primary'
      },
      {
        tag: '家长信息',
        type: 'default'
      }
    ],
    crtIdx: 0,
    // ? edit-infant
    myInfant: {},
    // ? 获取到的当前的添加列表
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    requestParams: {}
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    infant: {
      type: Object,
      default: () => ({})
    },
    parents: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    parents(newVal) {
      this.setMyParents(newVal);
    }
  },
  methods: {
    handleSelect(crtIdx) {
      this.crtIdx = crtIdx;
      this.selectInfo.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    },
    selectClass(selectClass) {
      this.$emit('selectClass', selectClass);
    },
    getParams(params) {
      if (this.id > 0) {
        this.requestParams.id = this.id;
      }
      this.requestParams = Object.assign({}, params);
    },
    setMyParents(parents) {
      this.myInfant = {
        parents,
        ...this.infant
      };
    },
    // ? submit
    handleOp(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    handleSubmit() {
      this.id > 0 ? this.handleEdit() : this.handleAdd();
    },
    handleAdd() {
      const params = deepCopyObj(this.requestParams);
      if (handleCheckParams(params)) {
        console.log(params);
        this.$Modal.confirm({
          title: '添加幼儿',
          content: '确认操作?',
          // onOk: () => this.confirmAdd(JSON.stringify(params))
          onOk: () => this.confirmAdd(params)
        });
      }
    },
    async confirmAdd(params) {
      const result = await addInfant(params);
      this.checkResult(result);
    },
    handleEdit() {
      const params = {
        id: this.id,
        ...this.requestParams
      };
      if (handleCheckParams(params)) {
        console.log(params);
        this.$Modal.confirm({
          title: '编辑幼儿',
          content: '确认操作?',
          onOk: () => this.confirmEdit(params)
        });
      }
    },
    async confirmEdit(params = {}) {
      const result = await editInfant(params);
      this.checkResult(result);
    },
    checkResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success({
          content: `${this.id > 0 ? '编辑' : '添加'}幼儿信息成功`,
          background: true
        });
        this.$emit('refreshPage');
      } else
        this.$Message.error({
          content: `操作失败, 原因: ${result.msg}`,
          background: true
        });
      this.handleClearData();
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您关闭了本次会话');
      this.handleClearData();
      this.$emit('closeModals');
      // *** init
      // Object.assign(this.$data, this.$options.data())
    },
    handleClearData() {
      Object.assign(this.$data, this.$options.data());
      bmBus.$emit('clearInputAndSelect');
    }
  }
};
</script>

<style lang="less" scoped>
.add-content {
  .title {
    background-color: #f6f6f6;
    width: 100%;
    padding: 0.6rem 0;
    .ivu-btn {
      margin: 0 0.6rem;
    }
  }
}
</style>
