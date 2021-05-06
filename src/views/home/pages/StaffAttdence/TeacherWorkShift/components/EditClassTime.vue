<template>
  <div class="add-class-time">
    <div class="main-content">
      <div class="class-name">
        <div class="tag">班级名称</div>
        <Input
          class="class-name-input"
          placeholder="请输入班级名称"
          v-model="className"
        />
      </div>
      <div class="start-time">
        <div class="tag">启用日期</div>
        <DatePicker placeholder="请选择启用日期" />
      </div>
      <div class="cardtime">
        <div class="tag">上班打卡次数</div>
        <div>
          <RadioGroup class="select-cardtime" v-model="cardtime">
            <Radio label="2次"></Radio>
            <Radio label="4次"></Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="morning">
        <div class="go-working">
          <div class="go-working-span">上午上班打卡时间</div>
          <exact-time class="time-span" @handleChangeTime="getGoMorningTime" />
        </div>
        <div class="leave-working">
          <div class="leave-working-span">上午下班打卡时间</div>
          <exact-time
            class="time-span"
            @handleChangeTime="getLeaveMorningTime"
          />
        </div>
      </div>
      <div class="afternoon">
        <div class="go-working">
          <div class="go-working-span">下午上班打卡时间</div>
          <exact-time
            class="time-span"
            @handleChangeTime="getGoAfternoonTime"
          />
        </div>
        <div class="leave-working">
          <div class="leave-working-span">下午下班打卡时间</div>
          <exact-time
            class="time-span"
            @handleChangeTime="getLeaveAfternoonTime"
          />
        </div>
      </div>
      <div class="select-weekday">
        <div class="select-weekdays-span">班级周数:</div>
        <CheckboxGroup class="weekdays-checkbox" v-model="selectWeekDays">
          <Checkbox
            v-for="(item, index) in weekdayList"
            :key="index"
            :label="item"
          />
        </CheckboxGroup>
      </div>
    </div>
  </div>
</template>

<script>
// ? import components
// import TimeSpan from'@common/time-span';
import ExactTime from '@common/exact-time';

export default {
  name: 'EditClassTime',
  components: {
    ExactTime
  },
  data: () => ({
    // ? 班次名称
    className: '',
    // ? 启用时间
    startTime: '',
    // ? 上班打卡次数
    cardtime: '',
    // ? 上午上下班时间 和 下午上下班时间
    goMorningTime: '',
    leaveMorningTime: '',
    goAfternoonTime: '',
    leaveAfternoonTime: '',
    // ? 选择星期的天数以及星期天数数组
    selectWeekDays: [],
    weekdayList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  }),
  methods: {
    getGoMorningTime(timeSpan) {
      this.goMorningTime = timeSpan;
    },
    getLeaveMorningTime(timeSpan) {
      this.leaveMorningTime = timeSpan;
    },
    getGoAfternoonTime(timeSpan) {
      this.goAfternoonTime = timeSpan;
    },
    getLeaveAfternoonTime(timeSpan) {
      this.leaveAfternoonTime = timeSpan;
    },
    getStartTime(pickDate) {
      this.startTime = pickDate;
    }
  }
};
</script>

<style lang="less" scoped>
.add-class-time {
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-content {
    height: 28rem;
    width: 36rem;
    .class-name {
      display: flex;
      justify-content: center;
      align-items: center;
      .tag {
        flex: 1;
      }
      .class-name-input {
        flex: 5;
      }
    }
    .start-time {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.8rem;
      .tag {
        flex: 1;
      }
      .start-time-input {
        flex: 5;
      }
    }
    .cardtime {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.8rem;
      .tag {
        flex: 1;
      }
      .select-cardtime {
        flex: 5;
      }
    }
    .morning {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.8rem;
      .go-working {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .go-working-span {
          flex: 1;
        }
        .time-span {
          flex: 1;
        }
      }
      .leave-working {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.6rem;
        .leave-working-span {
          flex: 1;
        }
        .time-span {
          flex: 1;
        }
      }
    }
    .afternoon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.8rem;
      .go-working {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .go-working-span {
          flex: 1;
        }
        .time-span {
          flex: 1;
        }
      }
      .leave-working {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.6rem;
        .leave-working-span {
          flex: 1;
        }
        .time-span {
          flex: 1;
        }
      }
    }
    .select-weekday {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.2rem;
      .select-weekdays-span {
        flex: 1;
      }
      .weekdays-checkbox {
        flex: 5;
      }
    }
  }
}
</style>
