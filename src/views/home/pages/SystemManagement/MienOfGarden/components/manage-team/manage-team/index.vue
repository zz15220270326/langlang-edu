<template>
  <!-- 添加或编辑 教学团队 -->
  <div class="op-manage-item">
    <Card>
      <top-selects v-show="id <= 0" ref="uidInfo" />
      <edit-top
        v-show="id > 0"
        ref="editTopInfo"
        :role="propInfos.userRole"
        :name="propInfos.username"
      />
      <div class="items-content">
        <div class="top">
          <main-input ref="inputInfo" />
          <my-avatar ref="avatarInfo" />
        </div>
      </div>
      <btns :operations="operations" @handleBottomOperations="handleOps" />
    </Card>
  </div>
</template>

<script>
import './index.less';
// ? import components
import TopSelects from './TopSelects';
import EditTop from './EditTop';

import MainInput from './InputContent';
import MyAvatar from './MyAvatar';

import Btns from '@common/modal-bottom-btns';
// ? request
import { addTeamInfo, editTeamInfo } from '@/request/system-management';
// ? utils
import { handleOpResult } from '@/utils';
// ? bus
import mtBus from '../mtBus';

export default {
  name: 'OpManageTeam',

  components: {
    TopSelects,
    EditTop,
    MainInput,
    MyAvatar,
    Btns
  },

  data: () => ({
    operations: [
      {
        tag: '发布',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),

  props: {
    propInfos: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: [String, Number],
      default: -1
    }
  },

  watch: {
    propInfos(newInfos) {
      this.$nextTick(() => {
        mtBus.$emit('dispatchEdits', newInfos);
      });
    }
  },

  computed: {},

  methods: {
    getParams() {
      const { uidInfo, editTopInfo, inputInfo, avatarInfo } = this.$refs;
      const param1 =
        this.id > 0 ? { uid: editTopInfo.uid } : { uid: uidInfo.uid };
      const param2 = inputInfo.inputs;
      const param3 = {
        images: inputInfo.imgs.map(img => img.pId).toString()
      };
      const param4 = { icon: avatarInfo.img.pId };
      const params = Object.assign({}, param1, param2, param3, param4);
      if (parseInt(this.id) > 0) {
        params.id = this.id;
      }
      return params;
    },
    checkParams(params) {
      if (!params.uid) {
        this.$Message.warning('您还未选择用户');
        return false;
      }
      return true;
    },
    handleOps(btnTag) {
      switch (btnTag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
        default:
          break;
      }
    },
    handleSubmit() {
      const params = this.getParams();
      if (this.checkParams(params)) {
        console.log(params);
        const title = this.id > 0 ? '编辑内容' : '创建内容';
        this.$Modal.confirm({
          title,
          content: '确认操作?',
          onOk: () =>
            this.id > 0 ? this.confirmEdit(params) : this.confirmAdd(params)
        });
      }
    },
    async confirmAdd(params) {
      const result = await addTeamInfo(params);
      this.handleResult(result);
    },
    async confirmEdit(params) {
      const result = await editTeamInfo(params);
      this.handleResult(result);
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success(this.id > 0 ? '编辑成功' : '新增成功');
        mtBus.$emit('refreshPage');
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您关闭了本次回话');
      this.$emit('closeModals');
    }
  }
};
</script>
