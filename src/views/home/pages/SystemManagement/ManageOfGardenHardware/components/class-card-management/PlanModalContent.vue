<template>
  <div class="plan-modal-content">
    <top />
    <div class="content">
      <s-m-table
        :titleList="planTableTitleList"
        :dataList="planTableDataList"
        :tableIsLoading="planTableIsLoading"
        @handleStartTime="handleStartTime"
        @handleEndTime="handleEndTime"
        @editItem="editItem"
      />
    </div>
    <bottom :operations="operations" @handleBottom="handleBottom" />
  </div>
</template>

<script>
// ? import components
// ?? common
import SMTable from 'HomePage/SystemManagement/SMTable'
// ?? children
import Top from './plan-modal-content/Top'
import Bottom from './plan-modal-content/Bottom'

// ? import mixins
import getPlanModalTableMix from './plan-modal-content/getPlanModalTableMix'

export default {
  name: 'PlanModalContent',

  components: {
    SMTable,

    Top,
    Bottom
  },

  mixins: [getPlanModalTableMix],

  data: () => ({
    operations: [
      {
        tag: '重置时间',
        type: 'primary',
        icon: 'ios-refresh-circle-outline'
      },
      {
        tag: '保存',
        type: 'success',
        icon: 'md-checkmark'
      },
      {
        tag: '取消',
        type: 'error',
        icon: 'md-close'
      }
    ],
    startTime: '',
    endTime: '',
    itemIndex: -1
  }),

  props: {},

  computed: {},

  methods: {
    handleBottom(currentIndex) {
      switch (currentIndex) {
        case 0:
          this.$Modal.confirm({
            title: '重置时间',
            content: '是否重置',
            onOk: () => {
              this.planTableIsLoading = true
              setTimeout(() => {
                this.planTableDataList.map(item => {
                  item.openTime = ''
                  item.closeTime = ''
                })
                this.$Message.success('重置成功')
                this.planTableIsLoading = false
              }, 500)
            },
            onCancel: () => {
              this.$Message.warning('您取消了本次操作')
            }
          })
          break
        case 1:
          break
        case 2:
          break
      }
    },
    handleStartTime(startTime, index) {
      this.startTime = startTime
      this.itemIndex = index
    },
    handleEndTime(endTime, index) {
      this.endTime = endTime
      this.itemIndex = index
    },
    editItem(itemIndex, itemTag) {
      switch (itemTag) {
        case '编辑':
          this.planTableDataList[itemIndex].operation.tag = '确认编辑'
          this.planTableDataList[itemIndex].operation.type = 'success'
          break
        case '确认编辑':
          if (this.itemIndex === -1) {
            this.$Message.warning('请先选择时间')
          } else {
            if (this.endTime === '' || this.endTime === '') {
              this.$Message.info('开机时间或结束时间不能为空')
            } else {
              const { startTime, endTime } = this

              const startTimeNum =
                (startTime.split(':')[0] + startTime.split(':')[1]) * 1
              const endTimeNum =
                (endTime.split(':')[0] + endTime.split(':')[1]) * 1

              if (startTimeNum >= endTimeNum) {
                this.$Message.warning('关机时间要大于开机时间')
              } else {
                this.itemIndex = -1
                this.planTableDataList[itemIndex].operation.tag = '编辑'
                this.$Message.success('编辑成功')
                this.planTableDataList[itemIndex].operation.type = 'primary'
              }
            }
          }
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plan-modal-content {
  height: 34rem;
  .content {
    height: 70%;
  }
}
</style>
