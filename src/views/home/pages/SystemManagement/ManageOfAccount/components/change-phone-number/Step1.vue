<template>
  <div class="check-phone-number">
    <div class="old-phone-number">
      <div class="tag">
        <Tag size="large" color="blue">原手机号</Tag>
      </div>
      <div class="content">
        <Input
          :value="phoneNumber"
          placeholder="请输入您原来的手机号"
          :readonly="true"
          size="large"
          maxlength="11"
          :show-word-limit="true"
        />
        <!-- 13143894989 -->
        <!-- :value="phoneNumber" -->
      </div>
    </div>
    <div class="login-password">
      <div class="tag">
        <Tag size="large" color="red">登录密码</Tag>
      </div>
      <div class="content">
        <Input
          v-model="password"
          type="password"
          password
          placeholder="请输入您的登录密码"
          size="large"
          maxlength="16"
        />
        <!-- placeholder="请输入您的登录密码(8-16位)" -->
      </div>
    </div>
    <div class="operation">
      <Button type="primary" size="large" @click.native="handleFirstStep">
        下一步
      </Button>
    </div>
  </div>
</template>

<script>
// ? import utils  ( checkPhoneNumber,  )
import {
  // checkPhoneNumber,
  checkPassword
} from '@/utils';

// ? Vuex
import { mapState } from 'vuex';

// ? other

export default {
  name: 'Step1',

  data: () => ({
    // ? 旧手机号直接获取
    // oldPhoneNumber: '',
    password: '',
    vCode: ''
  }),
  computed: {
    ...mapState(['phoneNumber'])
  },
  methods: {
    handleFirstStep() {
      // if (this.oldPhoneNumber === '' || this.password === '') {
      //   this.$Message.warning('输入的内容不能为空')
      //   return
      // }
      // if (!checkPhoneNumber(this.oldPhoneNumber)) {
      //   this.$Message.error('输入的手机号格式错误')
      //   return
      // }
      if (!checkPassword(this.password)) {
        this.$Message.warning('输入的密码格式错误, 请重新输入');
        return;
      }
      // this.$emit('handleFirstStep', this.oldPhoneNumber, this.password)
      this.$emit('handleFirstStep', this.phoneNumber, this.password);
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-style {
  margin-top: 2rem;
  .full_flex();
  .tag {
    flex: 4;
    text-align: right;
    margin-right: 5rem;
  }
  .content {
    flex: 11;
    margin-right: 16rem;
  }
}
.check-phone-number {
  margin-top: 6rem;
  height: 44.8rem;
  .old-phone-number {
    .common-style;
  }
  .login-password {
    .common-style;
  }
  .operation {
    margin-top: 1.2rem;
    padding: 2rem 0;
    text-align: center;
    .ivu-btn {
      width: 6rem;
    }
  }
}
</style>
