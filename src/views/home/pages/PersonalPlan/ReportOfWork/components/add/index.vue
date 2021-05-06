<template>
  <div class="add-plan">
    <row-item>
      <Tag slot="tag" size="large" color="red">标题:</Tag>
      <Input slot="content" placeholder="请输入标题内容" v-model="inputTitle" />
    </row-item>
    <content-editor
      :propContent="propContent"
      @inputContentChange="inputContentChange"
    />
    <handle-btns
      :operations="operations"
      @handleBottomOperations="handleBottomOperations"
    />
  </div>
</template>

<script>
// ? import components
import RowItem from '@common/modal-row-item';
import ContentEditor from '@common/content-editor';
import HandleBtns from '@common/modal-bottom-btns';
// ? import request
import { addWorkReport, editWorkReport } from '@/request/plan/6-work-report';

export default {
  name: 'AddPlan',
  components: {
    RowItem,
    ContentEditor,
    HandleBtns
  },
  data: () => ({
    inputTitle: '',
    inputContent: '',
    operations: [
      {
        tag: '发布',
        type: 'primary'
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
    propTitle: {
      type: String,
      default: ''
    },
    propContent: {
      type: String,
      default: ''
    }
  },
  watch: {
    propTitle(newValue) {
      this.inputTitle = newValue;
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
        case '发布':
          if (this.id < 0) {
            this.handleAdd();
          } else {
            this.handleUpdate();
          }
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    async handleAdd() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const params = {
          title: this.inputTitle,
          content: this.inputContent
        };
        const result = await addWorkReport(params);
        this.checkSubmit(result);
      }
    },
    async handleUpdate() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const params = {
          id: this.id,
          title: this.inputTitle,
          content: this.inputContent
        };
        const result = await editWorkReport(params);
        this.checkSubmit(result);
      }
    },
    checkInput() {
      if (this.inputTitle === '') {
        this.$Message.warning('输入的标题不能为空');
        return false;
      }
      if (this.inputContent === '') {
        this.$Message.warning('输入的内容不能为空');
        return false;
      }
      return true;
    },
    checkSubmit(result) {
      if (result.status === 'Success') {
        this.$Message.success(this.id < 0 ? '新建成功' : '更新成功');
        this.$emit('refreshPage', '刷新页面');
      } else {
        this.$Message.error('发布失败');
      }
      this.$bus.$emit('closeWorkReportModals');
    },
    handleCancel() {
      this.$Message.info('您关闭了本次对话');
      this.$bus.$emit('closeWorkReportModals');
    }
  }
};
</script>

<style lang="less" scoped>
.add-plan {
  height: 30rem;
  color: #666;
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
    }
    .editor {
      flex: 7;
    }
  }
}
</style>
