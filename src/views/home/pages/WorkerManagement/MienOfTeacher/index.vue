<template>
  <div class="teacher-specialty">
    <my-menu
      @handleSearch="handleSearch"
      @confirmSelectAll="confirmSelectAll"
      @cancelSelectAll="cancelSelectAll"
      @handleDeleteItems="handleDeleteItems"
      @addSpecial="addSpecial"
    />
    <Spin v-if="contentLoading" :fix="true">
      玩命加载中...
    </Spin>
    <my-content
      :teacherInfo="teacherInfo"
      :totalPage="totalPage"
      @checkInfo="openInfoModal"
      @showButton="showButton"
      @hideButton="hideButton"
      @editItem="openEditModal"
      @deleteItem="deleteItem"
      @checkedItem="checkedItem"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      :style="{ position: 'relative', bottom: '-0.5rem', left: '10%' }"
      @changeTableData="getContentByPage"
    />
    <!-- :style="{ position: 'fixed', bottom: '-0.5rem', left: '20rem' }" -->
    <!-- modals -->
    <Modal
      v-model="isShowAddModal"
      class="add-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <add @closeModals="closeModals" @refreshPage="getContentData" />
    </Modal>
    <Modal
      v-model="isShowInfoModal"
      class="info-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info :checkedTeacher="checkedTeacher" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      class="edit-modal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <edit
        v-bind="checkedTeacher"
        @closeModals="closeModals"
        @refreshPage="getContentData"
      />
    </Modal>
  </div>
</template>

<script>
// ? import components
import MyMenu from './components/MienMenu';
import MyContent from './components/MienContent';
import DivPage from '@common/bottom-account';

import Info from './components/TeacherInfo';
import Edit from './components/AddSpecialty';
import Add from './components/AddSpecialty';

// ? request
import { getTeacherList, deleteTeacherMien } from '@/request/staff-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? obj
  deepCopyObj,
  // ? time
  getAgeByBirthday
} from '@/utils';
import { classGroupEvent } from './events';
// ? import vuex
import { mapState } from 'vuex';

export default {
  name: 'TeacherSpecialty',
  components: {
    MyMenu,
    MyContent,
    DivPage,

    Add,
    Info,
    Edit
  },
  data: () => ({
    // ? menu
    selectMenu: [],
    defaultTitle: '',
    // ? menu-data
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '全选',
        type: 'success'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ],
    teacherInfo: [],
    contentLoading: false,
    checkedTeacher: {},
    // ? content-data
    page: 0,
    pageSize: 8,
    total: 0,
    totalPage: 0,
    // ? modal-data
    // ? common
    modalTitle: '',
    isShowInfoModal: false,
    isShowEditModal: false,
    isShowAddModal: false
  }),
  computed: {
    ...mapState(['teacherName', 'platformUrl'])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContentData(params);
    },
    confirmSelectAll() {
      this.teacherInfo.map(item => (item.isChecked = true));
    },
    cancelSelectAll() {
      this.teacherInfo.map(item => (item.isChecked = false));
    },
    handleDeleteItems() {
      const list = this.teacherInfo.filter(item => item.isChecked);
      if (!list.length) {
        this.$Message.warning('请选择要删除的教师信息');
      } else {
        const ids = list.map(item => item.id).toString();
        this.$Modal.confirm({
          title: '批量删除',
          content: '是否删除选中的内容? 删除后数据无法恢复, 请谨慎操作!',
          onOk: () => this.confirmDelete(ids)
        });
      }
    },
    async confirmDelete(ids) {
      this.$Spin.show();
      const result = await deleteTeacherMien({ ids });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getContentData();
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
      this.$Spin.hide();
    },
    addSpecial() {
      this.isShowAddModal = true;
      this.modalTitle = '添加风采';
    },
    // ? content
    async getContentData(params = { pageSize: this.pageSize }) {
      this.contentLoading = true;
      const result = await getTeacherList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, classGroup } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.teacherInfo = [];
        if (Array.isArray(data.list) && data.list.length > 0)
          this.getContent(data.list);
        classGroupEvent.$emit('classGroupEvent', classGroup);
      } else this.$Message.error(`查询失败, 原因: ${result.msg}`);
      this.contentLoading = false;
    },
    getContent(list = []) {
      list.forEach(async (item, index) => {
        this.teacherInfo.push({
          number: index + 1,
          id: item.id,
          uid: item.uid,
          name: item.realname,
          birthday: item.user_info.birthday,
          age: getAgeByBirthday(item.user_info.birthday) || '',
          identify: item.user_info.rolename || '教师',
          manage_class: item.class_names,
          featureInfo: item.feature_info,
          isChecked: false,
          showButton: false,
          icon: item.icon || '',
          icon_url: item.icon_url || '',
          album: item.feature_info.images,
          album_url: item.album_url || ''
        });
        const { icon } = item;
        if (icon.length) {
          const result = await getPicById({ icon }),
            imgData = getDataSource(result);
          if (checkDataSource(imgData)) {
            this.teacherInfo[index].img_url = imgData;
          } else this.teacherInfo[index].img_url = this.platformUrl;
        }
      });
    },
    getContentByPage(params) {
      this.getContentData(params);
    },
    getInfos(crtIdx = 0) {
      const {
          id,
          icon,
          name,
          identify,
          age,
          birthday,
          featureInfo,
          album,
          album_url
        } = this.teacherInfo[crtIdx],
        { motto, honor, images } = featureInfo;
      return {
        id,
        icon,
        name,
        identify,
        age,
        birthday,
        featureInfo,
        motto,
        honor,
        images,
        album,
        album_url
      };
    },
    async openInfoModal(crtIdx = 0) {
      this.checkedTeacher = this.getInfos(crtIdx);
      this.modalTitle = '教师风采 - 详情';
      this.isShowInfoModal = true;
    },
    showButton(index) {
      this.teacherInfo[index].showButton = true;
    },
    hideButton(index) {
      this.teacherInfo[index].showButton = false;
    },
    async openEditModal(event, crtIdx) {
      event.stopPropagation();
      this.$Message.info(`编辑第${crtIdx + 1}项`);
      this.checkedTeacher = this.getInfos(crtIdx) || {};
      this.modalTitle = '教师风采 - 编辑';
      this.isShowEditModal = true;
    },
    deleteItem(event, crtIdx) {
      event.stopPropagation();
      this.$Modal.confirm({
        title: `删除第${crtIdx + 1}项`,
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.teacherInfo[crtIdx].id;
          this.confirmDelete(ids);
        }
      });
    },
    checkedItem(isChecked, selectIndex) {
      this.teacherInfo[selectIndex].isChecked = isChecked;
      const isSelectAll = !this.teacherInfo.some(
        item => item.isChecked === false
      );
      if (isSelectAll) {
        this.$bus.$emit('confirmAllTeacherSpecialItem');
      } else {
        this.$bus.$emit('notAllTeacherSpecialItem');
      }
    },
    // ? modal
    closeModals() {
      this.isShowAddModal = false;
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
    }
  },

  created() {
    this.getContentData();
  }
};
</script>
