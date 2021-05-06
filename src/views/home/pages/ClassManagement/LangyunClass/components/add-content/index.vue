<template>
  <div class="add-content">
    <div class="add-item">
      <div class="tag">
        <Tag color="blue" size="large">班级名称</Tag>
      </div>
      <div class="content">
        <Input v-model="className" placeholder="输入班级名称" />
      </div>
    </div>
    <div class="add-item">
      <div class="tag">
        <Tag color="green" size="large">班级人数</Tag>
      </div>
      <div class="content">
        <InputNumber v-model="childrenCount" :min="0" :max="100" />
      </div>
    </div>
    <div class="add-item">
      <div class="tag">
        <Tag color="pink" size="large">开学日期</Tag>
      </div>
      <div class="content">
        <DatePicker v-model="entryTime" placeholder="选择开学日期" />
      </div>
    </div>
    <div class="add-item">
      <div class="tag">
        <Tag color="orange" size="large">选择年级</Tag>
      </div>
      <div class="content">
        <long-select
          :propIndex="currentGrade"
          :propList="gradeList"
          @handleSelect="selectGrade"
        />
      </div>
    </div>
    <div class="add-item">
      <div class="tag">
        <Tag color="lime" size="large">选择老师</Tag>
      </div>
      <div
        class="content"
        v-select="{ isSelectAll, set: this, teacher, teacherList }"
      >
        <Select v-model="teacher" :multiple="true">
          <Option v-for="t of teacherList" :key="t.id" :value="t.id">
            {{ t.info }}
          </Option>
        </Select>
        <Button @click.native="handleSelectAll" />
      </div>
    </div>
    <div class="add-item">
      <div class="tag">
        <Tag color="gold" size="large">班级口号</Tag>
      </div>
      <div class="content">
        <Input
          v-model="slogan"
          placeholder="请填写班级口号"
          type="textarea"
          :rows="3"
          maxlength="20"
          show-word-limit
        />
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
import './index.less';
// ? import components
import { LongSelect } from '@common/select-menu';
import Btns from '@common/modal-bottom-btns';
// ? directives
import select from './select';

// ? request
import { addClassInfo, editClassInfo } from '@/request/class-management';
// ? utils
import {
  // ? time
  transformToYMD,
  // ? request
  handleOpResult
} from '@/utils';
import { checkSubmitInfos, getGradeByName } from '../../function';

// ? import mixins
import gradeMixins from '@/mixins/Common/gradeMixins';
import teacherMixins from '@/mixins/Common/teacherMixins';

export default {
  name: 'AddContent',
  components: {
    LongSelect,
    Btns
  },
  mixins: [gradeMixins, teacherMixins],
  directives: { select },
  data: () => ({
    className: '',
    childrenCount: 0,
    entryTime: '', // .grade.
    teacher: [],
    slogan: '',
    isSelectAll: false,
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
    edits(newVal) {
      this.setContent(newVal);
    }
  },
  methods: {
    setContent(edits) {
      this.className = edits.className;
      this.childrenCount = edits.infantNum;
      this.entryTime = edits.entryTime;
      this.currentGrade = getGradeByName(edits.grade);
      this.slogan = edits.slogan;
      const { teachers } = edits;
      teachers.length && this.initEditTeacher(teachers.split('，'));
    },
    initEditTeacher(list = []) {
      const teacher = [];
      list.forEach(tn => {
        this.teacherList.forEach(t => {
          if (t.info === tn) {
            teacher.push(t.id);
          }
        });
      });
      this.teacher = teacher;
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
      }
    },
    handleSelectAll() {
      switch (this.isSelectAll) {
        case true:
          this.teacher = [];
          break;
        case false:
          this.teacher = this.teacherList.map(t => t.id);
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      if (checkSubmitInfos(this)) {
        const params = {
          class_name: this.className,
          grade: this.currentGrade,
          teacher_ids: this.teacher.toString()
        };
        this.id > 0 ? (params.id = this.id) : delete params.id;
        this.entryTime !== '' &&
          Object.defineProperty(params, 'entrance_date', {
            value: transformToYMD(this.entryTime),
            enumerable: true
          });
        this.childrenCount > 0 &&
          Object.defineProperty(params, 'infant_num', {
            value: this.childrenCount,
            enumerable: true
          });
        this.slogan.length &&
          Object.defineProperty(params, 'slogan', {
            value: this.slogan,
            enumerable: true
          });
        console.log(params);
        this.id > 0 ? this.handleEdit(params) : this.handleAdd(params);
      }
    },
    handleAdd(params) {
      this.$Modal.confirm({
        title: '添加',
        content: '确认操作',
        onOk: async () => {
          const result = await addClassInfo(params);
          this.handleRes(result);
        }
      });
    },
    handleEdit(params) {
      this.$Modal.confirm({
        title: '编辑',
        content: '确认操作',
        onOk: async () => {
          const result = await editClassInfo(params);
          this.handleRes(result);
        }
      });
    },
    handleRes(result) {
      if (handleOpResult(result)) {
        this.$Message.success(this.id > 0 ? '编辑成功' : '添加成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您关闭了本次会话');
      this.$emit('closeModals');
    }
  }
};
</script>
