<template>
  <div class="add-plan">
    <modal-row-item>
      <Tag slot="tag" color="red" size="large">请填写标题:</Tag>
      <Input
        slot="content"
        v-model="inputTitle"
        placeholder="标题内容。。。"
        maxlength="20"
        show-word-limit
      />
    </modal-row-item>
    <modal-row-item>
      <Tag slot="tag" color="blue" size="large">选择班级:</Tag>
      <select-menu
        slot="content"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </modal-row-item>
    <content-editor
      @inputContentChange="inputContentChange"
      :propContent="propContent"
    />
    <btns
      :operations="operations"
      @handleBottomOperations="handleBottomOperations"
    />
  </div>
</template>

<script>
// ? import components
import { SelectMenu } from '@common/select-menu';
import ContentEditor from '@common/content-editor';
import ModalRowItem from '@common/modal-row-item';
import Btns from '@common/modal-bottom-btns';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

// ? import request
import { addWorkSummary, editWorkSummary } from '@/request/plan/5-work-summary';

export default {
  name: 'AddPlan',
  components: {
    SelectMenu,
    ContentEditor,
    ModalRowItem,
    Btns
  },
  mixins: [getClassMixins],
  data: () => ({
    inputTitle: '',
    inputContent: '',
    operations: [
      {
        tag: '确认新建',
        type: 'primary'
      },
      {
        tag: '取消操作',
        type: 'error'
      }
    ]
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    propClassTitle: {
      type: String,
      default: ''
    },
    propClassId: {
      type: String,
      default: ''
    },
    propTitle: {
      type: String,
      default: ''
      // ,required: false
    },
    propContent: {
      type: String,
      default: ''
    }
  },

  watch: {
    propClassTitle(newValue) {
      if (this.classTitle === null || this.classTitle === '') {
        this.classTitle = '';
      } else {
        this.classTitle = newValue;
      }
    },
    propClassId(newValue) {
      this.currentClassId = newValue;
    },
    propTitle(newValue) {
      if (newValue === null || newValue === '') {
        this.inputTitle = `error: 这是脏数据`;
      } else {
        this.inputTitle = newValue;
      }
    },
    propContent(newValue) {
      this.inputContent = newValue;
    }
  },

  methods: {
    inputContentChange(inputContent) {
      this.inputContent = inputContent;
    },
    handleBottomOperations(btnTag) {
      switch (btnTag) {
        case '确认新建':
          if (this.id < 0) {
            this.handleAdd();
          } else {
            this.handleEdit();
          }
          break;
        case '取消操作':
          this.$Message.warning('您取消了本次操作');
          this.$bus.$emit('closeWorkSummaryModals');
          break;
      }
    },
    async handleAdd() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const params = {
          classId: this.currentClassId,
          content: this.inputContent,
          title: this.inputTitle
        };
        const result = await addWorkSummary(params);
        this.checkResult(result);
      }
    },
    async handleEdit() {
      const isChecked = this.checkInput();
      if (isChecked) {
        this.$Message.info('编辑内容');
        const params = {
          id: this.id,
          classId: this.currentClassId,
          content: this.inputContent,
          title: this.inputTitle
        };
        const result = await editWorkSummary(params);
        this.checkResult(result);
      }
    },
    checkInput() {
      if (this.inputTitle === '') {
        this.$Message.warning('填写标题不能为空');
        return false;
      }
      if (this.inputContent === '') {
        this.$Message.warning('填写内容标题不能为空');
        return false;
      }
      return true;
    },
    checkResult(result) {
      if (result.status === 'Success') {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error('操作失败, 请稍后重试');
      }
      this.inputTitle = '';
      this.inputContent = '';
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
.add-plan {
  color: #666;
  height: 32rem;
}
</style>
