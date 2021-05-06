<template>
  <div class="add">
    <row-item>
      <Tag slot="tag" color="orange" size="large"> 请选择学年 </Tag>
      <select-menu
        slot="content"
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
    </row-item>
    <row-item>
      <Tag slot="tag" color="purple" size="large"> 请添加学期 </Tag>
      <select-menu
        slot="content"
        :listTitle="semesterTitle"
        :listItems="semesterList"
        @handleSelect="selectSemester"
      />
    </row-item>
    <row-item>
      <Tag slot="tag" color="blue" size="large"> 请添加班级 </Tag>
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
import './index.less';
// ? import components
import { SelectMenu } from '@common/select-menu';
import ContentEditor from '@common/content-editor';
import RowItem from '@common/modal-row-item';
import Btns from '@common/modal-bottom-btns';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';

// ? request
import {
  addSemesterPlan,
  editSemesterPlan
} from '@/request/plan/2-semester-plan';

// ? utils
// import { htmlToText } from '@/utils';

export default {
  name: 'Add',
  components: {
    SelectMenu,
    ContentEditor,
    RowItem,
    Btns
  },

  mixins: [getClassMixins, getSemesterMixins, getYearMixins],

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
    propYear: {
      type: Number,
      default: 0
    },
    propYearTitle: {
      type: String,
      default: ''
    },
    propSemester: {
      type: Number,
      default: -1
    },
    propSemesterTitle: {
      type: String,
      default: ''
    },
    propClassId: {
      type: String,
      default: ''
    },
    propClassTitle: {
      type: String,
      default: ''
    },
    propContent: {
      type: String,
      default: ''
    }
  },

  watch: {
    propYear(newValue) {
      this.year = newValue;
    },
    propYearTitle(newValue) {
      this.yearTitle = newValue;
    },
    propSemester(newValue) {
      this.semester = newValue;
    },
    propSemesterTitle(newValue) {
      this.semesterTitle = newValue;
    },
    propClassId(newValue) {
      this.currentClassId = newValue;
    },
    propClassTitle(newValue) {
      this.classTitle = newValue;
    }
  },
  computed: {},
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
            this.handleEdit();
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
          year: this.year,
          semester: this.semester,
          classId: this.currentClassId,
          content: this.inputContent
        };
        const result = await addSemesterPlan(params);
        this.checkResult(result);
      }
    },
    async handleEdit() {
      const isChecked = this.checkInput();
      if (isChecked) {
        const { id, year, semester, currentClassId, inputContent } = this;
        const params = {
          id,
          year,
          semester,
          classId: currentClassId,
          content: inputContent
        };
        const result = await editSemesterPlan(params);
        this.checkResult(result);
      }
    },
    handleCancel() {
      this.$Modal.confirm({
        title: '取消操作',
        content: '确认保存内容',
        onOk: () => {
          this.$Message.success('您保存了本次操作内容');
          this.$emit('closeModals');
        },
        onCancel: () => {
          this.$Message.info('您取消了保存');
          this.clearBoth();
          this.$emit('closeModals');
        }
      });
    },
    checkInput() {
      if (this.year === '选择学年') {
        this.$Message.warning('请先选择学年');
        return false;
      }
      if (this.semester === 0) {
        this.$Message.warning('请先添加学期');
        return false;
      }
      if (this.currentClassId === '' || this.currentClassId * 1 < 0) {
        this.$Message.warning('请先添加班级');
        return false;
      }
      if (this.inputContent === '') {
        this.$Message.warning('请输入学期计划内容');
        return false;
      }
      return true;
    },
    checkResult(result) {
      let msg = '';
      if (result.status === 'Success') {
        msg = this.id < 0 ? '新增计划成功' : '编辑计划成功';
        this.$Message.success(msg);
        this.$emit('refreshPage');
      } else {
        msg = '操作失败, 请稍后重试';
        this.$Message.error(msg);
      }
      this.clearBoth();
      this.$emit('closeModals');
    },
    clearBoth() {
      this.year = '选择学年';
      this.yearTitle = '选择学年';
      this.semester = 0;
      this.semesterTitle = '全部学期';
      this.currentClassId = this.classList[0].classId;
      this.classTitle = '全员教师';
      this.inputContent = '';
    }
  }
};
</script>
