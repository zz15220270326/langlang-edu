<template>
  <div class="add-new-plan" v-show="isShowAddNewPlan">
    <!-- // ! 输入的方案名称 -->
    <input-plan-name @getPlanName="getPlanName" :propName="propName" />
    <add-body @getChangeTime="getChangeTime" @addToList="addToList" />
    <!-- // ! 输入的方案时间和确认添加的内容 -->
    <div class="bottom">
      <table-content
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
        @handlePlan="handlePlan"
      />
      <btns
        :operations="operations"
        @handleBottomOperations="handleBottomOperations"
      />
    </div>
  </div>
</template>

<script>
// ? import components
import InputPlanName from './InputPlanName';
import AddBody from './SelectPlanTime';
import TableContent from './ShowContent';
import Btns from '@common/modal-bottom-btns';

// ? request
import { setTimePlan, editTimePlan } from '@/request/plan/1-class-plan';
// ? utils
import { handleOpResult } from '@/utils';

export default {
  name: 'AddNewPlan',
  components: {
    InputPlanName,
    AddBody,
    TableContent,
    Btns
  },
  data() {
    return {
      planName: '',
      startTime: '00:00',
      endTime: '01:00',
      titleList: [
        {
          title: '作息时间',
          key: 'time',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operations',
          align: 'center'
        }
      ],
      dataList: [],
      operations: [
        {
          tag: '保存',
          type: 'primary'
        },
        {
          tag: '取消',
          type: 'error'
        }
      ],
      tableIsLoading: false,
      editTimeSpan: ''
    };
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    isShowAddNewPlan: {
      type: Boolean,
      default: true
    },
    propName: {
      type: String,
      default: ''
    },
    propList: {
      // 原时间方案
      type: Array,
      default: () => []
    }
  },
  watch: {
    propName(newValue) {
      if (newValue !== '') {
        this.planName = newValue;
      }
    },
    propList(newValue) {
      if (newValue !== []) {
        this.dataList = newValue;
      }
    }
  },
  methods: {
    // ? 获取数据
    getPlanName(planName) {
      this.planName = planName;
    },
    getChangeTime(timeSpan) {
      const { startTime, endTime } = timeSpan;
      this.startTime = startTime;
      this.endTime = endTime;
    },
    // ? 将数据添加到表格中
    addToList() {
      const isChecked = this.checkTimes(this.startTime, this.endTime);
      if (isChecked) {
        let newPlan = {
          time: `${this.startTime}-${this.endTime}`,
          startTime: this.startTime,
          endTime: this.endTime,
          operations: [
            {
              tag: '编辑',
              type: 'primary'
            },
            {
              tag: '删除',
              type: 'error'
            }
          ]
        };
        const isSame = this.checkRepeat(this.startTime);
        if (!isSame) {
          this.$Message.info('添加到列表');
          this.dataList.push(newPlan);
        }
      }
    },
    checkTimes(startTime, endTime) {
      if (startTime === '' || endTime === '') {
        this.$Message.error('填写时间不能为空');
        return false;
      }
      if (startTime === endTime) {
        this.$Message.error('开始和结束的时间不能相同');
        return false;
      }
      return true;
    },
    checkRepeat(myTime) {
      const isSame = this.dataList.some(item => {
        const startTime = item.time.split('-')[0];
        const startHour = startTime.split(':')[0] * 1;
        return myTime.split(':')[0] * 1 === startHour;
      });
      if (isSame) {
        this.$Message.warning('当前时间重复!');
        return true;
      } else return false;
    },
    // ? 列表操作
    handlePlan(currentIndex, rowIndex) {
      switch (currentIndex) {
        case 0:
          this.$Message.success('编辑');
          this.handleEditItem(rowIndex);
          break;
        case 1:
          // 进行删除操作
          this.handleDeleteItem(rowIndex);
          break;
      }
    },
    handleEditItem(rowIndex) {
      this.$Modal.confirm({
        render: h => this.renderTimePicker(h, rowIndex),
        okText: '确认编辑',
        cancelText: '取消编辑',
        onOk: () => this.confirmEdit(rowIndex),
        onCancel: () => this.cancelEdit()
      });
    },
    renderTimePicker(h, rowIndex) {
      return h('TimePicker', {
        props: {
          format: 'HH:mm',
          type: 'timerange',
          placeholder: `默认: ${this.dataList[rowIndex].time}`
        },
        on: {
          input: input => {
            if (input.length !== 0) {
              this.editTimeSpan = input[0] + '-' + input[1];
            }
          }
        }
      });
    },
    confirmEdit(rowIndex) {
      if (this.editTimeSpan === '' || this.editTimeSpan === '-') {
        this.$Message.error('编辑失败, 编辑内容不能为空');
        return;
      }
      const startTime = this.editTimeSpan.split('-')[0],
        endTime = this.editTimeSpan.split('-')[1];
      if (this.checkTimes(startTime, endTime)) {
        // console.log(startTime.split(':')[0] * 1)
        this.dataList[rowIndex].time = this.editTimeSpan;
        this.dataList[rowIndex].startTime = startTime;
        this.dataList[rowIndex].endTime = endTime;
        this.$Message.success('修改成功');
        this.editTimeSpan = '';
      }
    },
    cancelEdit() {
      this.$Message.info('您取消了编辑');
      this.editTimeSpan = '';
    },
    handleDeleteItem(rowIndex) {
      this.$Modal.confirm({
        title: '删除计划',
        content: '确认删除?',
        onOk: () => {
          this.dataList.splice(rowIndex, 1);
          this.$Message.info('删除成功');
          this.updateSelectTimePlan();
        },
        onCancel: () => {
          this.$Message.info('您取消了本次操作');
        }
      });
    },
    // ? bottom-operations
    handleBottomOperations(btnTag) {
      // console.log(btnTag);
      btnTag === '保存' ? this.savePlan() : this.cancelPlan();
    },
    savePlan() {
      if (this.planName === '') {
        this.$Message.warning('请填写方案名称');
        return;
      }
      if (this.dataList.length === 0) {
        this.$Message.warning('您还没有添加时间');
        return;
      }
      this.$Modal.confirm({
        title: '保存方案',
        content: '是否确认保存此方案?',
        onOk: () => {
          if (this.id < 0) {
            this.handleAdd();
          } else {
            this.handleEdit();
          }
          this.updateSelectTimePlan();
        },
        onCancel: () => this.cancelPlan()
      });
    },
    // ? 将列表的数据添加到db
    async handleAdd() {
      const params = {};
      params.end_time = this.dataList.map(item => item.endTime).toString();
      params.start_time = this.dataList.map(item => item.startTime).toString();
      params.name = this.planName;
      const result = await setTimePlan(params);
      if (handleOpResult(result)) {
        console.log(result);
        this.$Message.success('添加成功');
        this.$bus.$emit('updateAddedPlan');
        this.dataList = [];
      } else {
        this.$Message.error(`添加失败, 原因: ${result.msg}`);
      }
      this.cancelPlan();
    },
    async handleEdit() {
      const params = {
        id: this.id,
        start_time: this.dataList.map(item => item.startTime).toString(),
        end_time: this.dataList.map(item => item.endTime).toString(),
        name: this.planName
      };
      // console.log(params)
      const result = await editTimePlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$bus.$emit('updateAddedPlan');
        this.dataList = [];
      } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
      this.cancelPlan();
    },
    cancelPlan() {
      if (this.propList.length === 0) {
        this.$emit('cancelAddPlan');
      } else {
        this.$emit('cancelEditPlan');
      }
    },
    updateSelectTimePlan() {
      this.$bus.$emit('updateAddedPlan');
    }
  }
};
</script>

<style lang="less" scoped>
.add-new-plan {
  height: 25rem;
  width: 100%;
  overflow-y: auto;
  .bottom {
    margin-top: 1.2rem;
  }
}
</style>
