<template>
  <div class="edit-infant">
    <RadioGroup class="select-type" v-model="crtStatus">
      <Radio
        v-for="item of radioDatas"
        :key="item.status"
        :label="item.status"
        @on-change="handleGetStatus"
      >
        {{ item.label }}
      </Radio>
    </RadioGroup>
    <my-btns :operations="operations" @handleBottomOperations="handleOps" />
  </div>
</template>

<script>
// ? components
import MyBtns from '@common/modal-bottom-btns';

// ? request
import { changeInfant } from '@/request/class-management';
// ? utils
import { handleOpResult } from '@/utils';

export default {
  name: 'EditInfant',
  components: { MyBtns },
  data: () => ({
    crtStatus: 0,
    radioDatas: [
      {
        label: '取消签到',
        status: 0
      },
      {
        label: '签到',
        status: 1
      },
      {
        label: '事假',
        status: 2
      },
      {
        label: '病假',
        status: 3
      },
      {
        label: '取消签退',
        status: 4
      },
      {
        label: '签退',
        status: 5
      },
      {
        label: '取消请假',
        status: 6
      }
    ],
    operations: [
      {
        tag: '确认',
        type: 'success'
      },
      {
        tag: '取消',
        type: 'error'
      }
    ]
  }),
  props: {
    id: {
      type: String,
      default: '0'
    },
    schoolTime: {
      type: String,
      default: '0000-00-00'
    }
  },
  methods: {
    handleGetStatus() {},
    handleOps(btnTag) {
      switch (btnTag) {
        case '确认':
          this.handleEdit();
          break;
        case '取消':
          this.closelModals();
          break;
        default:
          break;
      }
    },
    handleEdit() {
      const params = {
        infantId: this.id,
        schoolTime: this.schoolTime,
        status: this.crtStatus
      };
      this.$Modal.confirm({
        title: '幼儿出勤类型设置',
        content: '确认操作?',
        onOk: () => this.confirmEdit(params)
      });
    },
    async confirmEdit(params) {
      const result = await changeInfant(params);
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.$emit('refreshPage');
      } else this.$Message.error(`编辑失败, 原因: ${result.msg}`);
      this.$emit('closelModals');
    },
    closelModals() {
      this.$Message.info('您关闭了本次对话');
      this.$emit('closelModals');
    }
  }
};
</script>

<style lang="less" scoped>
.edit-infant {
  height: 12rem;
  .select-type {
    width: 100%;
    text-align: center;
    padding: 1.2rem 0;
  }
}
</style>
