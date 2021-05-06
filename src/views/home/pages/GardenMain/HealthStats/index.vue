<template>
  <div class="health-stats-wrapper">
    <my-header :headerItem="headerItem" />
    <my-lines :bodyItems="bodyItems" />
    <!-- <Table></Table> -->
    <my-footer
      :todayStuHealth="todayStuHealth"
      :stu1Health="stu1Health"
      :stu2Health="stu2Health"
      :stu3Health="stu3Health"
      :stu1Temp="stu1Temp"
      :stu2Temp="stu2Temp"
      :stu3Temp="stu3Temp"
      :todayStaffTemperature="todayStaffTemperature"
      :todayStaffHealth="todayStaffHealth"
    />
    <base-footer />
  </div>
</template>

<script>
// ? components
import MyHeader from './components/Head';
import MyLines from './components/Body';
import MyFooter from './components/Foot';

import BaseFooter from '@common/base-footer';

// ? request
import { getHealthStatus } from '@/request/garden-main';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? configs

export default {
  name: 'HealthStats',
  components: {
    MyHeader,
    MyLines,
    MyFooter,

    BaseFooter
  },
  data: () => ({
    headerItem: [],
    bodyItems: [],
    todayStuHealth: {},
    stu1Health: {},
    stu2Health: {},
    stu3Health: {},
    stu1Temp: {},
    stu2Temp: {},
    stu3Temp: {},

    todayStaffTemperature: [],
    todayStaffHealth: []
  }),
  methods: {
    async getTotalData(params = {}) {
      const result = await getHealthStatus(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource),
          [baseInfo, totalInfo] = data;
        this.setBaseInfo(baseInfo);
        this.setGardenInfo(totalInfo);
      } else
        this.$Message.error(
          `请求数据失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    setBaseInfo(baseInfo = {}) {
      // console.log(baseInfo)
      this.headerItem = [];
      Object.keys(baseInfo).map((k1, ki) => {
        if (ki < 3) {
          this.setHeaderItem(baseInfo, k1);
        }
        if (ki === 3) {
          // debugger
          this.setBodyItems(baseInfo[k1]);
        } else {
          // console.log(k1, baseInfo[k1])
        }
      });
      this.todayStuHealth = this.setStudentHealth(
        baseInfo,
        'today_student_health_am',
        'today_student_health_pm'
      );
      this.stu1Health = this.setStudentHealth(
        baseInfo,
        'today_student_health_1_am',
        'today_student_health_1_pm'
      );
      this.stu2Health = this.setStudentHealth(
        baseInfo,
        'today_student_health_2_am',
        'today_student_health_2_pm'
      );
      this.stu3Health = this.setStudentHealth(
        baseInfo,
        'today_student_health_3_am',
        'today_student_health_3_pm'
      );
      this.stu1Temp =
        this.setStuTemp(baseInfo['today_student_temperature_1']) || {};
      this.stu2Temp =
        this.setStuTemp(baseInfo['today_student_temperature_2']) || {};
      this.stu3Temp =
        this.setStuTemp(baseInfo['today_student_temperature_3']) || {};

      this.todayStaffTemperature = this.setTodayStaff(
        baseInfo['今日职工体温情况']
      );
      this.todayStaffHealth = this.setTodayStaff(baseInfo['今日职工健康情况']);
    },
    setHeaderItem(baseInfo, k1) {
      const item = {};
      item.title = k1;
      for (let k2 in baseInfo[k1]) {
        switch (Object.keys(baseInfo[k1]).indexOf(k2)) {
          case 0:
            item.startTime = baseInfo[k1][k2];
            break;
          case 1:
            item.endTime = baseInfo[k1][k2];
            break;
          case 3:
            item.change = baseInfo[k1][k2];
            break;
          default:
            break;
        }
      }
      item.change = (item.endTime - item.startTime) * 100;
      this.headerItem.push(item);
    },
    setBodyItems(infos = {}) {
      const list = [];
      for (let k1 in infos) {
        // ? { am: [{ day: string; data: number; }, pm: { day: string; data: number; }] }
        const bodyItem = {};
        for (let k2 in infos[k1]) {
          switch (k2) {
            case 'am':
              this.setBodyItem(infos, k1, bodyItem, 'am');
              break;
            case 'pm':
              this.setBodyItem(infos, k1, bodyItem, 'pm');
              break;
          }
        }
        list.push(bodyItem);
      }
      this.bodyItems = list;
    },
    setBodyItem(infos, k1, bodyItem, noon = '') {
      bodyItem[noon] = [];
      for (let i = 0; i < parseInt(k1); i++) {
        bodyItem[noon].push({
          day: infos[k1][noon].date_series[i],
          data: infos[k1][noon].data_series[i]
        });
      }
    },

    setStudentHealth(baseInfo, amKey = '', pmKey = '') {
      const staticInfos = {
        am: baseInfo[amKey],
        pm: baseInfo[pmKey]
      };
      return staticInfos;
    },
    setStuTemp(infos = {}) {
      const am = [],
        pm = [],
        total = {};
      for (let k in infos) {
        if (k.indexOf('am') > -1) {
          am.push({
            name: this.getStuTempName(k),
            value: infos[k]
          });
        } else if (k.indexOf('pm') > -1) {
          pm.push({
            name: this.getStuTempName(k),
            value: infos[k]
          });
        } else {
          total.name = '总计';
          total.value = infos[k];
        }
      }
      am.push({
        name: '未登记',
        value: total.value - am[1].value
      });
      pm.push({
        name: '未登记',
        value: total.value - pm[1].value
      });
      const tarInfo = {
        total,
        am,
        pm
      };
      return tarInfo;
    },
    getStuTempName(k = '') {
      return k.indexOf('total_infant') > -1
        ? '未登记'
        : k.indexOf('total_am_abnormal_infant') > -1
        ? '异常'
        : k.indexOf('total_am_register_infant') > -1
        ? '正常'
        : k.indexOf('total_pm_abnormal_infant') > -1
        ? '异常'
        : k.indexOf('total_pm_register_infant') > -1
        ? '正常'
        : '';
    },
    setTodayStaff(infos = {}) {
      const list = [];
      for (let k in infos) {
        switch (k) {
          case 'total_register_user':
            list.push({
              name: '正常',
              value: infos[k]
            });
            break;
          case 'total_abnormal_user':
            list.push({
              name: '异常',
              value: infos[k]
            });
            break;
          case 'total_user':
            list.push({
              name: '未登记',
              value: infos[k] - infos['total_register_user']
            });
            break;
          default:
            break;
        }
      }
      return list;
    },

    setGardenInfo(gardens = []) {
      this.$Notice.info({
        title: '园所信息',
        desc: `
          您好, 欢迎来到智慧幼教平台
          相关联的园所有:
          ${gardens.map(
            (item, index) => `
          ${index + 1}. ${item.GardenName}
          `
          )}
        `,
        duration: 3,
        top: 300
      });
    }
  },
  created() {
    this.getTotalData();
  }
};
</script>
