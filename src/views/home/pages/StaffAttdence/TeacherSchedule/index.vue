<template>
  <!-- 排班表 -->
  <div class="duty-roster">
    <duty-query-menu @handleSearch="handleSearch" />
    <div class="table-content">
      <Table border :columns="titleList" :data="dataList" size="small"></Table>
      <!-- :height="dataList.length > 5 ? 450 : undefined" -->
    </div>
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="changeTableData"
    />
    <!-- edit-modal -->
    <Modal
      v-model="isShowEditModal"
      class="edit-modal"
      :title="modalTitle"
      width="800"
      :footer-hide="true"
    >
      <edit-content
        v-bind="edits"
        @closeModals="closeModals"
        @refreshPage="initTableData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import DutyQueryMenu from './components/DutyQueryMenu';
import EditContent from './components/EditContent';
import BottomAccount from '@common/bottom-account';
// ? request
import { getScheduleList, editSchedules } from '@/request/attdance';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? time
  getMondayDate,
  getDays,
  isAddZero
} from '@/utils';
import { firstRow, setTitleList } from './my-utils';
// ? vuex
import { mapGetters } from 'vuex';

export default {
  name: 'DutyRoster',
  components: {
    DutyQueryMenu,
    EditContent,
    BottomAccount
  },
  data: () => ({
    params: {},
    titleList: [],
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? 编辑排班弹窗信息
    isShowEditModal: false,
    modalTitle: '',
    edits: {}
  }),
  computed: {
    ...mapGetters(['ymdGetters'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      if (params.start_time) {
        const startTime = params.start_time,
          [year, month] = startTime.split('-'),
          day = getDays(year * 1, month * 1);
        this.titleList = setTitleList(startTime, day);
        const newParams = Object.assign({}, this.params, params);
        this.getTableData(newParams, startTime, day);
      }
    },
    // ? content
    initTableData() {
      const ymd = JSON.parse(JSON.stringify(this.ymdGetters));
      this.setPageSize(20);
      this.getDateParams(ymd);
    },
    setPageSize(size) {
      this.params.page_size = size;
    },
    getDateParams(ymd = '0000-0-0') {
      const startTime = getMondayDate(ymd),
        list = startTime.split('-'),
        day = getDays(list[0] * 1, list[1] * 1);
      this.params.start_time = startTime;
      if (list[2] * 1 + 13 <= day) {
        // isAddZero
        this.params.end_time = `${list[0]}-${list[1]}-${list[2] * 1 + 13}`;
      } else {
        this.params.end_time = `${
          list[1] * 1 + 1 <= 12 ? list[0] : list[0] * 1 + 1
        }-${list[1] * 1 + 1 <= 12 ? list[1] * 1 + 1 : '01'}-${isAddZero(
          list[2] * 1 + 13 - day
        )}`;
      }
      const params = JSON.parse(JSON.stringify(this.params));
      // console.log(params)
      this.getTableData(params, startTime, day);
    },
    async getTableData(params = { page_size: this.pageSize }, startTime, day) {
      const result = await getScheduleList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = Object.assign({}, dataSource);
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (startTime && day) {
          this.titleList = setTitleList(startTime, day, this);
        }
        if (info.items.length > 0) {
          this.getDataList(info.items);
        }
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    getDataList(items = []) {
      // console.log(items)
      this.dataList = [];
      this.dataList[0] = firstRow;
      items.map((item, idx) => {
        // ? key: name, day1, day2, ... day14
        this.dataList.push({
          number: idx + 1,
          id: item.id,
          name: item.realname,
          data: item.data
        });
        // console.log(item.data)
      });
    },
    changeTableData(params) {
      const newParams = Object.assign({}, this.params, params);
      this.getTableData(newParams);
    },
    async arrangeClasses(date) {
      console.log(date);
      const result = await editSchedules({ date });
      if (handleOpResult(result)) {
        this.$Message.success('批量编辑成功');
        this.initTableData();
      } else
        this.$Message.error(
          `批量编辑失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    showModal(itemIdx, title, className, crtYear) {
      const { id, name } = this.dataList[itemIdx];
      this.edits = {
        id,
        teacherName: name,
        pickDate: title,
        className: className === '休' ? '暂无排班信息' : className,
        classList: [],
        crtYear
      };
      this.isShowEditModal = true;
      this.modalTitle = '编辑排班';
    },
    closeModals() {
      this.isShowEditModal = false;
    }
  },
  created() {
    this.initTableData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 1.2rem;
}
</style>
