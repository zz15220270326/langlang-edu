<template>
  <div class="semester-plan">
    <semester-menu
      @searchTableByStatus="searchTableByStatus"
      @searchComment="searchComment"
    />
    <div class="table-content">
      <approve-table
        :titleList="titleList"
        :dataList="dataList"
        :operations="operations"
        @handleSelect="handleSelect"
      />
    </div>
    <bottom-account :total="total" :totalPage="totalPage" />
    <!-- 待点评Modal -->
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="1000"
      :footer-hide="true"
    >
      <to-comment
        v-bind="edits"
        @cancelModal="cancelModal"
        @handleRemark="handleRemark"
        @refreshPage="refreshPage"
      />
    </Modal>
    <!-- 已点评Modal -->
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="1000"
      :footer-hide="true"
    >
      <is-commented v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? import components
import SemesterMenu from './components/MyMenu';
import ApproveTable from '../ApproveTable';
import ToComment from '../common-modal/ToComment';
import IsCommented from '../common-modal/IsCommented';

import BottomAccount from '@common/bottom-account';

// ? async functions
import {
  getSemesterPlanList,
  getSemesterPlanInfo,
  postSemesterPlan
} from '@/request/garden-approve/2-semester-plan';

// ? utils
import { getDataSource, checkDataSource, handleOpResult } from '@/utils';

export default {
  name: 'SemesterPlan',
  components: {
    SemesterMenu,
    ApproveTable,

    ToComment,
    IsCommented,

    BottomAccount
  },
  data: () => ({
    // ? menu-data
    operations: [
      {
        tag: '点评',
        type: 'primary'
      }
    ],
    isRemarked: 0,
    // ? table-data
    titleList: [
      {
        title: '序号',
        key: 'number',
        align: 'center',
        width: 100
      },
      {
        title: '计划学期',
        key: 'planSemester',
        align: 'center',
        width: 320
      },
      {
        title: '提交人',
        key: 'realname',
        align: 'center'
      },
      {
        title: '班级',
        key: 'className',
        align: 'center'
      },
      {
        title: '创建时间',
        key: 'createTime',
        align: 'center'
      },
      {
        title: '操作',
        slot: 'operations',
        align: 'center'
      }
    ],
    dataList: [],
    page: 0,
    pageSize: 0,
    totalPage: 0,
    total: 0,
    // ? modal-data
    modalTitle: '',
    isShowEditModal: false,
    edits: {},

    isShowInfoModal: false,
    infos: {},
    planTitleList: [],
    planDataList: [],
    bigTitle: '',
    smallTitle: '',
    commentContent: '',
    commenter: '',
    commentTime: ''
  }),
  methods: {
    // ? menu-functions
    searchComment(params) {
      params.isRemarked = this.isRemarked;
      this.getTableData(params);
    },
    // ? table-functions
    async getTableData(params = {}) {
      const result = await getSemesterPlanList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.page = dataSource.page || 0;
        this.pageSize = dataSource.page_size || 0;
        this.total = dataSource.total || 0;
        this.totalPage = dataSource.totalPage || 0;
        if (dataSource.list) {
          const { list } = dataSource;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              number: index + 1,
              id: item.id,
              planSemester: `${item.year}~${item.year + 1}学年第${
                item.semester === 1
                  ? '第一学期'
                  : item.semester === 2
                  ? '第二学期'
                  : '未知学期'
              }`,
              realname: item.realname,
              className: item.ClassName,
              createTime: item.CreateTime,
              operations:
                this.isRemarked === 0
                  ? [
                      {
                        tag: '点评',
                        type: 'info'
                      }
                    ]
                  : [
                      {
                        tag: '详情',
                        type: 'success'
                      }
                    ]
            });
          });
        }
      } else {
        this.$Message.error('请求数据失败, 请稍后重试');
      }
    },
    async handleSelect(itemIndex, currentTag) {
      const { id } = this.dataList[itemIndex];
      switch (currentTag) {
        case '点评':
          this.handleOpenEditModal(id, itemIndex);
          break;
        case '详情':
          this.handleOpenInfoModal(id, itemIndex);
          break;
      }
    },
    async handleOpenEditModal(id, itemIndex) {
      const result = await getSemesterPlanInfo({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.edits = {
          id,
          bigTitle: this.dataList[itemIndex].planSemester,
          smallTitle: this.dataList[itemIndex].createTime,
          commentContent: dataSource.content
        };
        this.modalTitle = '点评';
        this.isShowEditModal = true;
      } else this.$Message.error('请求失败, 请稍后重试');
    },
    async handleOpenInfoModal(id, itemIndex) {
      const result = await getSemesterPlanInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infos = {
          id,
          bigTitle: this.dataList[itemIndex].planSemester,
          smallTitle: this.dataList[itemIndex].createTime,
          content: dataSource.content,
          remarkIdea: dataSource.remark_idea,
          remarkName: dataSource.remark_name,
          remarkTime: dataSource.remark_time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      } else this.$Message.error('请求失败, 请稍后重试');
    },
    // ? handle-modal functions
    searchTableByStatus(params) {
      this.isRemarked = params.isRemarked;
      this.isRemarked === 0
        ? this.$Message.info('显示未点评的计划')
        : this.$Message.info('显示已点评的计划');
      this.getTableData(params);
    },
    cancelModal() {
      this.isShowEditModal = false;
      this.isShowInfoModal = false;
    },
    async handleRemark(params) {
      const result = await postSemesterPlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.refreshPage();
      } else {
        this.$Message.error('编辑失败, 请稍后重试');
        this.cancelModal();
      }
    },
    refreshPage() {
      this.cancelModal();
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
