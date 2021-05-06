<template>
  <div class="base-info">
    <div class="left">
      <base-item>
        <Tag slot="tag" color="pink" size="large">姓名</Tag>
        <Input
          slot="content"
          v-model="baseParams.realName"
          placeholder="请输入姓名"
        />
      </base-item>
      <base-item>
        <Tag slot="tag" color="blue" size="large">手机号</Tag>
        <Input slot="content" readonly :value="baseParams.mobile" />
      </base-item>
      <base-item>
        <Tag slot="tag" color="gold" size="large">性别</Tag>
        <RadioGroup slot="content" v-model="baseParams.sex">
          <Radio :label="1">男</Radio>
          <Radio :label="2">女</Radio>
        </RadioGroup>
      </base-item>
      <base-item>
        <Tag slot="tag" color="purple" size="large">负责班级</Tag>
        <Input slot="content" readonly :value="baseParams.classes" />
      </base-item>
      <base-item>
        <Tag slot="tag" color="cyan" size="large">当前职位</Tag>
        <Input slot="content" readonly :value="baseParams.roleName" />
      </base-item>
      <base-item>
        <Tag slot="tag" color="red" size="large">考勤卡号</Tag>
        <Input slot="content" readonly :value="baseParams.card" />
      </base-item>
      <base-item>
        <Tag slot="tag" color="green" size="large">人脸图像</Tag>
        <Button
          slot="content"
          type="info"
          size="large"
          @click.native="handleShowFace"
        >
          人脸图像
        </Button>
      </base-item>
    </div>
    <div class="right">
      <img
        style="width: 5.8rem; height: 5.8rem; margin-bottom: 1.2rem"
        :src="img.src"
      />
      <Upload :action="url" :multiple="false" :before-upload="getSingleFile">
        <Button type="primary" size="large">上传头像</Button>
      </Upload>
    </div>
    <Modal
      title="我的人脸图像"
      v-model="isShowFace"
      width="850"
      :footer-hide="true"
    >
      <my-face />
    </Modal>
  </div>
</template>

<script>
import './index.less';

import BaseItem from './BaseItem';
import MyFace from './MyFace';

import { deepCopyObj } from '@/utils';

import getClassMixs from '@/mixins/Common/getClassMixins';
import imgMix from '@/mixins/Common/imgMixin';

import { mapState } from 'vuex';

export default {
  name: 'BaseInfo',

  components: {
    BaseItem,
    MyFace
  },

  mixins: [getClassMixs, imgMix],

  data: () => ({
    baseParams: {
      realName: '',
      mobile: '',
      sex: 0,
      classes: '',
      roleName: '',
      card: '',
      img: {},
      face: []
    },
    // ? face-infos
    isShowFace: false
  }),

  props: {
    bases: {
      type: Object,
      default: () => ({})
    }
  },

  watch: {
    bases(crtInfo) {
      if (crtInfo !== {}) {
        this.setBaseInfo(crtInfo);
      }
    },
    baseParams() {
      this.emitParams();
    },
    img(newVal) {
      this.baseParams.img = newVal;
    }
  },

  computed: {
    ...mapState([])
  },

  methods: {
    setBaseInfo(crtInfo = {}) {
      this.clearBaseParams();
      this.baseParams = {
        realName: crtInfo.username || '',
        mobile: crtInfo.mobile || '',
        sex: crtInfo.sex || 0,
        classes: crtInfo.classes || '',
        roleName: crtInfo.roleName || '',
        card: crtInfo.card || '',
        img: crtInfo.img || {},
        face: crtInfo.face || []
      };
      this.img = this.baseParams.img;
      this.setAvatar();
    },
    setAvatar() {
      this.img = this.baseParams.img;
    },
    handleShowFace() {
      // console.log(this.face)
      if (!this.baseParams.face.length) {
        this.$Message.warning({
          content: '您暂无可用的人脸图像',
          background: true,
          duration: 3
        });
      } else this.isShowFace = true;
    },
    emitParams() {
      // console.log(this.baseParams);
      const params = deepCopyObj(this.baseParams);
      params.icon = this.baseParams.img.pId || '';
      params.iconUrl = this.baseParams.img.src || '';
      params.face = this.baseParams.face.toString() || '';
      params.sex = this.baseParams.sex.toString();
      delete params.img;
      // console.log(params);
      this.$emit('emitParams', params);
    },
    clearBaseParams() {
      this.baseParams = {
        realName: '',
        mobile: '',
        sex: 0,
        classes: '',
        roleName: '',
        card: '',
        img: {},
        face: []
      };
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  updated() {
    this.emitParams();
  }
};
</script>
