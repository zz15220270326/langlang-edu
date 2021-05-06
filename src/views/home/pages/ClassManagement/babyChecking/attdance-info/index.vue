<template>
  <div class="children-attdance-info">
    <attdance-info-menu
      :classGroups="classGroups"
      @handleSearch="handleSearch"
      @handleAttdence="handleAttdence"
      @handleSickHdy="handleSickHdy"
      @handleThingHdy="handleThingHdy"
    />
    <!-- <Spin v-show="isLoading" size="large"> 加载中 </Spin> -->
    <div class="title">
      <h1>{{ year + '年' + month + '月' + ' ' + crtClass }} 考勤表</h1>
    </div>
    <div class="table-content">
      <my-content
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="isLoading"
        @getSelectItem="getSelectItem"
      />
    </div>
    <bottom-bar :attdencePercent="attdencePercent" :total="total" />
    <!-- Edit-Infant-Modal -->
    <Modal
      :title="modalTitle"
      v-model="isShowEditModal"
      width="750"
      :footer-hide="true"
    >
      <edit-infant
        v-bind="edits"
        @refreshPage="setTable"
        @closelModals="closelModals"
      />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? import components
import AttdanceInfoMenu from './components/AttdanceInfoMenu';
import MyContent from 'HomePage/ClassManagement/CMTable';
import BottomBar from './components/BottomBar';
import EditInfant from './components/EditInfant';
// ? request
import { getBabyCheckings, changeInfants } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj,
  // ? time
  getWeekDays,
  getDays
} from '@/utils';
import { handleRenderDay, getDayText } from './utils';

import { mapState } from 'vuex';

export default {
  name: 'AttdanceInfo',

  components: {
    AttdanceInfoMenu,
    MyContent,
    BottomBar,
    EditInfant
  },

  data: () => ({
    // ? menus
    isLoading: false,
    operations: [
      {
        tag: '出勤',
        type: 'success'
      },
      {
        tag: '病假',
        type: 'error'
      },
      {
        tag: '事假',
        type: 'warning'
      }
    ],
    classGroups: {},
    // ? contents
    year: '',
    month: '',
    crtClass: '全园幼儿',
    day: 0,
    titleList: [],
    dataList: [],
    selectItem: [],
    attdencePercent: 0,
    total: 0,
    // ? modals
    modalTitle: '',
    edits: {},
    isShowEditModal: false
  }),

  computed: {
    ...mapState(['defaultYear', 'defaultMonth'])
  },

  methods: {
    // ? menus
    handleSearch(all = {}) {
      const { crtClass, year, month, startDate, endDate, classId } = all;
      const params = { startDate, endDate, classId };
      this.crtClass = crtClass;
      this.setTable(year, month, params);
    },
    handleAttdence() {
      if (!this.selectItem.length) {
        this.$Message.warning('请先选择幼儿');
        return;
      }
      this.$Modal.confirm({
        title: '批量设置为"出勤"',
        content: '确认操作?',
        onOk: () => {
          const params = {
            infantIds: this.selectItem.map(item => item.id).toString(),
            status: 1
          };
          this.handleInfants(params);
        }
      });
    },
    handleSickHdy() {
      if (!this.selectItem.length) {
        this.$Message.warning('请先选择幼儿');
        return;
      }
      this.$Modal.confirm({
        title: '批量设置为"病假"',
        content: '确认操作?',
        onOk: () => {
          const params = {
            infantIds: this.selectItem.map(item => item.id).toString(),
            status: 2
          };
          this.handleInfants(params);
        }
      });
    },
    handleThingHdy() {
      if (!this.selectItem.length) {
        this.$Message.warning('请先选择幼儿');
        return;
      }
      this.$Modal.confirm({
        title: '批量设置为"事假"',
        content: '确认操作?',
        onOk: () => {
          const params = {
            infantIds: this.selectItem.map(item => item.id).toString(),
            status: 3
          };
          this.handleInfants(params);
        }
      });
    },
    async handleInfants(params) {
      const result = await changeInfants(params);
      this.handleResult(result);
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.setTable(this.defaultYear, this.defaultMonth, {});
      }
    },
    // ? contents
    getSelectItem(selectItem = []) {
      this.selectItem = selectItem.filter(
        item => item.absenseDays !== '缺勤天数'
      );
    },
    setTable(year = this.defaultYear, month = this.defaultMonth, params = {}) {
      this.getYm(year, month);
      this.getTitleByYm();
      const days = getDays(year, month);
      this.getTableData(params, days);
    },
    getYm(year, month) {
      this.year = year;
      this.month = month;
    },
    getTitleByYm() {
      this.titleList = [];
      this.titleList.splice(0, 0, {
        type: 'selection',
        width: 60,
        align: 'center'
      });
      this.titleList.push({
        title: '姓名/日期',
        key: 'childrenName',
        align: 'center',
        width: 100
      });
      let daysArr = [];
      const days = getDays(this.year, this.month);
      for (let i = 0; i < days; i++) {
        daysArr.push(i);
      }
      for (let day of daysArr) {
        this.titleList.push({
          title: day * 1 + 1,
          key: `day${day * 1 + 1}`,
          align: 'center',
          width: 80,
          render: (h, params) => handleRenderDay(h, params, day, this)
        });
      }
      this.titleList.push({
        title: '合计',
        key: 'absenseDays',
        align: 'center',
        width: 100
      });
    },
    getFirstData() {
      let firstData = {};
      firstData.attdance = '当天考勤';
      firstData.childrenName = '幼儿姓名';
      let daysArr = [];
      const days = getDays(this.year, this.month);
      for (let i = 0; i < days; i++) {
        daysArr.push(i);
      }
      for (let day of daysArr) {
        firstData[`day${day * 1 + 1}`] = getWeekDays(
          this.year + '-' + this.month + '-' + (day * 1 + 1)
        );
      }
      firstData.absenseDays = '缺勤天数';
      this.dataList.length === 0 && this.dataList.push(firstData);
    },
    async getTableData(params = {}, days) {
      this.isLoading = true;
      this.dataList = [];
      this.getFirstData();
      const result = await getBabyCheckings(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        // console.log(data);
        this.attdencePercent = parseInt(data.checking_rate.split('%')[0]) || 0;
        this.classGroups = data.class_group || {};
        data.show_checking &&
          data.rest &&
          this.setDataChecking(data.show_checking, days, data.rest);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.isLoading = false;
    },
    setDataChecking(dataChecking = {}, days, rest = []) {
      // console.log(dataChecking);
      const list = [];
      Object.keys(dataChecking).map((k, ki) => {
        list.push({
          id: k,
          childrenName: dataChecking[k]['0']
        });
        const dayList = Object.keys(dataChecking[k]).filter(
          k2 => parseInt(k2) > 0 && parseInt(k2) <= days
        );
        let absenseDays = 0;
        dayList.forEach(d => {
          list[ki][`day${d}`] = getDayText(dataChecking[k][d]);
          rest.forEach(r => {
            list[ki][`day${r}`] = '休';
          });
          list[ki][`day${d}`] === 0 && absenseDays++;
        });
        list[ki]['absenseDays'] = absenseDays;
      });
      this.dataList.push(...list);
      this.getTotal();
    },
    getTotal() {
      this.total = this.dataList.length - 1;
    },
    // ? modals
    closelModals() {
      this.isShowEditModal = false;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.setTable();
  }
};
</script>
