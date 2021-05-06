<template>
  <!-- 班次管理 -->
  <div class="class-management">
    <title-menu @openAddModal="openAddModal" />
    <content-table
      :titleList="titleList"
      :dataList="dataList"
      @openEditModal="openEditModal"
      @confirmDelete="confirmDelete"
      @openArrangeModal="openArrangeModal"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
    />
    <div class="content">
      <Modal
        v-model="isShowAddModal"
        class="add-class-time-modal"
        title="新增"
        width="800"
        :footer-hide="true"
      >
        <add-class-time
          @closeModals="closeModals"
          @refreshPage="getTableData"
        />
      </Modal>
      <Modal
        v-model="isShowEditModal"
        class="edit-class-time-modal"
        title="编辑"
        width="800"
        :footer-hide="true"
      >
        <add-class-time
          :id="id"
          :edits="edits"
          @closeModals="closeModals"
          @refreshPage="getTableData"
        />
      </Modal>
      <Modal
        v-model="isShowManagementModal"
        class="management-modal"
        title="排班"
        width="800"
        :footer-hide="true"
      >
        <person-management
          v-bind="arranges"
          @closeModals="closeModals"
          @refreshPage="getTableData"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
// ? components
import TitleMenu from './components/TitleMenu';
import ContentTable from './components/ContentTable';
import BottomAccount from '@common/bottom-account';

import AddClassTime from './components/AddClassTime';
import PersonManagement from './components/PersonManagement';

// ? request
import {
  getClassesList,
  deleteClasses
  // , getClassesInfo
} from '@/request/attdance';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { formatWeekDay } from './components/my-utils';

export default {
  name: 'ClassManagement',
  components: {
    TitleMenu,
    ContentTable,
    BottomAccount,

    AddClassTime,
    PersonManagement
  },
  data: () => ({
    titleList: [
      {
        title: '班次',
        key: 'name',
        align: 'center',
        width: 120
      },
      {
        title: '打卡时间',
        slot: 'cardTime',
        align: 'center',
        width: 200
      },
      {
        title: '班次周数',
        slot: 'weekday',
        align: 'center',
        width: 420
      },
      {
        title: '启用时间',
        key: 'startTime',
        align: 'center',
        width: 300
      },
      {
        title: '操作',
        slot: 'operations',
        align: 'center'
      }
    ],
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal
    modalTitle: '',
    isShowAddModal: false,
    isShowEditModal: false,
    id: -1,
    edits: {},
    isShowManagementModal: false,
    arranges: {}
  }),
  methods: {
    // ? menu
    openAddModal() {
      this.modalTitle = '添加班次';
      this.isShowAddModal = true;
    },
    // ? table
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await getClassesList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.total || 0;
        this.totalPage = data.total_page || 0;
        this.dataList = [];
        data.items && data.items.length > 0 && this.setDataList(data.items);
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          name: item.name,
          weekday: item.weekday.split(',').map(item => formatWeekDay(item)),
          workTime: item.work_time || '',
          cardTime: item.punch_card_time || '',
          startTime: item.start_time || '',
          scheduled: item.scheduled,
          notScheduled: item.not_scheduled,
          operations: [
            {
              tag: '编辑',
              type: 'primary'
            },
            {
              tag: '删除',
              type: 'error'
            },
            {
              tag: '排班',
              type: 'warning'
            }
          ]
        });
      });
    },
    openEditModal(itemIdx) {
      const info = this.dataList[itemIdx];
      this.id = info.id;
      this.edits = {
        className: info.name,
        startTime: info.startTime,
        cardTime: info.cardTime,
        goAmTime: info.workTime['AM'].start,
        leaveAmTime: info.workTime['AM'].end,
        goPmTime: info.workTime['PM'].start,
        leavePmTime: info.workTime['PM'].end,
        weekday: info.weekday
      };
      this.modalTitle = '编辑';
      this.isShowEditModal = true;
    },
    async confirmDelete(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await deleteClasses({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTableData();
      } else
        this.$Message.error(`删除失败, 原因: ${handleErrorCode(result.code)}`);
    },
    async openArrangeModal(itemIdx = 0) {
      console.log(this.dataList[itemIdx]);
      const { id, scheduled, notScheduled } = this.dataList[itemIdx];
      this.arranges = {
        id,
        _scheduled: scheduled,
        _notScheduled: notScheduled
      };
      this.isShowManagementModal = true;
      // const { id } = this.dataList[itemIdx]
      // const result = await getClassesInfo({ id })
      // const dataSource = getDataSource(result)
      // if (checkDataSource(dataSource)) {
      //   const info = Object.assign({}, dataSource)
      //   this.arranges = {
      //     id,
      //     _scheduled: info.scheduled,
      //     _notScheduled: info.not_scheduled
      //   }
      //   this.isShowManagementModal = true
      // } else
      //   this.$Meessage.error(`请求失败, 原因: ${handleErrorCode(result.code)}`)
    },
    // ? modal
    closeModals() {
      this.isShowAddModal = false;
      this.isShowEditModal = false;
      this.isShowManagementModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
