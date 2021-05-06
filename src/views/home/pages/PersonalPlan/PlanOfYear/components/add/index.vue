<template>
  <div class="add-plan">
    <row-item>
      <Tag slot="tag" size="large" color="pink"> 标题: </Tag>
      <select-menu
        slot="content"
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
    </row-item>
    <row-item>
      <Tag slot="tag" size="large" color="orange"> 选择班级: </Tag>
      <select-menu
        slot="content"
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </row-item>
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
import RowItem from '@common/modal-row-item';
import { SelectMenu } from '@common/select-menu';
import ContentEditor from '@common/content-editor';
import Btns from '@common/modal-bottom-btns';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';

// ? import request
import { addAllYearPlan, editYearPlan } from '@/request/plan/4-all-year-plan';

export default {
  name: 'AddPlan',
  components: {
    RowItem,
    SelectMenu,
    ContentEditor,
    Btns
  },
  mixins: [getClassMixins, getYearMixins],
  data: () => ({
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
    propClassId: {
      type: Number || String
    },
    propClassTitle: {
      type: String,
      default: ''
    },
    propYear: {
      type: Number,
      default: -1
    },
    propYearTitle: {
      type: String,
      default: ''
    },
    propContent: {
      type: String,
      default: ''
    }
  },
  watch: {
    propClassId(newValue) {
      if (newValue * 1 > 0) {
        this.currentClassId = newValue;
      }
    },
    propClassTitle(newValue) {
      this.classTitle = newValue;
    },
    propYear(newValue) {
      this.year = newValue;
    },
    propYearTitle(newValue) {
      this.yearTitle = newValue;
    },
    propContent(newValue) {
      this.inputContent = newValue;
    }
  },
  methods: {
    inputContentChange(input) {
      this.inputContent = input;
    },
    handleBottomOperations(btnTag) {
      switch (btnTag) {
        case '发布':
          if (this.id < 0) {
            this.handleAdd();
          } else {
            this.handleEdit();
          }
          break;
        case '取消':
          this.handleClose();
          break;
      }
    },
    async handleAdd() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const params = {
          year: this.year.toString(),
          classId: this.currentClassId,
          content: this.inputContent
        };
        const result = await addAllYearPlan(params);
        this.checkResult(result);
      }
    },
    async handleEdit() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const params = {
          id: this.id.toString(),
          classId: this.currentClassId.toString(),
          content: this.inputContent,
          year: this.year.toString()
        };
        const result = await editYearPlan(params);
        this.checkResult(result);
      }
    },
    handleClose() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      // ! 想设置弹窗 --- 是否保存
      // ? title: '即将离开',
      // ? content: '是否保存',
    },

    checkInput() {
      if (this.yearTitle === '选择学年' || this.yearTitle === '') {
        this.$Message.warning('请先选择学年');
        return false;
      }
      if (this.currentClassId === '') {
        this.$Message.warning('请先选择班级');
        return false;
      }
      if (this.inputContent === '') {
        this.$Message.warning('输入内容不得为空');
        return false;
      }
      return true;
    },
    checkResult(result) {
      if (result.status === 'Success') {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error('操作失败');
      }
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
@import './add.less';
</style>
