<template>
  <div class="op-garden-honor">
    <div class="top">
      <input-content ref="inputRef" />
      <select-avatar ref="avatarRef" />
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? components
import InputContent from './InputContent';
import SelectAvatar from './SelectAvatar';
import Btns from '@common/modal-bottom-btns';
// ? request
import { addHonor, editHonorInfo } from '@/request/system-management';
// ? utils
import {
  // ? times
  dateToMs,
  transformToYMD,
  // ? request
  handleOpResult
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? bus
import ghBus from '../ghBus';

export default {
  name: 'OpGardenHonor',
  components: {
    InputContent,
    SelectAvatar,
    Btns
  },
  data: () => ({
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  computed: {
    ...mapState(['uid'])
  },
  props: {
    id: {
      type: [Number, String],
      default: -1
    },
    propInfos: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    propInfos(newInfos) {
      Object.keys(newInfos).length && this.initEdit(newInfos);
    }
  },
  methods: {
    initEdit(newInfos) {
      ghBus.$emit('initEdit', newInfos);
    },
    handleOps(btnTag) {
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
      const { inputRef, avatarRef } = this.$refs;
      const param1 = {
          title: inputRef.inputs.title,
          remark: inputRef.inputs.remark,
          relatedTime:
            inputRef.inputs.relatedTime !== ''
              ? transformToYMD(dateToMs(inputRef.inputs.relatedTime))
              : ''
        },
        param2 = { pic: avatarRef.img.pId || '' },
        params = Object.assign({}, param1, param2, { uid: this.uid });
      // console.log(params);
      if (this.id > 0) {
        params.id = this.id;
      }
      if (this.checkParams(params)) {
        const title = `${this.id > 0 ? '编辑' : '上传'}园所荣誉`;
        this.$Modal.confirm({
          title,
          content: '确认操作',
          onOk: () =>
            this.id > 0 ? this.confirmEdit(params) : this.confirmAdd(params)
        });
      }
    },
    async confirmAdd(body) {
      const result = await addHonor(body);
      this.handleResult(result);
    },
    async confirmEdit(body) {
      const result = await editHonorInfo(body);
      this.handleResult(result);
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        ghBus.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    checkParams({ title, remark, relatedTime, pic }) {
      if (!title.length || !remark.length || !relatedTime.length) {
        this.$Message.warning('输入内容不得为空');
        return false;
      }
      if (!pic) {
        this.$Message.warning('上传的图片不能为空');
        return false;
      }
      return true;
    },
    closeModals() {
      this.$Message.info('您关闭了本次会话');
      this.$emit('closeModals');
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
.op-garden-honor {
  height: 100/3rem;
  .full_flex();
  flex-direction: column;
  .top {
    flex: 5;
    .full_flex();
  }
  .bottom {
    flex: 2;
    .ivu-btn {
      margin: 0.5rem 1rem;
      width: 6.4rem;
    }
  }
}
</style>
