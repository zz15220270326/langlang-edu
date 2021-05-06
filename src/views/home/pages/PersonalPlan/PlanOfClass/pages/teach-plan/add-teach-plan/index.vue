<template>
  <!-- 新建教学计划的表格 -->
  <div class="add-teach-plan">
    <div class="top">
      <!-- 左上菜单 -->
      <div class="left-top">
        <left-selects
          @handleUploadYear="handleUploadYear"
          @uploadSemester="uploadSemester"
          @uploadWeekTime="uploadWeekTime"
          @getClassId="getClassId"
          @selectTitle="getTimePlan"
        />
      </div>
      <!-- 右上菜单 -->
      <case-settings
        :modalButtonGroup="modalButtonGroup"
        :setPlanList="setPlanList"
        @settingPlanType="settingPlanType"
        @selectPlanListItem="selectPlanListItem"
      />
    </div>
    <main-content @getContent="getContent" />
    <!--//!!! 设置时间方案 (拆组件) -->
    <btns
      :operations="operations"
      @handleBottomOperations="handleBottomOperations"
    />
    <!-- 三个默认不显示的弹窗: AddNewPlan AddedPlan PlanTypeSetting -->
    <Modal
      v-model="isShowChildModal"
      :title="childModalTitle"
      class="add-new-plan"
      :transfer="false"
      width="800"
      :footer-hide="true"
    >
      <add-new-plan
        :isShowAddNewPlan="isShowAddNewPlan"
        @cancelAddPlan="cancelAddPlan"
      />
      <added-plan :isShowAddedPlan="isShowAddedPlan" />
      <plan-type-setting
        :isShowPlanTypeSetting="isShowPlanTypeSetting"
        @cancelPTS="cancelPTS"
      />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? import components
import LeftSelects from './left-selects';
import CaseSettings from './set-plan';
import MainContent from './set-work-plan';
import Btns from '@common/modal-bottom-btns';

import AddNewPlan from './add-new-plan';
import AddedPlan from './added-plan';
import PlanTypeSetting from './plan-type-setting';

// ? request
import {
  addClassWeekPlan,
  putClassWeekPlan
} from '@/request/plan/1-class-plan';
// ? utils
import { handleOpResult } from '@/utils';
import {
  noonList,
  postYear,
  postSemester,
  postWeek,
  postClassId,
  postTitle
} from './util';
// ? import mixins

export default {
  name: 'AddTeachPlan',
  components: {
    // ? child-components
    LeftSelects,
    CaseSettings,
    MainContent,
    Btns,

    AddNewPlan,
    AddedPlan,
    PlanTypeSetting
  },
  props: {
    id: {
      type: [Number, String],
      default: -1
    },
    edits: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    edits(newVal) {
      Object.keys(newVal).length && this.initEditInfo(newVal);
    }
  },
  data: () => ({
    modalButtonGroup: [
      {
        tag: '时间方案设置',
        type: 'warning'
      },
      {
        tag: '计划类型设置',
        type: 'success'
      }
    ],
    setPlanList: [
      {
        info: '添加方案',
        key: 0
      },
      {
        info: '已添加方案',
        key: 1
      }
    ],
    // ? modal-data
    isShowAddNewPlan: false,
    isShowAddedPlan: false,
    isShowPlanTypeSetting: false,
    isShowChildModal: false,
    childModalTitle: '',
    // ? table-data
    weekIndex: 0,
    noonIndex: 0,
    titleList: [
      {
        title: '计划时间',
        key: 'planTime',
        align: 'center'
      },
      {
        title: '计划类型',
        slot: 'planType',
        align: 'center'
      },
      {
        title: '计划内容',
        slot: 'planContent',
        align: 'center'
      }
    ],
    planSettings: [
      {
        tag: '周一',
        type: 'primary',
        noonList
      },
      {
        tag: '周二',
        type: 'info',
        noonList
      },
      {
        tag: '周三',
        type: 'info',
        noonList
      },
      {
        tag: '周四',
        type: 'info',
        noonList
      },
      {
        tag: '周五',
        type: 'info',
        noonList
      }
    ],
    // ? postData
    requestParams: {
      year: postYear,
      semester: postSemester,
      week: postWeek,
      classId: postClassId,
      title: postTitle,
      content: ''
    },
    operations: [
      {
        tag: '提交',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  methods: {
    //** 最新添加, 获取编辑内容 **//
    initEditInfo({ id, year, semester, week, classId, title, content }) {
      this.requestParams = {
        id,
        year,
        semester,
        week,
        classId,
        title,
        content: JSON.stringify(content)
      };
    },
    // ? selects
    selectPlanListItem(key) {
      // ? 判断key值
      /* 
      ! 0: 添加方案弹窗   1: 已添加方案弹窗
      */
      switch (key) {
        case 0:
          this.isShowChildModal = true;
          this.childModalTitle = '添加方案';
          this.isShowAddNewPlan = true;
          this.isShowAddedPlan = false;
          this.isShowPlanTypeSetting = false;
          break;
        case 1:
          this.isShowChildModal = true;
          this.childModalTitle = '已添加方案';
          this.isShowAddNewPlan = false;
          this.isShowAddedPlan = true;
          this.isShowPlanTypeSetting = false;
          break;
      }
    },
    settingPlanType(currentIndex) {
      if (currentIndex === 1) {
        this.isShowChildModal = true;
        this.childModalTitle = '计划类型设置';
        this.isShowAddNewPlan = false;
        this.isShowAddedPlan = false;
        this.isShowPlanTypeSetting = true;
      }
    },
    cancelAddPlan() {
      this.isShowChildModal = false;
    },
    cancelPTS() {
      this.isShowPlanTypeSetting = false;
      this.cancelAddPlan();
    },
    // ? contents
    // ? content functions
    selectWorkDay(currentIndex) {
      this.planSettings.forEach((item, index) => {
        if (index === currentIndex) {
          item.type = 'primary';
        } else {
          item.type = 'info';
        }
      });
    },
    selectNoon(index1, index2) {
      this.planSettings[index1].noonList.forEach((item, index) => {
        if (index === index2) {
          item.type = 'primary';
        } else {
          item.type = 'default';
        }
      });
    },
    selectPlan(items, index1, index2) {
      const { currentItem, rowIndex } = items;
      if (index2 === 0) {
        this.planSettings.map((item1, key1) => {
          if (key1 === index1) {
            item1.list1.map((item2, key2) => {
              if (key2 === rowIndex) {
                item2.planType['planTypeTitle'] = currentItem;
                // console.log(item2.planType['planTypeTitle'])
                // console.log(this.planSettings[3].list1[0], 3)
              }
            });
          }
        });
      }
      if (index2 === 1) {
        this.planSettings[index1].list2[
          rowIndex
        ].planType.planTitle = currentItem;
      }
    },
    getInput(value, rowIndex, weekIndex, noonIndex) {
      // console.log(value, rowIndex, weekIndex, noonIndex)
      if (noonIndex === 0) {
        this.planSettings[weekIndex].list1[rowIndex].inputContent = value;
      }
      if (noonIndex === 1) {
        this.planSettings[weekIndex].list2[rowIndex].inputContent = value;
      }
    },
    // ? POST_REQUEST
    handleBottomOperations(btnTag) {
      switch (btnTag) {
        case '提交':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModal();
          break;
      }
    },
    // ?? 请求前准备数据
    handleUploadYear(year) {
      this.requestParams.year = year;
    },
    uploadSemester(semester) {
      this.requestParams.semester = semester;
    },
    uploadWeekTime(week) {
      this.requestParams.week = week;
    },
    getClassId(classId) {
      this.requestParams.classId = classId;
    },
    getTimePlan() {
      this.$bus.$on('emitSelectPlanId', planId => {
        this.requestParams.title = planId;
      });
    },
    getContent(postData) {
      this.requestParams.content = JSON.stringify(postData);
    },
    handleSubmit() {
      console.log(this.id);
      this.id <= 0 ? this.handleAdd() : this.handleConfirmEdit();
    },
    handleAdd() {
      if (!this.requestParams.content.length) {
        this.$Message.warning('添加的内容不能为空');
        return;
      }
      this.$Modal.confirm({
        title: '添加方案',
        content: '您确认要添加吗',
        onOk: () => this.confirmAdd()
      });
    },
    async confirmAdd() {
      const result = await addClassWeekPlan(this.requestParams);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.$bus.$emit('refreshAddTeachPlan');
        this.$bus.$emit('refreshTeachPlanPage');
      } else {
        this.$Message.error('添加失败, 请稍后重试');
      }
      this.$emit('closeAddModal');
    },
    handleConfirmEdit() {
      this.$Modal.confirm({
        title: '编辑方案',
        content: '确认操作?',
        onOk: () => {
          const params = {
            id: this.id,
            ...this.requestParams
          };
          this.confirmEdit(params);
        }
      });
    },
    async confirmEdit(params) {
      console.log(params);
      const result = await putClassWeekPlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$bus.$emit('refreshAddTeachPlan');
        this.$bus.$emit('refreshTeachPlanPage');
      } else {
        this.$Message.error('添加失败, 请稍后重试');
      }
      this.$emit('closeAddModal');
    },
    closeModal() {
      this.$Message.info('您关闭了本次操作');
      this.$emit('closeAddModal');
    }
  },
  /**
   * @description
   * * Vue2.x life-hooks
   */
  mounted() {
    this.getTimePlan();
  }
};
</script>
