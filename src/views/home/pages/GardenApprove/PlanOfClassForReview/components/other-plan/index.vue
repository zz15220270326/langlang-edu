<template>
  <div class="approve-other-plan">
    <other-querymenu
      @getTableByStatus="getTableByStatus"
      @getTableByClass="getTableByClass"
      @refreshPage="refreshPage"
    />
    <div class="table-content">
      <approve-table
        :titleList="titleList"
        :dataList="dataList"
        @handleSelect="handleSelect"
      />
    </div>
    <bottom-account :total="total" :pageSize="pageSize" />
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <to-comment
        v-bind="edits"
        @closeModals="closeModals"
        @refreshPage="getTableData"
      />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <is-commented v-bind="infos" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import OtherQuerymenu from './OtherQuerymenu';
import ApproveTable from '../../../ApproveTable';
import ToComment from './other-modal/ToComment';
import IsCommented from './other-modal/IsCommented';

import BottomAccount from '@common/bottom-account';

// ? request
import {
  getOtherPlanList,
  getOtherCommentInfo
} from '@/request/garden-approve/1-class-plan';

// ? utils
import { getDataSource, checkDataSource } from '@/utils';
import { titleList } from '../my-utils';

export default {
  name: 'OtherPlan',
  components: {
    OtherQuerymenu,
    ApproveTable,
    ToComment,
    IsCommented,

    BottomAccount
  },
  data: () => ({
    // ? menu-data
    statusIdx: 0,
    // ? table-data
    titleList,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal-title
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
      params.page_size = this.pageSize;
      this.getTableData(params);
    },
    getTableByClass(params) {
      params.page_size = this.pageSize;
      this.getTableData(params);
    },
    // ? table-functions
    async getTableData(params = {}) {
      const result = await getOtherPlanList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const infos = JSON.parse(JSON.stringify(dataSource));
        this.page = infos.page || 0;
        this.total = infos.total || 0;
        this.totalPage = infos.total_page || 0;
        if (infos.list) {
          const { list } = infos;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              number: index + 1,
              id: item.id,
              title: item.title,
              realname: item.realname,
              className: item.ClassName,
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
        }
      } else this.$Message.error('请求数据失败, 请稍后重试');
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
    async openEditModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getOtherCommentInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const infos = JSON.parse(JSON.stringify(dataSource));
        this.edits = {
          id,
          title: this.dataList[itemIdx].title,
          createTime: this.dataList[itemIdx].createTime,
          content: infos.content
        };
        this.modalTitle = '编辑';
        this.isShowEditModal = true;
      } else this.$Message.error('请求数据失败, 请稍后重试');
    },
    async openInfoModal(itemIdx) {
      const { id } = this.dataList[itemIdx];
      const result = await getOtherCommentInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const infos = JSON.parse(JSON.stringify(dataSource));
        this.infos = {
          id,
          title: this.dataList[itemIdx].title,
          createTime: this.dataList[itemIdx].createTime,
          content: infos.content,
          remarkIdea: infos.remark_idea,
          remarkName: infos.remark_name,
          remarkTime: infos.remark_time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
      this.$Message.error('请求数据失败, 请稍后重试');
    },
    // ? modal-functions
    refreshPage() {
      const params = {
        page_size: this.pageSize
      };
      this.getTableData(params);
    },
    // ? modal-table-data
    getModalTableData() {},
    closeModals() {
      this.isShowEditModal = false;
      this.isShowInfoModal = false;
    }
  },
  /**
   * ? life-hooks
   */
  created() {
    this.getTableData();
    this.getModalTableData();
  }
};
</script>

<style lang="less" scoped>
.approve-other-plan {
  .table-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
