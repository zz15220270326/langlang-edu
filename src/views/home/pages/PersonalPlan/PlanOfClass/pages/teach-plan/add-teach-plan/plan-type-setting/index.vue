<template>
  <!-- 计划类型设置弹窗 -->
  <div class="plan-type-setting" v-show="isShowPlanTypeSetting">
    <my-header @getTypeName="getTypeName" @addToList="addToList" />
    <my-body
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @handleType="handleType"
    />
    <my-footer
      @handleEdit="handleEdit"
      @handleAdd="handleAdd"
      @handleCancel="handleCancel"
    />
    <bottom-account
      :total="total"
      :pageSize="pageSize"
      @changeTableData="changeTableData"
    />
    <!-- 批量编辑的弹窗 -->
    <Modal
      v-model="isShowEditAll"
      :title="editModalTitle"
      width="666"
      :footer-hide="true"
    >
      <edit-all :propItems="editItems" @closeEditModal="closeEditModal" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import MyHeader from './PTSHeader';
import MyBody from './PTSBody';
import MyFooter from './PTSFooter';
import EditAll from './EditAllContent';

import BottomAccount from '@common/bottom-account';

// ? mixins
import headerMix from './headerMix';
import bodyMix from './bodyMix';
import footerMix from './footerMix';

export default {
  name: 'PlanTypeSetting',
  components: {
    MyHeader,
    MyBody,
    MyFooter,
    EditAll,

    BottomAccount
  },
  mixins: [headerMix, bodyMix, footerMix],

  props: {
    isShowPlanTypeSetting: {
      type: Boolean,
      default: true
    }
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.plan-type-setting {
  height: 32rem;
  width: 100%;
  overflow: auto;
}
</style>
