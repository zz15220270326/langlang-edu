<template>
  <div class="teach-plan">
    <!-- 教学计划-最上面的菜单 -->
    <my-menu @handleAll="handleAll" @addTeachPlan="addTeachPlan" />
    <!-- 计划表格 -->
    <plan-table
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @handleOperations="handleOperations"
      @getSelectItem="getSelectItem"
    />
    <!-- 底部: 统计 /分页 -->
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      :pageSize="pageSize"
      @changeTableData="changeTableData"
    />
    <!-- // ? 创建教学计划-Modal -->
    <Modal
      v-model="isShowCreateModal"
      class="create-teach-plan"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
      :transfer="false"
    >
      <add-teach-plan @closeAddModal="closeAddModal" />
    </Modal>
    <!-- // ? 教学计划详情弹窗 -->
    <Modal
      v-model="isShowDetailModal"
      class="check-plan-info"
      title="详情"
      width="1200"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      class="edit-teach-plan"
      :title="modalTitle"
      width="1200"
      :footer-hide="true"
      :transfer="false"
    >
      <add-teach-plan
        :id="edits.id"
        :edits="edits"
        @closeAddModal="closeAddModal"
      />
    </Modal>
  </div>
</template>

<script>
// ! 教学计划
// ? common / content components
// ?? plan-table
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
// ?? bottom-account
import BottomAccount from '@common/bottom-account';
// ?? child-components
import MyMenu from './t-p-menu';
import AddTeachPlan from './add-teach-plan';
import Info from './info';

// ? import mixins
import menuMix from './menuMix';
import contentMix from './contentMix';
import modalMix from './modalMix';

export default {
  name: 'TeachPlan',
  components: {
    // ? common / content components
    PlanTable,
    BottomAccount,
    // ? child-components
    MyMenu,
    AddTeachPlan,
    Info
  },
  mixins: [
    // ? 将教学计划的分内容混入
    menuMix,
    contentMix,
    modalMix
  ]
};
</script>
