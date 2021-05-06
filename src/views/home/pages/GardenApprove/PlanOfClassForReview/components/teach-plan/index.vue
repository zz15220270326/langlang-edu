<template>
  <div class="approve-teach-plan">
    <teach-querymenu
      @getTableByStatus="getTableByStatus"
      @getTableBySelects="getTableBySelects"
    />
    <div class="table-content">
      <approve-table
        :titleList="titleList"
        :dataList="dataList"
        @handleSelect="handleSelect"
      />
    </div>
    <bottom-account :total="total" :totalPage="totalPage" />
    <!-- 待点评Modal -->
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
    >
      <to-comment
        v-bind="edits"
        @cancelModals="cancelModals"
        @refreshPage="refreshPage"
      />
    </Modal>
    <!-- 已点评Modal -->
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
import TeachQuerymenu from './TeachQuerymenu';
import ApproveTable from '../../../ApproveTable';
import ToComment from '../teach-plan/teach-modal/ToComment';
import IsCommented from '../teach-plan/teach-modal/IsCommented';

import BottomAccount from '@common/bottom-account';

// ? request
import {
  getTeachPlanList,
  getTeachCommentInfo
} from '@/request/garden-approve/1-class-plan';

// ? utils
import { getDataSource, checkDataSource } from '@/utils';
import { titleList, planTitleList } from '../my-utils';

// ? mock-data

export default {
  name: 'TeachPlan',
  components: {
    TeachQuerymenu,
    ApproveTable,
    ToComment,
    IsCommented,

    BottomAccount
  },
  data: () => ({
    // ? menu-data
    statusIndex: 0,
    // ? table-data
    titleList,
    dataList: [],
    page: 0,
    pageSize: 0,
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
    // ? table-functions
    handleSelect(itemIndex, currentTag) {
      switch (currentTag) {
        case '点评':
          this.handleOpenEdit(itemIndex);
          break;
        case '详情':
          this.handleOpenInfo(itemIndex);
          break;
      }
    },
    async handleOpenEdit(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await getTeachCommentInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.edits = {
          id: this.dataList[itemIndex].id,
          bigTitle: `${this.dataList[itemIndex].title}周计划`,
          smallTitle: this.dataList[itemIndex].createTime,
          planTitleList,
          planDataList: this.setPlanDataList(dataSource)
        };
        this.modalTitle = '点评';
        this.isShowEditModal = true;
      } else this.$Message.error('请求数据失败, 请稍后重试');
    },
    async handleOpenInfo(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await getTeachCommentInfo({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infos = {
          id: this.dataList[itemIndex].id,
          bigTitle: `${this.dataList[itemIndex].title}周计划`,
          smallTitle: this.dataList[itemIndex].createTime,
          planTitleList,
          planDataList: this.setPlanDataList(dataSource),
          replyContent: dataSource.reply_content,
          realname: dataSource.realname,
          replyTime: dataSource.reply_time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    },
    setPlanDataList(dataSource) {
      if (dataSource.detail && dataSource.timecases) {
        const { detail, timecases } = dataSource;
        let targetList = [];
        const timeSpan = [];
        const detailFilter = {};

        timecases.map(item => {
          const newObj = {
            timeSpan: `${item.start_time}~${item.end_time}`,
            noon: item.start_time.slice(0, 2) * 1 < 13 ? '上午' : '下午'
          };
          timeSpan.push(newObj);
        });
        targetList.push(...timeSpan);

        Object.keys(detail).map(detailKey => {
          detailFilter[detailKey] = [];
          if (
            detail[detailKey].am &&
            detail[detailKey].am.filter(item => item.content !== '').length > 0
          ) {
            detailFilter[detailKey].push(
              ...detail[detailKey].am.filter(item => item.content !== '')
            );
          }
          if (
            detail[detailKey].pm &&
            detail[detailKey].pm.filter(item => item.content !== '').length > 0
          ) {
            detailFilter[detailKey].push(
              ...detail[detailKey].pm.filter(item => item.content !== '')
            );
          }
        });
        targetList.map((item, key1) => {
          Object.keys(detailFilter).map((dayKey, key2) => {
            item[`day${key2 + 1}`] = detailFilter[dayKey][key1] || '';
          });
        });
        return targetList;
      } else return [];
    },
    /**
     * ? async-functions
     */
    // ?? get-table-data
    async getTableData(params = {}) {
      const result = await getTeachPlanList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = JSON.parse(JSON.stringify(dataSource));
        this.page = data.page || 0;
        this.pageSize = data.page_size || 0;
        this.total = data.total || 0;
        this.totalPage = data.total_page || 0;
        if (data.list) {
          const { list } = data;
          this.dataList = [];
          list.map((item, index) => {
            this.dataList.push({
              number: index + 1,
              id: item.id,
              title: `${item.ClassName}${item.year}~${item.year + 1}学年${
                item.semester === 1
                  ? '第一学期'
                  : item.semester === 2
                  ? '第二学期'
                  : '未知学期'
              }第${item.week}周`,
              realname: item.realname,
              className: item.ClassName,
              createTime: item.CreateTime,
              operations:
                this.statusIndex === 0
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
      } else this.$Message.error('请求列表数据失败, 请稍后重试');
      // ? 再获取数据 (async step)
    },
    getTableByStatus(params) {
      this.statusIndex = params.isRemarked;
      this.getTableData(params);
    },
    getTableBySelects(params) {
      this.getTableData(params);
    },
    // ? modal-functions
    submitComment() {
      setTimeout(() => {
        this.$Message.success('评论成功');
      }, 500);
    },
    cancelModals() {
      this.isShowEditModal = false;
      this.isShowInfoModal = false;
    },
    refreshPage() {
      this.cancelModals();
      this.getTableData();
    }
  },

  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.approve-teach-plan {
  .table-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
