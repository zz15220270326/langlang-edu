<template>
  <div class="add-worker">
    <my-header :selectInfo="selectInfo" @switchInfo="switchInfo" />
    <div class="body">
      <div v-show="crtIdx === 0" class="base-info">
        <base-left
          @getLefts="getLefts"
          :propItems="pLefts"
          :readonly="readonly"
        />
        <base-right :readonly="readonly" @getImg="getIcon" />
      </div>
      <div v-show="crtIdx === 1" class="detail-info">
        <info-content
          @getInfos="getInfos"
          :propItems="pDetails"
          :readonly="readonly"
        />
      </div>
    </div>
    <div class="btn-wrapper">
      <btns
        v-show="!readonly"
        :operations="operations"
        @handleBottomOperations="handleOp"
      />
    </div>
  </div>
</template>

<script>
import './index.less';

// ? components
import MyHeader from './MyHeader';
import BaseLeft from './BaseLeft';
import BaseRight from './BaseRight';
import InfoContent from './InfoContent';

import Btns from '@common/modal-bottom-btns';

// ? request
import { addStaff, editStaff } from '@/request/staff-management';
// ? utils
import {
  // ? request
  handleOpResult,
  handleErrorCode
  // ? filter
  // filterParams
} from '@/utils';
import { checkParams } from './utils';
// ? eventBus
import eventBus from '../../eventBus';

export default {
  name: 'AddWorker',
  components: {
    MyHeader,
    BaseLeft,
    BaseRight,
    InfoContent,

    Btns
  },
  data: () => ({
    selectInfo: [
      {
        tag: '基本信息',
        type: 'primary'
      },
      {
        tag: '详细信息',
        type: 'default'
      }
    ],
    crtIdx: 0,
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ],
    lefts: {},
    rights: {},
    details: {},
    pLefts: {},
    pRights: {},
    pDetails: {}
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    itemInfos: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    itemInfos(infos) {
      this.handleGetPropItem(infos);
    }
  },
  methods: {
    switchInfo(crtIdx) {
      this.crtIdx = crtIdx;
      this.selectInfo.forEach((item, index) =>
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default')
      );
    },
    getLefts(lefts = {}) {
      this.lefts = lefts;
    },
    getIcon(icon) {
      console.log(icon);
      this.rights = {
        icon: icon.pId || 0,
        iconUrl: icon.src || ''
      };
    },
    getInfos(details) {
      this.details = details;
    },
    handleOp(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.handleCancel();
          break;
      }
    },
    handleSubmit() {
      const title = this.id <= 0 ? '添加职工信息' : '编辑职工信息',
        content = '确认操作?';
      const params = Object.assign({}, this.lefts, this.rights, this.details);
      if (this.id > 0) {
        params.uid = this.id;
      }
      if (checkParams(params)) {
        console.log(params);
        this.$Modal.confirm({
          title,
          content,
          onOk: () => {
            this.id <= 0 ? this.handleAdd(params) : this.handleEdit(params);
          }
        });
      }
    },
    async handleAdd(params) {
      this.$Message.info('添加');
      const result = await addStaff(params);
      this.checkResult(result);
    },
    handleGetPropItem(infos) {
      const { username, mobile, sex, manageClass, roleName } = infos;
      this.pLefts = { username, mobile, sex, manageClass, roleName };

      const { birthday, hiredate, motto, honor } = infos;
      this.pDetails = { birthday, hiredate, motto, honor };
    },
    async handleEdit(params) {
      this.$Message.info('编辑');
      const result = await editStaff(params);
      this.checkResult(result);
    },
    handleCancel() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      this.clearData();
    },
    checkResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success(this.id > 0 ? '编辑成功' : '添加成功');
        this.$emit('refreshPage');
      } else
        this.$Message.error(
          `添加失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.$emit('closeModals');
      this.clearData();
    },
    clearData() {
      this.selectInfo = [
        {
          tag: '基本信息',
          type: 'primary'
        },
        {
          tag: '详细信息',
          type: 'default'
        }
      ];
      this.crtIdx = 0;
      this.operations = [
        {
          tag: '发布',
          type: 'success'
        },
        {
          tag: '取消',
          type: 'error'
        }
      ];
      this.lefts = {};
      this.rights = {};
      this.details = {};
      eventBus.$emit('clearContent');
    }
  },
  mounted() {}
};
</script>
