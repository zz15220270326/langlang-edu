<template>
  <div class="system-notice">
    <Spin fix v-show="isLoading">加载中...</Spin>
    <simple-menu @handleSearch="handleSearch" />
    <Divider :dashed="true" />
    <s-n-content :dataList="dataList" @handleClickItem="handleClickItem" />
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
    />
    <base-footer />
    <Modal
      v-model="isShowInfoModal"
      :title="modalTitle"
      width="960"
      :footer-hide="true"
    >
      <system-notice-info :infoItem="infoItem" />
    </Modal>
  </div>
</template>

<script>
// ? import components
import SimpleMenu from './components/SimpleMenu';
import SNContent from './components/SNContent';
import SystemNoticeInfo from './components/SystemNoticeInfo';

import BottomAccount from '@common/bottom-account';
import BaseFooter from '@common/base-footer';

// ? request
import { getSystemList } from '@/request/notice-active';
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

export default {
  name: 'SystemNotice',
  components: {
    SimpleMenu,
    SNContent,
    SystemNoticeInfo,

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
    // ? modal
    infoItem: {},
    // ? modal-data
    modalTitle: '',
    isShowInfoModal: false
  }),
  methods: {
    // ? menu
    handleSearch(params) {
      this.getContent(params);
    },
    // ? content
    async getContent(params = { pageSize: this.pageSize }) {
      const result = await getSystemList(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const data = deepCopyObj(dataSource);
        this.page = data.page || 0;
        this.total = data.count || 0;
        this.totalPage = data.pageCount || 0;
        this.dataList = [];
        data.list && this.setDataList(data.list);
      } else
        this.$Message.error(
          `获取数据失败, 原因: ${handleErrorCode(result.code)}`
        );
    },
    setDataList(list = []) {
      list.forEach((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          isTop: item.is_top,
          title: item.title,
          summary: item.summary,
          content: item.content,
          thumbnails: item.thumbnails || '',
          iconUrl: item.icon_url || '',
          time: transformTimeStamp(item.createTime),
          operations: [
            {
              tag: '查看详情',
              type: 'info'
            }
          ]
        });
      });
    },
    // ? modal
    handleClickItem(crtIdx) {
      this.infoItem = this.dataList[crtIdx];
      this.modalTitle = '详情';
      this.isShowInfoModal = true;
    }
  },
  created() {
    this.getContent();
  }
};
</script>

<style lang="less" scoped>
// .system-notice {
//   color: #666;
//   .ivu-divider {
//     background-color: pink;
//   }
// }
</style>
