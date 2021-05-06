<template>
  <div class="change-phone-number">
    <div class="wrapper">
      <Steps :current="stepIndex">
        <Step
          v-for="(item, key) in stepList"
          :key="key"
          :icon="item.icon"
          :title="item.title"
          :content="item.content"
        />
      </Steps>
    </div>
    <div class="main" v-if="stepIndex === 0">
      <step-1 @handleFirstStep="handleFirstStep" />
    </div>
    <div class="main" v-if="stepIndex === 1">
      <step-2
        @handleGetCode="handleGetCode"
        @handleSecondStep="confirmSubmit"
      />
    </div>
    <div class="main" v-if="stepIndex === 2">
      <step-3 @resetStep="resetStep" />
    </div>
  </div>
</template>

<script>
// ? import components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
// ? request
import { changePhone } from '@/request/system-management';
// ? utils
import {
  // ? request
  handleOpResult
  // ? arr / obj
  // deepCopyObj
} from '@/utils';
// ? vuex
import { GET_PHONE } from '@/store/storeType';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ChangePhoneNumber',
  components: {
    Step1,
    Step2,
    Step3
  },
  data: () => ({
    stepIndex: 0,
    stepList: [
      {
        title: '验证号码',
        content: '验证旧手机号码以及个人密码',
        icon: 'ios-call-outline'
      },
      {
        title: '绑定新的手机号',
        content: '绑定新的手机号码',
        icon: 'ios-lock-outline'
      },
      {
        title: '完成',
        content: '到此修改完成',
        icon: 'ios-checkmark-circle-outline'
      }
    ],
    // ? 发送请求需要的数据
    oldphone: '',
    password: '',
    phone: ''
  }),
  computed: {
    ...mapState(['phoneNumber'])
  },
  methods: {
    ...mapMutations([GET_PHONE]),
    // !!! 三次请求
    async handleFirstStep(oldphone, password) {
      this.oldphone = oldphone;
      this.password = password;
      const params = {
        oldphone: this.oldphone,
        password: this.password,
        type: 'checkPassword'
      };
      const result = await changePhone(params);
      if (handleOpResult(result)) {
        // ? 请求成功 跳转到下一步
        this.$Message.info('验证原信息成功, 请修改您的手机号');
        this.stepIndex = 1;
      } else this.$Message.error(`验证失败, 原因: ${result.msg}`);
    },
    async handleGetCode({ phone, type }) {
      this.phone = phone;
      if (this.oldphone === phone) {
        this.$Message.warning('新手机号不能与原手机号一致');
        return;
      }
      const params = {
          type,
          phone: this.phone,
          oldphone: this.oldphone,
          password: this.password
        },
        result = await changePhone(params);
      if (handleOpResult(result)) {
        this.$Message.success('获取验证码成功');
      } else this.$Message.error(`获取验证码失败, 原因: ${result.msg}`);
    },
    async confirmSubmit({ code, type }) {
      const params = {
        oldphone: this.oldphone,
        password: this.password,
        phone: this.phone,
        code,
        type
      };
      const result = await changePhone(params);
      if (handleOpResult(result)) {
        this.handleSuccess();
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.clearAll();
    },
    handleSuccess() {
      this.$Message.success('修改成功');
      this[GET_PHONE](this.phone);
      this.stepIndex = 2;
      this.$Spin.hide();
    },
    resetStep() {
      this.stepIndex = 0;
    },
    clearAll() {
      this.oldphone = '';
      this.password = '';
      this.phone = '';
    }
  }
};
</script>

<style lang="less" scoped>
.change-phone-number {
  background-color: #fff;
  .wrapper {
    margin: 1.2rem 0;
    padding: 1rem 2rem;
  }
  .main {
    background-color: #fff;
  }
}
</style>
