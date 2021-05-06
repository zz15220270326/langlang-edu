/**
 * * 样式混入
 */

export default {
  data() {
    return {
      // ? styles
      layoutStyle: {
        padding: 0,
        // width: '100%',
        // height: '150rem'
      },
      contentStyle: {
        // padding: '0.8rem 0',
        // height: '120rem',
        background: '#fff'
      },
      sliderStyle: {
        background: '#fff'
      }
    };
  },
  methods: {
    // updateCrtRoute() {
    //   if (this.topRouteName === 'GardenMain') {
    //     this.topItemName = '概况'
    //     this.topRouteIdx = 1
    //   } else if (this.topRouteName === 'ChildrenProfile') {
    //     this.topItemName = '幼儿档案'
    //     this.topRouteIdx = 2
    //   } else if (this.topRouteName === 'WorkerManagement') {
    //     this.topItemName = '职工管理'
    //     this.topRouteIdx = 3
    //   } else if (this.topRouteName === 'StaffAttdence') {
    //     this.topItemName = '职工考勤'
    //     this.topRouteIdx = 4
    //   } else if (this.topRouteName === 'ClassManagement') {
    //     this.topItemName = '班级管理'
    //     this.topRouteIdx = 5
    //   } else if (this.topRouteName === 'PersonalPlan') {
    //     this.topItemName = '个人计划'
    //     this.topRouteIdx = 6
    //   } else if (this.topRouteName === 'GardenApprove') {
    //     this.topItemName = '园务审批'
    //     this.topRouteIdx = 7
    //   } else if (this.topRouteName === 'HealthCare') {
    //     this.topItemName = '卫生保健'
    //     this.topRouteIdx = 8
    //   } else if (this.topRouteName === 'HealthBorder') {
    //     this.topItemName = '健康防疫'
    //     this.topRouteIdx = 9
    //   } else if (this.topRouteName === 'NoticeActive') {
    //     this.topItemName = '通知动态'
    //     this.topRouteIdx = 10
    //   } else if (this.topRouteName === 'SystemManagement') {
    //     this.topItemName = '系统管理'
    //     this.topRouteIdx = 11
    //   }
    // }
  },
  created() {}
};