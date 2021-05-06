<template>
  <div class="detail-teach-plan">
    <my-header :firstTitle="firstTitle" :secondTitle="secondTitle" />
    <my-content
      :titleList="titleList"
      :dataList="dataList"
      :isLoading="isLoading"
      @handleSpan="handleSpan"
    />
    <Divider />
    <my-footer v-bind="infos" />
  </div>
</template>

<script>
// ? import components
import MyHeader from '../detail-teach-plan/DetailHeader';
import MyContent from '../detail-teach-plan/DetailContent';
import MyFooter from '../detail-teach-plan/DetailFooter';

// ? import request-function
import { getTeachPlanInfo } from '@/request/plan/1-class-plan';

// ? import utils
import {
  // ? render
  renderNoon,
  renderNoonTime,
  // ? request
  getDataSource,
  checkDataSource
} from '@/utils';
// , renderDayInfo

export default {
  name: 'Info',
  components: {
    MyHeader,
    MyContent,
    MyFooter
  },
  data: () => ({
    // ? content
    reqId: 0,
    titleList: [
      {
        title: '上/下午',
        key: 'noon',
        align: 'center',
        width: 100,
        render: (h, params) => renderNoon(h, params)
      },
      {
        title: '时间',
        key: 'time',
        align: 'center',
        width: 150,
        render: (h, params) => renderNoonTime(h, params)
      },
      {
        title: '周一',
        slot: 'mon',
        align: 'center'
      },
      {
        title: '周二',
        slot: 'tue',
        align: 'center'
      },
      {
        title: '周三',
        slot: 'wed',
        align: 'center'
      },
      {
        title: '周四',
        slot: 'thu',
        align: 'center'
      },
      {
        title: '周五',
        slot: 'fri',
        align: 'center'
      }
    ],
    dataList: [],
    isLoading: false,
    // ? footer
    replyContent: '',
    evaluater: '',
    evaluateTime: '',
    infos: {}
  }),
  props: {
    // ? 顶部标题数据
    firstTitle: {
      type: String,
      default: 'modalTitle'
    },
    secondTitle: {
      type: String,
      default: 'time'
    },
    currentId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    currentId(newValue) {
      if (newValue !== 0) {
        this.reqId = newValue;
        this.getContent(this.reqId);
      }
    }
  },
  methods: {
    handleSpan() {
      // rowIndex, columnIndex
      // this.$Message.info(`${rowIndex}&${columnIndex}`)
      // if (rowIndex === 0 && columnIndex === 0) {
      //   return [2, 1]
      // }
      // if (rowIndex === 1 && columnIndex === 0) {
      //   return [0, 0]
      // }
    },
    // ? async-functions
    async getContent(id) {
      const result = await getTeachPlanInfo(id);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource) && dataSource.detail) {
        const { detail } = dataSource;
        const { Mon, Tue, Wed, Thu, Fri } = detail;
        const contentObj = {
          mon: Mon,
          tue: Tue,
          wed: Wed,
          thu: Thu,
          fri: Fri
        };
        // ? 时间段获取
        const { timecases } = dataSource;
        let timeArr = [];
        // ? set-time
        timeArr = this.setTime(timecases);
        // ? set-day
        timeArr = this.setDay(timeArr, contentObj);
        // ? 设置表格内容
        this.dataList = [];
        this.dataList.push(...timeArr);
      }
      // ? 获取下面的内容
      if (dataSource.remark) {
        this.getCommentContent(dataSource.remark);
      }
    },
    setTime(timecases) {
      let timeArr = [];
      timecases.map(item => {
        const { start_time, end_time } = item;
        timeArr.push({
          time: `${start_time}-${end_time}`
        });
      });
      return timeArr;
    },
    setDay(timeArr, dayObject) {
      timeArr.map(item => {
        item.mon = dayObject.mon;
        item.tue = dayObject.tue;
        item.wed = dayObject.wed;
        item.thu = dayObject.thu;
        item.fri = dayObject.fri;
      });
      return timeArr;
    },
    getCommentContent(remark) {
      if (remark) {
        const { content, name, CreateTime } = remark;
        this.infos = {
          replyContent: content,
          evaluater: name,
          evaluateTime: CreateTime
        };
      } else {
        // TODO
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-teach-plan {
  height: 30rem;
  overflow-y: auto;
  width: 100%;
  color: #666;
}
</style>
