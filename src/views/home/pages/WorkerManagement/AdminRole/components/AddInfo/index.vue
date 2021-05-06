<template>
  <div class="add-info">
    <div class="init-module" v-show="id <= 0">
      <div class="init-module-title">初始化权限模板</div>
      <div class="init-module-content">
        <Select
          v-model="selectItem"
          style="width: 250px"
          @on-change="handleSelect"
          v-cloak
        >
          <Option v-for="item in authList" :key="item.key" :value="item.copyId">
            {{ item.info }}
          </Option>
        </Select>
      </div>
    </div>
    <div class="title">
      <div class="tag">名称</div>
      <div class="input-content">
        <Input
          placeholder="请输入名称"
          v-model="inputTitle"
          @on-blur="handleTitle"
        />
      </div>
    </div>
    <div class="content">
      <div class="tag">备注</div>
      <div class="input-content">
        <Input
          type="textarea"
          maxlength="100"
          placeholder="请输入备注(100字以内)"
          show-word-limit
          :rows="4"
          v-model="inputContent"
          @on-blur="handleContent"
        />
      </div>
    </div>
    <btns :operations="operations" @handleBottomOperations="handleOp" />
  </div>
</template>

<script>
import './index.less';
import Btns from '@common/modal-bottom-btns';

// ? request
import {
  // getRoleAdd,
  addRole,
  editRole
} from '@/request/staff-management';
// ? utils
import {
  // ? request
  handleOpResult,
  // ? object
  deepCopyObj
} from '@/utils';
import { sendDemo } from '../../events';

export default {
  name: 'AddInfo',
  components: {
    Btns
  },
  data: () => ({
    selectItem: 0,
    inputTitle: '',
    inputContent: '',
    authList: [],
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
    params: {}
  }),
  props: {
    id: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    }
  },
  watch: {
    id(newV) {
      if (newV > 0) {
        this.params.id = newV;
      }
    },
    name(newV) {
      this.inputTitle = newV || '';
      this.params.name = newV;
    },
    remark(newV) {
      this.inputContent = newV || '';
      this.params.remark = newV;
    }
  },
  methods: {
    // ? getAuthInfo
    getDemo() {
      // ? 获取摸摸人选中模板
      sendDemo.$on('handleDemo', demo => this.setAuthList(demo));
    },
    setAuthList(list = []) {
      this.authList = [];
      this.authList.push({
        key: 0,
        info: '不使用默认模板',
        copyId: 0
      });
      list.map((item, key) => {
        this.authList.push({
          key: key + 1,
          info: item.name,
          copyId: item.id
        });
      });
    },
    handleSelect(copyId) {
      if (copyId) {
        this.params.copyId = copyId;
      } else delete this.params.copyId;
    },
    handleTitle(e) {
      const { value } = e.target;
      if (value !== '') {
        this.params.name = value;
      } else delete this.params.name;
    },
    handleContent(e) {
      const { value } = e.target;
      if (value !== '') {
        this.params.remark = value;
      } else delete this.params.remark;
    },
    handleOp(tag) {
      switch (tag) {
        case '发布':
          this.handleSubmit();
          break;
        case '取消':
          this.closeModals();
          break;
      }
    },
    handleSubmit() {
      const params = deepCopyObj(this.params);
      if (this.checkIsSubmit(params)) {
        this.id > 0 ? this.handleEdit(params) : this.handleAdd(params);
      }
    },
    handleAdd(params) {
      this.$Modal.confirm({
        title: '添加职位权限',
        content: '确认操作',
        onOk: async () => {
          const result = await addRole(params);
          this.handleResult(result);
        }
      });
    },
    handleEdit() {
      const params = JSON.parse(JSON.stringify(this.params));
      this.$Modal.confirm({
        title: '编辑职位权限',
        content: '确认操作',
        onOk: async () => {
          const result = await editRole(params);
          this.handleResult(result);
        }
      });
    },

    checkIsSubmit(params = {}) {
      console.log(this.id);
      if (this.id <= 0) {
        if (!parseInt(params.copyId)) {
          this.$Message.warning('请选择初始化权限模板');
          return false;
        }
      }
      if (!params.name || !params.name.length) {
        this.$Message.warning('请输入您的名称');
        return false;
      }
      if (!params.remark || !params.remark.length) {
        this.$Message.warning('请输入备注');
        return false;
      }

      return true;
    },
    handleResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success(this.id > 0 ? '编辑成功' : '添加成功');
        this.$emit('refreshPage');
      } else {
        this.$Message.error(`操作失败, 原因: ${result.msg}`);
      }
      this.$emit('closeModals');
    },
    closeModals() {
      this.$Message.info('您取消了本次操作');
      this.$emit('closeModals');
      this.clearBoth();
    },
    clearBoth() {
      this.selectItem = 0;
      this.inputTitle = '';
      this.inputContent = '';
    }
  },
  mounted() {
    this.getDemo();
  }
};
</script>
