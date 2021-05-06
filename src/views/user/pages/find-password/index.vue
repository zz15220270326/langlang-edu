<template>
  <div class="find-password">
    <wrapper :currentImg="currentImg" />
    <div class="find-content">
      <Card class="find-card">
        <div slot="title" class="title">找回密码</div>
        <div class="input-content">
          <Select v-model="userType">
            <Option
              v-for="role of roleList"
              :key="role.value"
              :value="role.value"
              :disabled="!role.able"
            >
              {{ role.label }}
            </Option>
          </Select>
          <Input
            @keydown.native="handleUserEnter"
            v-model="phoneNumber"
            class="input"
            maxlength="11"
            prefix="ios-call-outline"
            type="tel"
            placeholder="请输入手机号"
            size="large"
          />
        </div>
        <div class="get-vrcode">
          <!-- prefix="ios-color-wand-outline" -->
          <Input
            @keydown.native="handleUserEnter"
            v-model="vrCode"
            class="vrcode-input"
            maxlength="6"
            placeholder="请输入验证码"
            size="large"
          />
          <Button
            type="success"
            size="large"
            @click.native="getVrCode"
            :loading="loadingNumber > 0"
          >
            {{
              loadingNumber > 0 ? `${loadingNumber}s后可重新获取` : '获取验证码'
            }}
          </Button>
        </div>
        <div class="input-content">
          <Input
            @keydown.native="handleUserEnter"
            class="input"
            v-model="newpassword"
            type="password"
            password
            placeholder="请输入密码"
            size="large"
          />
          <Input
            @keydown.native="handleUserEnter"
            class="input"
            v-model="newpassword2"
            type="password"
            password
            placeholder="请再次输入密码"
            size="large"
          />
        </div>
        <div class="next-step">
          <Button type="primary" size="large" @click.native="handleSubmit">
            提交
          </Button>
        </div>
        <a class="back-login" @click="backLogin">返回登录</a>
      </Card>
    </div>
  </div>
</template>

<script>
// ? import components
import Wrapper from '@common/wrapper';

// ? request
import { getPhoneCode, changePassword } from '@/request/user';
// ? utils
import {
  // ? regExp
  checkPhoneNumber,
  checkVrCode,
  checkPassword,
  // ? request
  handleOpResult,
  handleErrorCode
} from '@/utils';

// ? mixins
import roleMix from '../roleMix';

export default {
  name: 'FindPassword',
  components: {
    Wrapper
  },
  mixins: [roleMix],
  data() {
    return {
      currentImg:
        'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/h-ui.admin/images/icon-logoin.png',
      phoneNumber: '',
      vrCode: '',
      selectTypes: [
        {
          info: '教职工',
          key: 0
        },
        {
          info: '主管部门',
          key: 1
        }
      ],
      newpassword: '',
      newpassword2: ''
    };
  },
  methods: {
    checkPhoneNumber() {
      const phone = this.phoneNumber;
      if (phone === '') {
        this.$Message.warning('请填写您的手机号');
        return false;
      }
      if (checkPhoneNumber(phone) === false) {
        this.$Message.warning('请填写合法的手机号');
        return false;
      }
      return true;
    },
    checkVrCode() {
      const vrCode = this.vrCode;
      if (vrCode === '') {
        this.$Message.warning('请输入验证码');
        return false;
      }
      if (!checkVrCode(vrCode)) {
        this.$Message.warning('验证码由6位数字组成, 请重新输入');
        return false;
      }
      return true;
    },
    handleUserEnter(e) {
      e.code === 'Enter' && this.handleSubmit();
    },
    async getVrCode() {
      if (checkPhoneNumber(this.phoneNumber)) {
        const params = {
          phone: this.phoneNumber,
          msgType: 'reset_password'
        };
        const result = await getPhoneCode(params);
        if (handleOpResult(result)) {
          this.$Message.success('获取验证码成功!');
          this.handleLoadingNumber();
        } else
          this.$Message.error(`${result.msg || handleErrorCode(result.code)}`);
      } else this.$Message.warning('请输入合法的手机号');
    },
    checkNewpassword() {
      const newpassword = this.newpassword;
      if (newpassword === '') {
        this.$Message.warning('请输入新密码');
        return false;
      }
      if (!checkPassword(newpassword)) {
        this.$Message.warning('密码要求: 由8-18位数字或字母的组合构成');
        return false;
      }
      return true;
    },
    checkNewpassword2() {
      if (this.newpassword !== this.newpassword2) {
        this.$Message.warning('两次输入的密码要相同');
        return false;
      }
      return true;
    },
    // ? 请求修改密码
    async handleSubmit() {
      if (!this.checkPhoneNumber()) {
        return;
      }
      if (!this.checkVrCode()) {
        return;
      }
      if (!this.checkNewpassword()) {
        return;
      }
      if (!this.checkNewpassword2()) {
        return;
      }
      // this.$Message.info('提交信息');
      const params = {
        phone: this.phoneNumber,
        code: this.vrCode,
        password: this.newpassword,
        confirmPassword: this.newpassword2,
        userType: this.userType
      };
      const result = await changePassword(params);
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        setTimeout(() => {
          this.$router.replace('/user/login');
        }, 500);
      } else
        this.$Message.error(
          `操作失败, 原因${result.msg || handleErrorCode(result.code)}`
        );
    },
    backLogin() {
      this.$router.push('/user/login');
    }
  }
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
