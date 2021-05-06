<template>
  <div class="add-class-time">
    <div class="main-content">
      <div class="class-name">
        <div class="tag">班级名称</div>
        <Input
          class="class-name-input"
          placeholder="请输入班级名称"
          v-model="className"
          @on-change="getClassName"
        />
      </div>
      <div class="start-time">
        <div class="tag">启用日期</div>
        <DatePicker
          class="content"
          type="date"
          v-model="startTime"
          placeholder="Select date"
          @on-change="getStartTime"
        />
      </div>
      <div class="cardtime">
        <div class="tag">上班打卡次数</div>
        <div>
          <RadioGroup
            class="select-cardtime"
            v-model="cardtime"
            @on-change="getCardTime"
          >
            <Radio :label="2">
              2次(早晚上下班打卡，中午不打卡)
            </Radio>
            <Radio :label="4">
              4次(上午、下午上下班都打卡)
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="morning">
        <div class="go-working">
          <div class="tag">上午上班打卡时间</div>
          <TimePicker
            class="content"
            v-model="goAmTime"
            placeholder="上午上班打卡时间"
            :disabled="cardtime === 0"
            format="HH:mm"
            :disabled-hours="[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]"
          />
        </div>
        <div class="leave-working">
          <div class="tag">上午下班打卡时间</div>
          <TimePicker
            class="content"
            v-model="leaveAmTime"
            placeholder="上午下班打卡时间"
            :disabled="cardtime === 0"
            format="HH:mm"
            :disabled-hours="[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]"
          />
        </div>
      </div>
      <div class="afternoon">
        <div class="go-working">
          <div class="tag">下午上班打卡时间</div>
          <!-- cardtime === 2 -->
          <TimePicker
            class="content"
            v-model="goPmTime"
            placeholder="下午上班打卡时间"
            :disabled="cardtime === 0"
            format="HH:mm"
            :disabled-hours="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          />
        </div>
        <div class="leave-working">
          <div class="tag">下午下班打卡时间</div>
          <TimePicker
            class="content"
            v-model="leavePmTime"
            placeholder="下午下班打卡时间"
            :disabled="cardtime === 0"
            format="HH:mm"
            :disabled-hours="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          />
        </div>
      </div>
      <div class="select-weekday">
        <div class="tag">班级周数:</div>
        <CheckboxGroup class="content" v-model="selectWeekDays">
          <Checkbox
            v-for="(item, index) in weekdayList"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </div>
      <btns
        :operations="operations"
        @handleBottomOperations="handleOperations"
      />
    </div>
  </div>
</template>

<script>
// ? import components
import Btns from '@common/modal-bottom-btns';

// ? request
import { addClasses, editClasses } from '@/request/attdance';
// ? utils
import { handleSaveDay } from './my-utils';
import {
  // ? request
  handleOpResult,
  handleErrorCode,
  // ? time
  dateToMs,
  transformToYMD,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'AddClassTime',
  components: {
    // TimeSpan,
    Btns
  },
  data: () => ({
    // ? 班次名称
    className: '',
    // ? 启用时间
    startTime: '',
    // ? 上班打卡次数
    cardtime: 0,
    // ? 上午上下班时间 和 下午上下班时间
    goAmTime: '',
    leaveAmTime: '',
    goPmTime: '',
    leavePmTime: '',
    // ? 选择星期的天数以及星期天数数组
    selectWeekDays: [],
    weekdayList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
    edits: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: Number,
      default: -1
    }
  },
  watch: {
    edits(newValue) {
      this.className = newValue.className;
      this.startTime = newValue.startTime;
      this.cardtime = newValue.cardTime;
      this.goAmTime = newValue.goAmTime;
      this.leaveAmTime = newValue.leaveAmTime;
      this.goPmTime = newValue.goPmTime;
      this.leavePmTime = newValue.leavePmTime;
      this.selectWeekDays = newValue.weekday;

      this.getClassName();
      this.getStartTime();
      this.getCardTime();
      // this.setWorkTime()
      // this.setWeekDay()
    }
  },
  methods: {
    getClassName() {
      if (this.className !== '') {
        this.params.name = this.className;
      } else delete this.params.name;
    },
    getStartTime() {
      if (this.startTime !== '') {
        this.params.start_time = transformToYMD(dateToMs(this.startTime));
      } else delete this.params.start_time;
    },
    getCardTime() {
      // ? 当打卡次数为2时, 删除原有的时间
      // this.removeMiddleTime()
      // ? 给参数赋值
      if (this.cardtime !== 0) {
        this.params.punch_card_time = this.cardtime;
      } else delete this.params.punch_card_time;
    },
    removeMiddleTime() {
      if (this.cardtime === 2) {
        this.leaveAmTime = '';
        this.goPmTime = '';
      }
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    setWorkTime() {
      if (
        this.goAmTime === '' ||
        this.goPmTime === '' ||
        this.leaveAmTime === '' ||
        this.leavePmTime === ''
      ) {
        this.$Message.warning('四个时间段都要进行选择');
        delete this.params.work_time;
        return;
      }
      if (
        this.goAmTime.slice(0, 2) * 1 > this.leaveAmTime.slice(0, 2) * 1 ||
        this.goPmTime.slice(0, 2) * 1 > this.leavePmTime.slice(0, 2) * 1
      ) {
        this.$Message.warning('开始时间不得大于结束时间');
        delete this.params.work_time;
        return;
      }
      this.params.work_time = JSON.stringify({
        AM: {
          start: this.goAmTime,
          end: this.leaveAmTime
        },
        PM: {
          start: this.goPmTime,
          end: this.leavePmTime
        }
      });
    },
    setWeekDay() {
      if (this.selectWeekDays.length !== 0) {
        this.params.weekday = this.selectWeekDays
          .map(item => handleSaveDay(item))
          .toString();
      } else {
        delete this.params.weekday;
      }
    },
    handleSubmit() {
      this.setWorkTime();
      this.setWeekDay();
      const { id } = this,
        type = id > 0 ? 'edit' : 'add',
        params = deepCopyObj({ ...this.params, type });
      if (this.checkParams(params)) {
        this.$Modal.confirm({
          title: this.id > 0 ? '编辑' : '新增',
          content: '确认操作?',
          onOk: () => {
            if (id <= 0) {
              this.$Message.info({ content: '添加', background: true });
              this.handleAdd(params);
            } else {
              this.$Message.info({ content: '编辑', background: true });
              params.id = id;
              this.handleEdit(params);
            }
          }
        });
      }
    },
    async handleAdd(params) {
      const result = await addClasses(params);
      if (handleOpResult(result)) {
        this.$Message.success('添加成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`添加失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.initBoth();
      this.$emit('closeModals');
    },
    async handleEdit(params) {
      console.log(params);
      const result = await editClasses(params);
      // console.log(result)
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`编辑失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.initBoth();
      this.$emit('closeModals');
    },
    checkParams(params) {
      if (!params.name) {
        this.$Message.warning('请输出班次名称');
        return false;
      }
      if (!params.start_time) {
        this.$Message.warning('请输出班次启动时间');
        return false;
      }
      if (!params.punch_card_time || params.punch_card_time === 0) {
        this.$Message.warning('请选择班次打卡次数');
        return false;
      }
      if (!params.work_time) {
        return false;
      }
      if (!params.weekday) {
        this.$Message.warning('班次每周需打卡日');
        return false;
      }
      return true;
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      this.initBoth();
    },
    initBoth() {
      this.className = '';
      this.startTime = '';
      this.cardtime = 0;
      this.goAmTime = '';
      this.leaveAmTime = '';
      this.goPmTime = '';
      this.leavePmTime = '';
      this.selectWeekDays = [];
      this.params = {};
    }
  }
};
</script>

<style lang="less" scoped>
@import './ADD_CLASS_TIME/addClassTime.less';
</style>
