<template>
  <div class="edit-content">
    <div class="edit-item">
      有效考勤记录大于多少分钟:
      <InputNumber
        :max="300"
        :min="0"
        v-model="intervalMinutesBetweenAttendance"
      />
    </div>
    <div class="edit-item">
      每月可申请补卡次数:
      <InputNumber :min="0" v-model="reissueCardLimit" />
    </div>
    <div class="edit-item">
      加班申请最小时长多少分钟:
      <InputNumber :min="0" v-model="overtimeMinLimit" />
    </div>
    <div class="edit-item">
      提前多少分钟下班不记早退:
      <InputNumber :min="0" v-model="earlyLimit" />
    </div>
    <div class="edit-item">
      迟到多少分钟记为迟到:
      <InputNumber :min="0" v-model="lateLimit" />
    </div>
    <div class="edit-item">
      早退多少分钟记为旷工:
      <InputNumber :min="0" v-model="absentEarlyLimit" />
    </div>
    <div class="edit-item">
      迟到多少分钟记为旷工:
      <InputNumber :min="0" v-model="absentLateLimit" />
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOperations" />
  </div>
</template>

<script>
// ? import components
import Btns from '@common/modal-bottom-btns';

// ? request
import { editAttdanceRule } from '@/request/attdance';

// ? utils
import { handleOpResult, handleErrorCode } from '@/utils';

// ? import mixins
import getRuleMix from './getRuleMix';

export default {
  name: 'Edit',

  components: {
    Btns
  },

  mixins: [getRuleMix],

  data: () => ({
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

  props: {},

  computed: {},

  methods: {
    handleOperations(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleEdit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleEdit() {
      this.$Modal.confirm({
        title: '编辑内容',
        content: '确认操作',
        onOk: () => this.confirmEdit(),
        onCancel: () => this.handleCancel()
      });
    },
    async confirmEdit() {
      const params = {
        ruleId: this.ruleId,
        interval_minutes_between_attendance: this
          .intervalMinutesBetweenAttendance,
        late_limit: this.lateLimit,
        early_limit: this.earlyLimit,
        absent_early_limit: this.absentEarlyLimit,
        absent_late_limit: this.absentLateLimit,
        overtime_min_limit: this.overtimeMinLimit,
        reissue_card_limit: this.reissueCardLimit
      };
      const result = await editAttdanceRule(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.getAttdanceRuleList();
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`编辑失败, 原因: ${handleErrorCode(result.code)}`);
      }
      this.$emit('closeModal');
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModal');
    }
  }
};
</script>

<style lang="less" scoped>
.edit-content {
  height: 32rem;
  .edit-item {
    margin: 1.6rem 0;
    padding: 0 1rem;
  }
}
</style>
