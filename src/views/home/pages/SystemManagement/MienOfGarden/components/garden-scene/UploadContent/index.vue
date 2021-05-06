<template>
  <div class="upload-wrapper">
    <div class="album-wrapper">
      <content-item
        v-for="(itm, idx) of imgs"
        :key="idx + itm.src"
        :item="itm"
        :index="idx"
        @getCrtItemName="getCrtItemName"
        @updateCrtItem="updateCrtItem"
        @removeCrtItem="removeCrtItem"
      />
    </div>
    <div class="click-upload">
      <Upload
        :action="url"
        multiple
        type="drag"
        :max-size="2048"
        :before-upload="getFile"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p type="primary">点击或拖拽到此处即可上传图片</p>
        </div>
      </Upload>
    </div>
    <!-- 照片库 上传 提交 -->
    <btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? components
import Btns from '@common/modal-bottom-btns';

import ContentItem from './ContentItem';

// ? request
import { addAppearance } from '@/request/system-management';
// ? utils
import {
  // ? request
  handleOpResult
  // ? arr / obj
  // deepCopyObj
} from '@/utils';
// ? mixins
import imgsMix from '@/mixins/Common/imgsMixins';
// ? bus
import menuBus from '../menuBus';

export default {
  name: 'UploadImgs',
  components: {
    Btns,
    ContentItem
  },
  mixins: [imgsMix],

  data: () => ({
    operations: [
      {
        tag: '上传',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),

  props: {},

  computed: {},

  methods: {
    getCrtItemName(value, crtIdx) {
      if (value.length) {
        this.imgs[crtIdx].name = value;
      } else delete this.imgs[crtIdx].name;
    },
    updateCrtItem(pId) {
      this.$Message.info('修改当前照片');
      console.log(pId);
    },
    removeCrtItem(crtIdx) {
      this.imgs.splice(crtIdx, 1);
      this.$Message.success('删除成功');
    },
    /*---- 底部操作 ----*/
    handleOps(btnTag) {
      switch (btnTag) {
        case '上传':
          this.handleUploadImgInfo();
          break;
        case '取消':
          this.closeModals();
      }
    },
    handleUploadImgInfo() {
      if (!this.imgs.length) {
        this.$Message.warning('请添加相片内容');
        return;
      }
      if (!this.imgs.every(img => img.name)) {
        this.$Message.warning('请填写相片名称');
        return;
      }
      this.confirmUploadImg();
    },
    async confirmUploadImg() {
      const img_info = this.imgs
          .map(img => `${img.pId}|${img.name}`)
          .toString(),
        result = await addAppearance({ img_info });
      if (handleOpResult(result)) {
        this.$Message.success('新增成功');
        menuBus.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
    }
  }
};
</script>

<style lang="less" scoped>
.upload-wrapper {
  // height: 38rem;
  // overflow: auto;
  .album-wrapper {
    width: 100%;
    height: 30rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.3rem;
    }
  }
}
</style>
