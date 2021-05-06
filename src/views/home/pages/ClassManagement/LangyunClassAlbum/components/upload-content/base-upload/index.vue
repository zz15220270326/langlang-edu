<template>
  <div class="base-upload">
    <my-menu @handleSearch="handleSearch" />
    <div class="content" v-if="currentImgList && currentImgList.length > 0">
      <div
        class="render-image"
        v-for="(item, key) in currentImgList"
        :key="key"
      >
        <img :src="item.src !== '' ? item.src : platformUrl" alt="" />
        <Checkbox v-model="item.isChecked" @on-change="handleSelectPic">
          选择图片
        </Checkbox>
      </div>
    </div>
    <div class="content" v-else>
      敬请期待
    </div>
    <div class="bottom">
      <Button
        v-for="(btn, idx) of operations"
        :key="btn.tag"
        shape="circle"
        :type="btn.type"
        size="default"
        :disabled="idx === 1 && currentImgList.every(img => !img.isChecked)"
        @click.native="handleOperations(idx)"
      >
        {{ btn.tag }}
      </Button>
    </div>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
  </div>
</template>

<script>
import './index.less';
// ? components
import MyMenu from './ClassMenu';
import DivPage from '@common/bottom-account';
// ? request
import { getAddImage } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? eventBus
import caBus from '../../../caBus';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'BaseUpload',
  components: {
    MyMenu,
    DivPage
  },
  data: () => ({
    page: 0,
    pageSize: 12,
    total: 0,
    totalPage: 0,
    operations: [
      {
        tag: '全部选择',
        type: 'primary'
      },
      {
        tag: '确认选择',
        type: 'info'
      }
    ],
    currentImgList: [],
    selectList: []
  }),
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    // ? menus
    handleSearch(params) {
      this.getImageContent(params);
    },
    // ? contents
    async getImageContent(params = { pageSize: this.pageSize }) {
      const result = await getAddImage(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // this.$Message.success({ content: 'Success', background: true });
        // console.log(dataSource);
        const { album_list, savedPics } = deepCopyObj(dataSource);
        album_list.length && caBus.$emit('getAlbumListInfo', album_list);
        Object.getOwnPropertyNames(savedPics).length &&
          this.setImgInfo(savedPics);
      } else this.$Message.error(`请求内容失败, 原因: ${result.msg}`);
    },
    setImgInfo(pics) {
      this.page = pics.page || 0;
      this.total = pics.count || 0;
      this.totalPage = pics.pageCount || 0;
      this.currentImgList = [];
      pics.list && pics.list.length && this.setImgList(pics.list);
    },
    setImgList(list = []) {
      // console.log(list);
      list.forEach((item, index) => {
        this.currentImgList.push({
          number: index + 1,
          src: item.url || this.platformUrl,
          pId: item.pic_id || new Date().getTime(),
          isChecked: false
        });
      });
    },
    handleSelectPic() {
      if (this.currentImgList.every(img => img.isChecked)) {
        this.operations[0].tag = '全部取消';
        this.operations[0].type = 'warning';
      } else {
        this.operations[0].tag = '全部选择';
        this.operations[0].type = 'primary';
      }
    },
    handleOperations(btnIdx) {
      switch (btnIdx) {
        case 0:
          this.handleAll();
          break;
        case 1:
          this.handleSelect();
          break;
        default:
          break;
      }
    },
    handleAll() {
      const { tag } = this.operations[0];
      switch (tag) {
        case '全部选择':
          this.currentImgList.forEach(img => (img.isChecked = true));
          this.operations[0].tag = '全部取消';
          this.operations[0].type = 'warning';
          break;
        case '全部取消':
          this.currentImgList.forEach(img => (img.isChecked = false));
          this.operations[0].tag = '全部选择';
          this.operations[0].type = 'primary';
          break;
      }
    },
    handleSelect() {
      this.currentImgList.forEach(item => {
        if (item.isChecked) {
          this.selectList.push({
            number: item.number,
            src: item.src,
            pId: item.pId
          });
        }
      });
      this.$Message.success('选择图片成功');
      this.$emit('handleBaseImg', this.selectList);
      this.clearItems();
    },
    getContentByPage(params) {
      this.getImageContent(params);
    },
    clearItems() {
      this.selectList = [];
      this.currentImgList.forEach(item => {
        item.isChecked = false;
      });
      this.operations[0].tag = '全部选择';
      this.operations[0].type = 'primary';
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.getImageContent();
  },
  mounted() {
    caBus.$on('refreshGetAlbums', () => this.getImageContent());
  },
  beforeDestroy() {
    caBus.$off('refreshGetAlbums');
  }
};
</script>
