<template>
  <div class="management-notice">
    <Spin fix v-show="isLoading">加载中...</Spin>
    <simple-menu @handleSearch="handleSearch" />
    <Divider :dashed="true" />
    <notice-content
      :isShowCheck="false"
      :dataList="dataList"
      @handleOperation="handleOperation"
    />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getDataByPage"
    />
    <base-footer />
    <Modal
      class-name="info-modal"
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <info-notice :infoItem="infoItem" />
    </Modal>
    <!--  -->
  </div>
</template>

<script>
// ? import components
import SimpleMenu from './components/SimpleMenu';
import NoticeContent from 'HomePage/NoticeActive/NoticeContent';
import InfoNotice from 'HomePage/NoticeActive/InfoNotice';
import BottomAccount from '@common/bottom-account';

import BaseFooter from '@common/base-footer';
// ? request
import { getEduList, getEduDetail } from '@/request/notice-active';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // ? time
  transformTimeStamp,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'ManagementNotice',
  components: {
    SimpleMenu,
    InfoNotice,
    NoticeContent,
    BottomAccount,

    BaseFooter
  },
  data: () => ({
    // ? content
    isLoading: false,
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    selectItems: [],
    // ? modal
    modalTitle: '',
    // ??add-modal
    isShowAddModal: false,
    addInputTitle: '',
    addInputContent: '',
    addImgList: [],
    // ?? info-modal
    isShowInfoModal: false,
    infoItem: {}
  }),
  computed: {
    ...mapState([
      'identify',
      'avatar',
      'uid',
      'defaultYear',
      'defaultMonth',
      'defaultDay',
      'userName'
    ])
  },
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContentData(params);
    },
    // ? content
    async getContentData(params = { pageSize: 20 }) {
      const result = await getEduList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource).data || deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        if (data.list) {
          this.setDataList(data.list);
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
    },
    setDataList(list = []) {
      // console.log(list)
      if (list.length > 0) {
        this.dataList = [];
        list.map((item, index) => {
          this.dataList.push({
            number: index + 1,
            id: item.id,
            title: item.title,
            // content: item.content,
            isDeleted: true,
            // charger: item.audience_user || this.userName,
            // avatar: item.avatar || this.avatar,
            type: '主管部门通知',
            color: 'red',
            time: transformTimeStamp(item.createTime),
            operations: [
              {
                tag: '查看详情',
                type: 'info'
              }
            ]
          });
        });
      }
    },
    getDataByPage(p) {
      const params = {
        page: p.page,
        pageSize: p.page_size
      };
      this.getContentData(params);
    },
    // ? modal
    handleOperation(btnIdx, itemIdx) {
      this.openInfoModal(itemIdx);
    },
    async openInfoModal(itemIdx = 0) {
      const { id, time, title } = this.dataList[itemIdx];
      const result = await getEduDetail({ id });
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.infoItem = {
          title,
          charger: '教育局管理人',
          content: info.noticeInfo.content,
          time
        };
        this.modalTitle = '详情';
        this.isShowInfoModal = true;
      }
    }
  },
  created() {
    this.getContentData();
  }
};
</script>

<style lang="less" scoped>
.management-notice {
  color: #666;
}
</style>
