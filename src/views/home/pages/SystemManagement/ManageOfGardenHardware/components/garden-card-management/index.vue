<template>
  <div class="garden-card-management">
    <g-c-m-menu />
    <s-m-table
      :titleList="titleList"
      :dataList="dataList"
      @editItem="editItem"
    />
    <bottom-account :total="total" />
    <Modal
      v-model="isShowEditModal"
      :title="modalTitle"
      width="850"
      :footer-hide="true"
    >
      <edit-modal-content
        :editName="editName"
        :editDesc="editDesc"
        @handleSubmitEdit="handleSubmitEdit"
        @handleCancelEdit="handleCancelEdit"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import GCMMenu from './Menu';
import EditModalContent from '../EditModalContent';

import SMTable from 'HomePage/SystemManagement/SMTable';
import BottomAccount from '@common/bottom-account';

// ? import mixins
import gardenCardMix from './gardenCardMix';

export default {
  name: 'GardenCardManagement',

  components: {
    GCMMenu,
    EditModalContent,

    SMTable,

    BottomAccount
  },

  mixins: [gardenCardMix],

  data: () => ({
    // ? modal-data
    modalTitle: '',
    isShowEditModal: false,
    editName: '',
    editDesc: ''
  }),

  props: {},

  computed: {},

  methods: {
    // ? modal-functions
    editItem(currentIndex) {
      this.$Message.info(`编辑第${currentIndex + 1}项`);
      const { name, desc } = this.dataList[currentIndex];
      this.editName = name;
      this.editDesc = desc;
      this.modalTitle = '编辑';
      this.isShowEditModal = true;
    },
    handleSubmitEdit() {
      setTimeout(() => {
        // this.dataList[this.currentItemIndex]
        this.$Message.success('保存成功');
        this.modalTitle = '';
        this.isShowEditModal = false;
      }, 666);
    },
    handleCancelEdit() {
      this.$Message.error('您取消了本次编辑');
      this.modalTitle = '';
      this.isShowEditModal = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
