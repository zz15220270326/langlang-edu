<template>
  <div class="other-plan">
    <my-menu
      @handleSearch="handleSearch"
      @deleteItems="deleteItems"
      @createPlan="createPlan"
      @getClassId="getClassId"
      @uploadStatus="getStatus"
    />
    <Modal
      class="create-plan-modal"
      v-model="isShowAddModal"
      title="创建计划"
      :footer-hide="true"
      width="1080"
    >
      <add @refreshPage="getOtherPlanInfo" @closeModals="closeModals" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      :title="infoModalTitle"
      width="1080"
      :footer-hide="true"
    >
      <info v-bind="infos" />
    </Modal>
    <Modal
      class="edit-plan-modal"
      v-model="isShowEditModal"
      :title="editModalTitle"
      width="1080"
      :footer-hide="true"
    >
      <add
        :id="edits.id"
        :edits="edits"
        @confirmEditPlan="confirmEditPlan"
        @closeModals="closeModals"
      />
    </Modal>
    <PlanTable
      :titleList="titleList"
      :dataList="dataList"
      @handleOperations="handleOperations"
      :tableIsLoading="tableIsLoading"
      @getSelectItem="getSelectItem"
    />
    <bottom-account
      :total="total"
      :totalPage="totalPage"
      @changeTableData="changeTableData"
    />
  </div>
</template>

<script>
// ? import vuex
import { mapState } from 'vuex'
// ? import mixins

import menuMix from './menuMix'
import contentMix from './contentMix'
import modalMix from './modalMix'
// ? import request
// ? common / content components
// ? plan-table
// ?? bottom-account
import BottomAccount from '@common/bottom-account'
// ? child-components
// ?? menu
import MyMenu from './OtherQueryMenu'
// ?? children
import Add from './add-plan-content'
import Info from 'HomePage/PersonalPlan/InfoContent'

export default {
  name: 'OtherPlan',
  components: {
    // ? common / content components
    // PlanTable,
    BottomAccount,
    // ? child-components
    MyMenu,
    Add,
    Info
  },
  mixins: [menuMix, contentMix, modalMix],

  computed: {
    ...mapState(['identify'])
  }
}
</script>

<style lang="less" scoped>
.other-plan {
  .create-plan-modal {
    color: #666;
  }
}
</style>
