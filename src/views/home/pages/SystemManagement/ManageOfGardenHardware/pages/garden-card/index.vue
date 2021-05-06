<template>
  <div class="garden-card-management">
    <my-menu @handleSearch="handleSearch" />
    <my-content
      :titleList="titleList"
      :dataList="dataList"
      :tableIsLoading="tableIsLoading"
      @editItem="openEdit"
    />
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getTableByPage"
    />
    <Modal
      v-model="isShowEditModal"
      title="编辑内容"
      width="850"
      :footer-hide="true"
    >
      <edit-content
        v-bind="edits"
        @handleSubmitEdit="handleEditGardenboard"
        @handleCancelEdit="handleCancelEdit"
      />
    </Modal>
  </div>
</template>

<script>
// ? components
import MyMenu from './Menu';
import EditContent from '../EditModalContent';

import MyContent from 'HomePage/SystemManagement/SMTable';
import DivPage from '@common/bottom-account';
// ? request
import {
  getGardenBoardList,
  getEditGardenBoardInfo,
  editGardenBoard
} from '@/request/system-management';
// ? utils
import {
  // ? times
  dateToMs,
  transformToYMD,
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import {
  // ? datas
  gardenCardTitle,
  // ? functions
  handleNetworkText,
  handleAccountText
} from '../utils';

export default {
  name: 'GardenCardManagement',

  components: {
    MyMenu,
    EditContent,
    MyContent,

    DivPage
  },
  data: () => ({
    // ? contents
    titleList: gardenCardTitle,
    dataList: [],
    tableIsLoading: false,
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modals
    isShowEditModal: false,
    edits: {}
  }),
  methods: {
    // ? menus
    handleSearch(params) {
      this.getTableData(params);
    },
    // ? contents
    async getTableData(params = { pageSize: this.pageSize }) {
      this.tableIsLoading = true;
      const result = await getGardenBoardList(params),
        dataSource = getDataSource(result);
      if (checkDataSource) {
        const { data } = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && this.setDataList(data.list);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.tableIsLoading = false;
    },
    setDataList(list = []) {
      // ? console.log(list);
      list.length &&
        list.map((item, index) => {
          this.dataList.push({
            number: index + 1,
            id: item.id,
            gardenId: item.garden_id,
            createTime: transformToYMD(dateToMs(item.create_time)),
            name: item.name,
            serialNumber: item.serial_number,
            loginAccount: '暂无账号字段',
            loginUser: '暂无用户字段',
            networkStatus: handleNetworkText(item.online), //item.online
            accountStatus: handleAccountText(item.login_status), // item.login_status
            remark: item.remark,
            desc: item.remark ? item.remark : '暂无备注',
            operation: {
              tag: '编辑',
              type: 'primary'
            }
          });
        });
    },
    // ? modals
    async openEdit(crtIdx) {
      const { id } = this.dataList[crtIdx],
        result = await getEditGardenBoardInfo({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.$Message.info(`编辑第${crtIdx + 1}项`);
        const { name, remark } = deepCopyObj(dataSource);
        this.edits = {
          id,
          editName: name || '',
          editDesc: remark || ''
        };
        this.isShowEditModal = true;
      }
    },
    async handleEditGardenboard(body) {
      const result = await editGardenBoard(body);
      if (handleOpResult(result)) {
        this.$Message.success('编辑成功');
        this.getTableData();
      } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
      this.isShowEditModal = false;
    },
    handleCancelEdit() {
      this.$Message.info('您取消了本次编辑');
      this.isShowEditModal = false;
    },
    getTableByPage(params) {
      this.getTableData(params);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped></style>
