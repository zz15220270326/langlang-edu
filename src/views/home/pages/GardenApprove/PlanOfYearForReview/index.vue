<template>
  <div class="all-year-plan">
    <all-year-menu
      @getTableByStatus="getTableByStatus"
      @getTableByClick="getTableByClick"
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
      />
    </Modal>
    <!-- 已点评Modal -->
    <Modal v-model="isShowInfoModal" :title="modalTitle" width="1000">
      <is-commented v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import AllYearMenu from './components/AllYearMenu';
import ApproveTable from '../ApproveTable';
import ToComment from '../common-modal/ToComment';
import IsCommented from '../common-modal/IsCommented';

import BottomAccount from '@common/bottom-account';

// ? request
import {
  getAllYearPlanList,
  getCommentDetail,
  commentAllYearPlan
} from '@/request/garden-approve/3-all-year-plan';

// ? utils
import { getDataSource, checkDataSource, handleOpResult } from '@/utils';

export default {
  name: 'AllYearPlan',
  components: {
    AllYearMenu,
    ApproveTable,
    ToComment,
    IsCommented,

    BottomAccount
  },
  data: () => ({
    // ? menu-data
    statusIdx: 0,
    commentStatus: [
      {
        tag: '待点评',
        type: 'error'
      },
      {
        tag: '已点评',
        type: 'default'
      }
    ],
    operations: [
      {
        tag: '点评',
        type: 'primary'
      }
    ],
    // ? table-data
    titleList: [
      {
        title: '序号',
        key: 'number',
        align: 'center',
        width: 100
      },
      {
        title: '标题',
        key: 'title',
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
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal-data
    modalTitle: '',
    isShowEditModal: false,
    edits: {},
    isShowInfoModal: false,
    infos: {}
  }),
  methods: {
    // ? menu-functions
    getTableByStatus(params) {
      this.statusIdx = params.isRemarked;
      this.getTableData(params);
    },
    getTableByClick(params) {
      this.getTableData(params);
    },
    // ? table-functions
    async getTableData(params = { page_size: 20 }) {
      const result = await getAllYearPlanList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = JSON.parse(JSON.stringify(dataSource));
        this.page = data.page || 0;
        this.total = data.total || 0;
        this.totalPage = data.total_page || 0;
        this.dataList = [];
        data.list && this.setDataList(data.list);
      } else this.$Message.error('获取列表数据失败, 请稍后重试');
    },
    setDataList(list = []) {
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          title: `
              ${item.ClassName}${item.year}年整年计划
              `,
          className: item.ClassName,
          classId: item.ClassId,
          realname: item.realname,
          createTime: item.CreateTime,
          operations:
            this.statusIdx === 0
              ? [
                  {
                    tag: '点评',
                    type: 'primary'
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
    },
    handleSelect(itemIdx, currentTag) {
      switch (currentTag) {
        case '点评':
          this.openEditModal(itemIdx);
          break;
        case '详情':
          this.openInfoModal(itemIdx);
          break;
      }
    },
    // ? modal functions
    async openEditModal(itemIdx) {
      const { id, title, createTime } = this.dataList[itemIdx];
      const result = await getCommentDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.edits = {
          id,
          bigTitle: title,
          smallTitle: createTime,
          commentContent: info.content
        };
        this.modalTitle = '点评';
        this.isShowEditModal = true;
      } else this.$Message.error('请求内容失败, 请稍后重试');
    },
    async openInfoModal(itemIdx) {
      const { id, title, createTime } = this.dataList[itemIdx];
      const result = await getCommentDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.infos = {
          id,
          bigTitle: title,
          smallTitle: createTime,
          content: info.content,
          remarkIdea: info.remark_idea,
          remarkName: info.remark_name,
          remarkTime: info.remark_time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    async handleRemark(params) {
      const result = await commentAllYearPlan(params);
      if (handleOpResult(result)) {
        this.$Message.success('点评成功');
        this.getTableData();
      } else {
        this.$Message.error('点评失败, 请稍后重试');
      }
      this.cancelModal();
    },
    cancelModal() {
      this.isShowEditModal = false;
      this.isShowInfoModal = false;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: start;
}
.all-year-plan {
  .table-content {
    .flex-center;
  }
}
</style>
