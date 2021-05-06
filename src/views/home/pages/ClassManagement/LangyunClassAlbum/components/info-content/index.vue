<template>
  <div class="info-content">
    <div class="empty-wrapper" v-show="imgList.length === 0">
      <Divider>
        <h1>暂无内容</h1>
      </Divider>
      <Divider>
        <h2>敬请期待</h2>
      </Divider>
    </div>
    <div class="img-wrapper">
      <my-content
        v-for="(itm, idx) of imgList"
        :key="idx + 1 + ' ' + itm"
        :item="itm"
        :index="idx"
        @singleOpsShow="singleOpsShow"
        @singleOpsHide="singleOpsHide"
        @checkSelectItem="checkSelectItem"
        @handleShowAll="handleShowAll"
        @handleEditItem="handleEditItem"
        @deleteItem="confirmDelete"
      />
    </div>
    <div-page
      size="small"
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
    <btns
      v-show="imgList.length"
      :operations="operations"
      @handleBottomOperations="handleBottomOps"
    />
    <Modal
      v-model="isShowInfoModal"
      title="预览所有内容"
      width="850"
      :footer-hide="isShowInfoModal"
      :draggable="isShowInfoModal"
    >
      <my-carousel v-if="imgList.length" :propItem="imgList" />
      <btns
        :operations="[{ tag: '关闭会话', type: 'info' }]"
        @handleBottomOperations="closeModals"
      />
    </Modal>
    <Modal
      title="编辑内容"
      v-model="isShowEditModal"
      width="960"
      :footer-hide="true"
    >
      <edit-info
        :propItem="edits"
        :cover="cover"
        @closeModals="closeModals"
        @closeAndRefreshContent="closeAndRefreshContent"
      />
    </Modal>
    <Modal
      v-model="isShowUploadModal"
      title="上传图片"
      width="960"
      :footer-hide="isShowUploadModal"
    >
      <upload-info />
    </Modal>
  </div>
</template>

<script>
import './index.less';
// ? components
import MyContent from './ContentItem';
import DivPage from '@common/bottom-account';
import Btns from '@common/modal-bottom-btns';

import MyCarousel from './MyCarousel';
import EditInfo from './EditInfo';
import UploadInfo from '../upload-content';

// ? request
import {
  getAlbumDetail,
  deletePic,
  getEditPic
} from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? mixins
import getImgByIcon from '@/mixins/Common/getImgByIcon';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'InfoContent',
  components: {
    // ShowSwiper,
    MyContent,
    DivPage,
    Btns,

    MyCarousel,
    EditInfo,
    UploadInfo
  },
  mixins: [getImgByIcon],
  data: () => ({
    // ? operations
    imgList: [],
    albumId: '',
    page: 0,
    pageSize: 8,
    total: 0,
    totalPage: 0,
    operations: [
      {
        tag: '全部选择',
        type: 'info' // icon: 'ios-add'
      },
      // {
      //   tag: '上传图片',
      //   type: 'primary' //icon: 'ios-cloud-upload'
      // },
      {
        tag: '批量删除',
        type: 'error' //icon: 'ios-trash-outline'
      }
    ],
    // ? edit-info-modal
    // ?? swiper-modal
    isShowInfoModal: false,
    // ?? edit-info-modal
    isShowEditModal: false,
    edits: {},
    isShowUploadModal: false
  }),
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    cover: [Number, String]
  },
  watch: {
    id(newVal, oldVal) {
      if (parseInt(newVal) > 0) {
        this.getInfoContent({ id: newVal, pageSize: this.pageSize });
        return;
      }
      if (parseInt(oldVal) > 0) {
        this.getInfoContent({ id: oldVal, pageSize: this.pageSize });
        return;
      }
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    // ? content
    async getInfoContent(params = {}) {
      const result = await getAlbumDetail(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { list, album_id } = deepCopyObj(dataSource);
        this.albumId = album_id || '';
        this.page = list.page || 0;
        this.total = list.count || 0;
        this.totalPage = list.pageCount || 0;
        this.imgList = [];
        Array.isArray(list.list) &&
          list.list.length &&
          this.setImgList(list.list);
      } else this.$Message.error(`请求相册详情失败, 原因: ${result.msg}`);
    },
    setImgList(list = []) {
      list.forEach(async (item, index) => {
        this.imgList.push({
          number: index + 1,
          albumId: item.album_id || 0,
          pId: item.pic_id || new Date().getTime(),
          src: await this.getImgByIcon(item.pic_id),
          info: item.info || '',
          sourceMeterial: item.is_source_material || 0,
          isChecked: false,
          isShow: false,
          operations: [
            {
              tag: '详情',
              type: 'info'
            },
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
    },
    handleBottomOps(btnTag) {
      switch (btnTag) {
        case '全部选择':
          this.selectAll();
          break;
        case '全部取消':
          this.cancelAll();
          break;
        case '上传图片':
          this.handleUpload();
          break;
        case '批量删除':
          this.deleteItems();
          break;
      }
    },
    selectAll() {
      this.imgList.forEach(img => (img.isChecked = true));
      this.operations[0].tag = '全部取消';
      this.operations[0].type = 'warning';
    },
    cancelAll() {
      this.imgList.forEach(img => (img.isChecked = false));
      this.operations[0].tag = '全部选择';
      this.operations[0].type = 'info';
    },
    singleOpsShow(crtIdx) {
      this.imgList[crtIdx].isShow = true;
    },
    singleOpsHide(crtIdx) {
      this.imgList[crtIdx].isShow = false;
    },
    handleUpload() {
      this.isShowUploadModal = true;
    },
    checkSelectItem() {
      if (this.imgList.every(img => img.isChecked)) {
        this.operations[0].tag = '全部取消';
        this.operations[0].type = 'warning';
        return;
      } else {
        this.operations[0].tag = '全部选择';
        this.operations[0].type = 'info';
      }
    },
    getContentByPage(params) {
      let newParams = {
        id: this.id,
        ...params
      };
      this.getInfoContent(newParams);
    },
    deleteItems() {
      if (this.imgList.every(img => !img.isChecked)) {
        this.$Message.warning('请选择要删除的内容');
        return;
      }
      this.$Modal.confirm({
        title: '批量删除?',
        content: '确认删除? 删除后数据无法恢复, 请谨慎操作!',
        onOk: () => {
          const ids = this.imgList
              .filter(img => img.isChecked)
              .map(img => img.pId)
              .toString(),
            albumId = this.albumId;
          this.confirmDelete({ ids, albumId });
        }
      });
    },
    async confirmDelete({ ids, albumId }) {
      const result = await deletePic({ ids, albumId });
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getInfoContent({ id: this.id, pageSize: this.pageSize });
      } else this.$Message.error(`删除失败, 原因: ${result.msg}`);
    },
    // ? modals
    handleShowAll() {
      this.$Message.info('预览图片...');
      this.isShowInfoModal = true;
    },
    async handleEditItem(crtIdx) {
      const propItem = this.imgList[crtIdx],
        params = {
          pic_id: propItem.pId,
          album_id: propItem.albumId
        },
        result = await getEditPic(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { data, albumList } = deepCopyObj(dataSource);
        this.edits = {
          ...propItem,
          ...data,
          albumList
        };
        console.log(this.edits);
        this.isShowEditModal = true;
      }
    },
    closeModals() {
      this.isShowInfoModal = false;
      this.isShowEditModal = false;
      this.isShowUploadModal = false;
    },
    closeAndRefreshContent() {
      this.closeModals();
      this.$emit('closeAndRefreshContent');
    }
  }
};
</script>
