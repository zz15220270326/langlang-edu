<template>
  <div class="week-time-setting">
    <div class="main">
      <div class="select-semester">
        <div class="tag">
          <Tag size="large" color="pink">选择学年:</Tag>
        </div>
        <div class="content">
          <Select v-model="params.year">
            <Option
              v-for="year of yearList"
              :key="year.value"
              :value="year.value"
            >
              {{ year.label }}
            </Option>
          </Select>
        </div>
      </div>
      <div class="first-start-time">
        <div class="tag">
          <Tag size="large" color="green">第一学期开学时间:</Tag>
        </div>
        <div class="content">
          <DatePicker
            placeholder="请选择第一学期开学时间"
            v-model="params.firstTerm"
          />
        </div>
      </div>
      <div class="second-start-time">
        <div class="tag">
          <Tag size="large" color="green">第二学期开学时间:</Tag>
        </div>
        <div class="content">
          <DatePicker
            placeholder="请选择第二学期开学时间"
            v-model="params.secondTerm"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <Button size="large" type="success" @click.native="handleSave">
        保存
      </Button>
      <!-- <Button size="large" type="error">清空</Button> -->
    </div>
  </div>
</template>

<script>
import './index.less';
// ? request
import { getWeekTimeList, editWeekTime } from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? time
  dateToMs,
  transformToYMD,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'WeekTimeSetting',
  data: () => ({
    params: {
      id: '',
      year: '',
      firstTerm: '',
      secondTerm: ''
    },
    yearList: [
      {
        label: '请选择学年',
        value: ''
      },
      {
        label: '2017-2018学年',
        value: '2017'
      },
      {
        label: '2018-2019学年',
        value: '2018'
      },
      {
        label: '2019-2020学年',
        value: '2019'
      },
      {
        label: '2020-2021学年',
        value: '2020'
      },
      {
        label: '2021-2022学年',
        value: '2021'
      },
      {
        label: '2022-2023学年',
        value: '2022'
      },
      {
        label: '2023-2024学年',
        value: '2023'
      },
      {
        label: '2024-2025学年',
        value: '2024'
      },
      {
        label: '2025-2026学年',
        value: '2025'
      },
      {
        label: '2026-2027学年',
        value: '2026'
      },
      {
        label: '2027-2028学年',
        value: '2027'
      },
      {
        label: '2028-2029学年',
        value: '2028'
      },
      {
        label: '2029-2030学年',
        value: '2029'
      }
    ]
  }),
  methods: {
    async initInfo() {
      const result = await getWeekTimeList({}),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, yearList } = deepCopyObj(dataSource);
        // console.log(data);
        data && this.setParams(data);
        yearList && this.setYearList(yearList);
      } else this.$Message.error(`初始化数据失败, 原因: ${result.msg}`);
    },
    setParams({ id, year, first_term, second_term }) {
      this.params = {
        id,
        year,
        firstTerm: new Date(first_term),
        secondTerm: new Date(second_term)
      };
    },
    setYearList(list) {
      this.yearList = [];
      list.forEach(y =>
        this.yearList.push({
          label: `${y}-${y + 1}学年`,
          value: y.toString()
        })
      );
    },
    checkWorktimeParams() {
      const { year, firstTerm, secondTerm } = this.params;
      if (!year.length) {
        this.$Message.warning('请选择周次设置的学年');
        return false;
      }
      if (firstTerm.length === 0) {
        this.$Message.warning('请选择第一学期的开学时间');
        return false;
      }
      if (secondTerm.length === 0) {
        this.$Message.warning('请选择第二学期的开学时间');
        return false;
      }
      // if (!this.comparseSE(firstTerm, secondTerm)) {
      //   this.$Message.warning('第一学期的开学时间不能晚于第二学期');
      //   return false;
      // }
      return true;
    },
    comparseSE(s, e) {
      const startTime = transformToYMD(dateToMs(s)),
        endTime = transformToYMD(dateToMs(e)),
        startTimeNum = parseInt(
          startTime.split('-')[0] +
            startTime.split('-')[1] +
            startTime.split('-')[2]
        ),
        endTimeNum = parseInt(
          endTime.split('-')[0] + endTime.split('-')[1] + endTime.split('-')[2]
        );
      if (endTimeNum > startTimeNum) {
        return true;
      }
      return false;
    },
    handleSave() {
      if (this.checkWorktimeParams()) {
        this.$Modal.confirm({
          title: '保存内容',
          content: '确认操作?',
          onOk: () => {
            const params = {
              id: this.params.id,
              year: this.params.year,
              first_term: transformToYMD(dateToMs(this.params.firstTerm)),
              second_term: transformToYMD(dateToMs(this.params.secondTerm))
            };
            this.confirmSave(params);
          }
        });
      }
    },
    async confirmSave(body) {
      const result = await editWeekTime(body);
      if (handleOpResult(result)) {
        this.$Message.success('保存成功');
        this.initInfo();
      } else this.$Message.error(`保存失败, 原因: ${result.msg}`);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.initInfo();
  }
};
</script>
