<template>
  <!-- 已添加计划弹窗 -->
  <div class="added-plan" v-show="isShowAddedPlan">
    <Table border :columns="titleList" :data="dataList">
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="(item, key) in row.operations"
          :key="key"
          :type="item.type"
          :disabled="key === 1 && row.disabled"
          @click.native="handlePlan(key, index)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
    <bottom-account :total="total" />
    <!-- modal -->
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="700"
      :footer-hide="true"
    >
      <edit-plan v-bind="edits" @cancelEditPlan="cancelEditPlan" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import BottomAccount from '@common/bottom-account';

import EditPlan from '../add-new-plan';

// ? import request
import {
  getTimePlanList,
  getTimePlanDetail,
  deleteTimePlan
} from '@/request/plan/1-class-plan';

// ? utils
import { getDataSource, checkDataSource, handleOpResult } from '@/utils';

export default {
  name: 'AddedPlan',
  components: {
    BottomAccount,
    EditPlan
  },
  data: () => ({
    titleList: [
      {
        title: '方案名称',
        key: 'name',
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
    total: 0,
    totalPage: 0,
    // ? modal-data
    modalTitle: '',
    isShowEditModal: false,
    edits: {}
  }),
  props: {
    isShowAddedPlan: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async getPlanTypes() {
      const result = await getTimePlanList();
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.page = dataSource.page ? dataSource.page : 0;
        this.pageSize = dataSource.page_size ? dataSource.page_size : 0;
        this.total = dataSource.total ? dataSource.total : 0;
        this.totalPage = dataSource.total_page ? dataSource.total_page : 0;
        if (dataSource.list) {
          const { list } = dataSource;
          this.dataList = [];
          list.map(item => {
            this.dataList.push({
              id: item.id,
              gardenId: item.garden_id,
              type: item.type,
              name: item.name,
              disabled: item.used === 1 ? true : false,
              operations: [
                {
                  tag: '编辑',
                  type: 'primary'
                },
                {
                  tag: '删除',
                  type: 'error'
                }
              ]
            });
          });
        }
      } else {
        this.$Message.error('查询失败, 请稍后重试');
      }
    },
    handlePlan(buttonIndex, rowIndex) {
      switch (buttonIndex) {
        case 0:
          // ? 编辑操作
          this.handleEditItem(rowIndex);
          break;
        case 1:
          // ? 删除操作
          this.handleDeleteItem(rowIndex);
          break;
      }
    },
    async handleEditItem(rowIndex) {
      this.$Message.info(`编辑第${rowIndex + 1}项`);
      const { id } = this.dataList[rowIndex];
      // ? 获取旧方案
      const result = await getTimePlanDetail(id);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        if (dataSource.list) {
          const { list } = dataSource;
          let propList = [];
          list.map(item => {
            const { start_time, end_time } = item;
            propList.push({
              time: `${start_time}-${end_time}`,
              startTime: start_time,
              endTime: end_time,
              operations: [
                {
                  tag: '编辑',
                  type: 'primary'
                },
                {
                  tag: '删除',
                  type: 'error'
                }
              ]
            });
          });
          this.edits = {
            propName: this.dataList[rowIndex].name,
            propList,
            id
          };
          this.modalTitle = '编辑方案';
          this.isShowEditModal = true;
        }
      }
    },
    handleDeleteItem(rowIndex) {
      this.$Modal.confirm({
        title: `删除第${rowIndex + 1}项方案`,
        content: '是否删除?删除后数据无法恢复',
        onOk: () => this.confirmDelete(rowIndex),
        onCancel: () => this.cancelDelete()
      });
    },
    async confirmDelete(rowIndex) {
      const { id } = this.dataList[rowIndex];
      const result = await deleteTimePlan({ id });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getPlanTypes();
      } else {
        this.$Message.error('删除失败, 请稍后重试');
      }
    },
    cancelDelete() {
      this.$Message.info('您取消了本次删除操作');
    },
    cancelEditPlan() {
      this.isShowEditModal = false;
    },
    updateAddedPlan() {
      this.$bus.$on('updateAddedPlan', () => {
        this.getPlanTypes();
      });
    }
  },
  created() {
    this.getPlanTypes();
  },
  mounted() {
    this.updateAddedPlan();
  }
};
</script>

<style lang="less" scoped>
.added-plan {
  height: 30rem;
  width: 100%;
  overflow: auto;
  .ivu-btn {
    margin: 0 0.6rem;
  }
}
</style>
