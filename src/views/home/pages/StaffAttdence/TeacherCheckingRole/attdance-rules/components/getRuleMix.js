// ? request
import {
  getAttdanceRule
  // editAttdanceRule
} from '@/request/attdance'

// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode
} from '@/utils'

// ? Vuex
import {
  mapState
} from 'vuex'

export default {
  data() {
    return {
      // ? 有效考勤记录间隔时间大于
      intervalMinutesBetweenAttendance: 0,
      // ? 每月可申请补卡次数
      reissueCardLimit: 0,
      // ? 加班申请最小时长
      overtimeMinLimit: 0,
      // ? 提前多少分钟下班不记早退
      earlyLimit: 0,
      // ? 迟到多少分钟记为迟到
      lateLimit: 0,
      // ? 早退多少分钟记为旷工
      absentEarlyLimit: 0,
      // ? 迟到多少分钟记为旷工
      absentLateLimit: 0,
      ruleId: 0,
      editAble: false
    }
  },
  computed: {
    ...mapState(['gardenId'])
  },
  methods: {
    async getAttdanceRuleList() {
      const result = await getAttdanceRule(this.gardenId),
        dataSource = getDataSource(result)
      if (checkDataSource(dataSource)) {
        const {
          interval_minutes_between_attendance,
          reissue_card_limit,
          overtime_min_limit,
          early_limit,
          late_limit,
          absent_early_limit,
          absent_late_limit,
          id
        } = dataSource
        this.intervalMinutesBetweenAttendance = interval_minutes_between_attendance
        this.reissueCardLimit = reissue_card_limit
        this.overtimeMinLimit = overtime_min_limit
        this.earlyLimit = early_limit
        this.lateLimit = late_limit
        this.absentEarlyLimit = absent_early_limit
        this.absentLateLimit = absent_late_limit
        this.ruleId = id
        this.editAble = true
      } else
        this.$Message.error(
          `请求数据失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        )
      if (result.msg === '没有访问权限！')
        this.editAble = false
    }
  },
  created() {
    this.getAttdanceRuleList()
  }
}