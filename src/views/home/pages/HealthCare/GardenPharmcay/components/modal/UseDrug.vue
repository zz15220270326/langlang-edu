<template>
  <div class="use-drug">
    <div class="date">
      <div class="tag">服药时间:</div>
      <div class="content">
        <DatePicker
          class="select-time"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          :placeholder="`当前时间: ${drugTime}`"
          @on-change="getTime"
        />
      </div>
    </div>
    <div class="input">
      <div class="tag">备注:</div>
      <div class="content">
        <Input
          :placeholder="note"
          v-model="comment"
          type="textarea"
          :rows="6"
          maxlength="1000"
          :show-word-limit="true"
        />
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
// ? components
import Btns from '@common/modal-bottom-btns';
// ? request
import { takeMedicine } from '@/request/health-care';
// ? utils
import {
  // ? request
  handleOpResult,
  // ? time
  dateToMs,
  transformTimeStamp
} from '@/utils';

export default {
  name: 'UseDrug',
  components: {
    Btns
  },
  data: () => ({
    time: '',
    comment: '',
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
    drugTime: {
      type: String,
      default: ''
    },
    note: {
      type: String,
      default: ''
    }
  },
  watch: {
    note(newComment) {
      this.comment = newComment;
    }
  },
  methods: {
    getTime(time) {
      this.time = time;
    },
    handleOperations(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleSubmit() {
      let params = {};
      if (this.time === '') {
        this.$Message.warning('默认选择当前的时间');
        params = {
          id: this.id,
          dateTime: transformTimeStamp(dateToMs(new Date() / 1000)),
          comment: this.comment
        };
      } else {
        params = {
          id: this.id,
          dateTime: this.time,
          comment: this.comment
        };
      }
      this.confirmSubmit(params);
    },
    async confirmSubmit(params) {
      const result = await takeMedicine(params);
      if (handleOpResult(result)) {
        this.$Message.success('设置服药成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`设置服药失败, 原因: ${result.msg}`);
      }
      this.$emit('closeModals');
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
.use-drug {
  height: 28rem;
  width: 100%;
  .date {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.93rem;
      font-weight: 500;
    }
    .content {
      flex: 7;
      font-size: 1rem;
      font-weight: 560;
      .select-time {
        width: 16rem;
      }
    }
  }
  .input {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.93rem;
      font-weight: 500;
    }
    .content {
      flex: 7;
      font-size: 1rem;
      font-weight: 560;
      margin-right: 2rem;
      margin-top: 3rem;
    }
  }
}
</style>
