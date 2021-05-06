<template>
  <div class="attdance-rules">
    <rule-item
      :max1="intervalMinutesBetweenAttendance"
      :min1="intervalMinutesBetweenAttendance"
      :value1="intervalMinutesBetweenAttendance"
      :max2="reissueCardLimit"
      :min2="reissueCardLimit"
      :value2="reissueCardLimit"
    >
      <span slot="left-tag">有效考勤记录大于</span>
      <span slot="left-time">分钟</span>
      <span slot="right-tag">每月可申请补卡次数</span>
      <span slot="right-time">次</span>
    </rule-item>
    <Divider />
    <rule-item
      :max1="overtimeMinLimit"
      :min1="overtimeMinLimit"
      :value1="overtimeMinLimit"
      :max2="earlyLimit"
      :min2="earlyLimit"
      :value2="earlyLimit"
    >
      <span slot="left-tag">加班申请最小时长</span>
      <span slot="left-time">分钟</span>
      <span slot="right-tag">提前多少分钟下班不记早退</span>
      <span slot="right-time">分钟</span>
    </rule-item>
    <Divider />
    <rule-item
      :max1="lateLimit"
      :min1="lateLimit"
      :value1="lateLimit"
      :max2="absentEarlyLimit"
      :min2="absentEarlyLimit"
      :value2="absentEarlyLimit"
    >
      <span slot="left-tag">迟到多少分钟记为迟到</span>
      <span slot="left-time">分钟</span>
      <span slot="right-tag">早退多少分钟记为旷工</span>
      <span slot="right-time">分钟</span>
    </rule-item>
    <Divider />
    <rule-item
      :max1="absentLateLimit"
      :min1="absentLateLimit"
      :value1="absentLateLimit"
      :max2="-1"
    >
      <span slot="left-tag">迟到多少分钟记为旷工</span>
      <span slot="left-time">分钟</span>
    </rule-item>
    <Divider />
    <div class="eidt-button">
      <Button
        :disabled="!editAble"
        type="primary"
        @click.native="openEditModal"
      >
        编辑
      </Button>
    </div>
    <Modal
      title="编辑考勤规则"
      v-model="isShowEditModal"
      class="edit-card"
      :footer-hide="true"
      width="800"
    >
      <edit @closeModal="closeModal" @refreshPage="refreshPage" />
    </Modal>
  </div>
</template>

<script>
// ? components
import RuleItem from './components/RuleItem'
import Edit from './components/Edit'

// ? import mixins
import getRuleMix from './components/getRuleMix'

export default {
  name: 'AttdanceRules',
  components: {
    RuleItem,
    Edit
  },
  mixins: [getRuleMix],
  data: () => ({
    /**
     * * 弹窗相关
     **/
    isShowEditModal: false,
    edits: {},
    ruleId: 0
  }),
  computed: {
    // gardenId() {
    //   return this.$store.state.gardenId
    // }
  },
  methods: {
    openEditModal() {
      this.isShowEditModal = true
    },
    closeModal() {
      this.isShowEditModal = false
    },
    refreshPage() {
      this.getAttdanceRuleList()
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
@import './components/index.less';
</style>
