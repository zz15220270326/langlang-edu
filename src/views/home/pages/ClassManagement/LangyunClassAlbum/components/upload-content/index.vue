<template>
  <div class="upload-content">
    <div class="step1" v-show="showStepIndex === 0">
      <div class="header">
        <Button
          v-for="(item, key) in selectUploadTypes"
          :key="key"
          :type="item.type"
          @click.native="selectType(key)"
        >
          <span>{{ item.tag }}</span>
          <Icon :type="item.icon" />
        </Button>
      </div>
      <div class="content" v-show="typeIndex === 0">
        <local-upload @handleLocalImg="handlebeforeUploadImg" />
      </div>
      <div class="content" v-show="typeIndex === 1">
        <base-upload @handleBaseImg="handlebeforeUploadImg" />
      </div>
    </div>
    <div class="step2" v-show="showStepIndex === 1">
      <upload-page
        :propList="renderList"
        @inputChange="inputChange"
        @getAlbumId="getAlbumId"
        @handleItemOperations="handleItemOperations"
      />
    </div>
    <my-footer
      v-show="typeIndex === 1"
      :op="footerOperations"
      @handleFooterOperations="handleFooterOperations"
    />
  </div>
</template>

<script>
import './index.less';
// ? components
import LocalUpload from './local-upload';
import BaseUpload from './base-upload';
import UploadPage from './upload-page';
import MyFooter from './common-footer';
// ? request
import { addImage } from '@/request/class-management';
import qs from 'qs';
// ? utils
import {
  // ? request
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'UploadContent',
  components: {
    LocalUpload,
    BaseUpload,
    UploadPage,

    MyFooter
  },
  data: () => ({
    showStepIndex: 0,
    // ? step1
    // ?? header
    selectUploadTypes: [
      {
        tag: '本地上传',
        type: 'primary',
        icon: 'ios-albums-outline'
      },
      {
        tag: '素材库',
        type: 'default',
        icon: 'ios-cloud-upload-outline'
      }
    ],
    typeIndex: 0,
    // ?? content
    renderList: [],
    albumId: 0,
    // ?? footer
    footerOperations: [
      {
        tag: '下一步',
        type: 'primary',
        icon: 'md-arrow-forward'
      },
      {
        tag: '取消',
        type: 'error',
        icon: 'md-close'
      }
    ]
  }),
  computed: {
    ...mapState(['uid']),
    uploadParams() {
      const albumId = this.albumId > 0 ? this.albumId : 0,
        isSave = 1,
        coverId =
          this.renderList.find(item => (item.operations[1].type = 'primary'))
            .pId || 0,
        up_img_info = this.renderList
          .map(item => `${item.pId}|${item.src}|${item.info}`)
          .toString();

      return {
        albumId,
        isSave,
        coverId: coverId || 0,
        up_img_info: up_img_info || ''
      };
    }
  },
  methods: {
    // ? header-functions
    selectType(typeIndex) {
      this.typeIndex = typeIndex;
      this.selectUploadTypes.forEach((item, index) => {
        index === typeIndex ? (item.type = 'primary') : (item.type = 'default');
      });
    },
    // ? content-functions
    handlebeforeUploadImg(imgs) {
      for (let img of imgs) {
        const renderItem = {};
        renderItem.pId = img.pId || 0;
        renderItem.src = img.src;
        renderItem.isSetWrapper = false;
        renderItem.info = '';
        renderItem.operations = [
          {
            tag: '删除',
            type: 'error',
            icon: 'ios-trash-outline'
          },
          {
            tag: '设置为封面',
            type: 'default',
            icon: 'ios-flower-outline'
          }
        ];
        this.renderList.push(renderItem);
      }
    },
    inputChange(value, crtIdx) {
      this.renderList[crtIdx].info = value;
    },
    getAlbumId(albumId) {
      this.albumId = albumId;
    },
    handleItemOperations(itemIndex, btnIndex) {
      switch (btnIndex) {
        case 0: // 删除
          this.handleRemoveRenderItem(itemIndex);
          break;
        case 1: // 设置封面
          this.handleSetItemWrap(itemIndex);
          break;
      }
    },
    handleRemoveRenderItem(itemIndex) {
      this.$Message.info(`删除第${itemIndex + 1}项`);
      this.renderList.splice(itemIndex, 1);
    },
    handleSetItemWrap(itemIndex) {
      this.renderList.forEach((item, index) =>
        index === itemIndex
          ? (item.operations[1].type = 'primary')
          : (item.operations[1].type = 'default')
      );
    },
    // ? footer-functions
    handleFooterOperations(btnTag) {
      switch (btnTag) {
        case '取消':
          this.handleCancel();
          break;
        case '下一步':
          this.handleNextStep();
          break;
        case '返回继续选择':
          this.handleBackChoose();
          break;
        case '确认上传':
          this.handleSubmit();
      }
    },
    handleCancel() {
      this.$Message.info('您关闭了本次会话');
      Object.assign(this.$data, this.$options.data());
      this.$emit('closeModals');
    },
    handleNextStep() {
      this.footerOperations = [
        {
          tag: '返回继续选择',
          type: 'primary',
          icon: 'md-arrow-back'
        },
        {
          tag: '取消',
          type: 'error',
          icon: 'md-close'
        },
        {
          tag: '确认上传',
          type: 'success',
          icon: 'md-bulb'
        }
      ];
      this.showStepIndex = 1;
    },
    handleBackChoose() {
      this.footerOperations = [
        {
          tag: '下一步',
          type: 'primary',
          icon: 'md-arrow-forward'
        },
        {
          tag: '取消',
          type: 'error',
          icon: 'md-close'
        }
      ];
      this.showStepIndex = 0;
    },
    async handleSubmit() {
      if (this.checkParams(this.uploadParams)) {
        console.log(this.uploadParams);
        this.$Modal.confirm({
          title: '上传图片',
          content: '是否确认将当前图片上传到相册中?',
          onOk: () => this.confirmSubmit()
        });
      }
    },
    checkParams(params) {
      if (!this.renderList.length) {
        this.$Message.warning('请先选择图片');
        return false;
      }
      if (parseInt(params.albumId) <= 0) {
        this.$Message.warning('请选择将要添加的相册');
        return false;
      }
      if (params.coverId <= 0) {
        this.$Message.warning('请选择封面图片');
        return false;
      }
      if (!params.up_img_info.length) {
        this.$Message.warning('请选择上传的图片');
        return false;
      }
      return true;
    },
    async confirmSubmit() {
      const params = deepCopyObj(this.uploadParams);
      params.albumId = parseInt(this.uploadParams.albumId);
      params.coverId = parseInt(this.uploadParams.coverId);
      const result = await addImage(qs.stringify(params));
      // console.log(result);
      if (handleOpResult(result)) {
        this.$Message.success('上传成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`上传失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>
