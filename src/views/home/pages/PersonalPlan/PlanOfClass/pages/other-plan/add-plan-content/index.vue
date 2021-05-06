<template>
  <div class="add-plan">
    <input-title
      @inputTitleChange="handleGetTitle"
      :propTitle="params.title || ''"
    />
    <select-class
      :classTitle="classTitle"
      :classList="classList"
      @selectClass="selectClass"
    />
    <content-editor
      :propContent="params.content || ''"
      @inputContentChange="inputContentChange"
    />
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? import components
// import { SelectMenu } from '@common/select-menu';
import InputTitle from './InputTitle';
import SelectClass from './SelectClass';
import ContentEditor from '@common/content-editor';
import Btns from '@common/modal-bottom-btns';
// ? request
import { addOtherPlan, editOtherPlan } from '@/request/plan/1-class-plan';
// ? utils
import {
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

export default {
  name: 'AddPlanContent',
  components: {
    // SelectMenu,
    InputTitle,
    SelectClass,
    ContentEditor,
    Btns
  },
  mixins: [getClassMixins],
  data: () => ({
    inputTitle: '',
    inputContent: '',
    params: {},
    operations: [
      {
        tag: '确认',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    edits: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    currentClassId(newVal) {
      this.handleGetClassid(newVal);
    },
    id(newVal) {
      this.handleGetId(newVal);
    },
    edits(newVal) {
      this.handleEdits(newVal);
    }
  },
  methods: {
    handleGetTitle(inputTitle) {
      if (inputTitle.length) {
        this.params.title = inputTitle;
      } else delete this.params.title;
    },
    handleGetClassid(classId) {
      if (classId > 0) {
        this.params.classId = classId;
      } else delete this.params.classId;
    },
    inputContentChange(inputContent) {
      if (inputContent.length) {
        this.params.content = inputContent;
      } else delete this.params.content;
    },
    handleGetId() {
      if (this.id > 0) {
        this.params.id = this.id;
      } else delete this.params.id;
    },
    handleEdits(edits = {}) {
      this.params.title = edits.title || '';
      this.currentClassId = parseInt(edits.classId);
      this.classTitle = edits.className || '';
      this.params.content = edits.content || '';
    },
    checkParams(params) {
      if (!params.title) {
        this.$Message.warning('请填写计划标题');
        return false;
      }
      if (!params.classId) {
        this.$Message.warning('请选择班级');
        return false;
      }
      if (!params.content) {
        this.$Message.warning('请填写计划内容');
        return false;
      }
      return true;
    },
    handleOps(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      if (this.checkParams(this.params)) {
        this.$Message.info('提交内容');
        this.confirmSubmit();
      }
    },
    confirmSubmit() {
      this.handleGetId();
      const params = deepCopyObj(this.params);
      const title = this.params.id ? '编辑计划' : '新增计划',
        content = '确认操作';
      this.$Modal.confirm({
        title,
        content,
        onOk: () =>
          !this.params.id ? this.confirmAdd(params) : this.confirmEdit(params)
      });
    },
    async confirmAdd(params) {
      const result = await addOtherPlan(params);
      this.handleResult(result);
    },
    async confirmEdit(params) {
      const result = await editOtherPlan(params);
      this.handleResult(result);
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次回话');
      this.inputTitle = '';
      this.inputContent = '';
      this.$emit('closeModals');
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.add-plan {
  color: #666;
  height: 36rem;
  .bottom {
    padding: 1.2rem 0;
    text-align: center;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
