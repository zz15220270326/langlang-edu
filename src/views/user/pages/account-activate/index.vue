<template>
  <div class="account-activate">
    <wrapper :currentImg="currentImg" />
    <div class="activate-content">
      <Card class="activate-card">
        <div slot="title" class="title">激活账号</div>
        <div class="input-content">
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
          <RadioGroup v-model="checkType">
            <Radio label="激活教师"></Radio>
            <Radio label="激活家长"></Radio>
          </RadioGroup>
          <Input
            @keydown.native="handleUserEnter"
            class="input"
            v-model="password"
            type="password"
            maxlength="18"
            prefix="ios-lock-outline"
            password
            placeholder="请输入密码"
            size="large"
          />
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
            <Button type="success" size="large" @click.native="getVCode">
              获取验证码
            </Button>
          </div>
        </div>
        <div class="op-content">
          <div class="top">
            <Checkbox v-model="isAgree">
              <span>
                我已阅读并同意
              </span>
              <a
                href="http://t.aservice.langlangyun.com/langyun/www/public/api/html5/userguide.html"
              >
                用户协议
              </a>
              <a
                href="http://t.aservice.langlangyun.com/langyun/www/public/api/html5/webprivacy.html"
              >
                隐私政策
              </a>
            </Checkbox>
          </div>
          <Button
            type="primary"
            :disabled="!isAgree"
            icon="ios-magnet-outline"
            size="large"
            @click.native="handleActive"
          >
            确认激活
          </Button>
          <div class="to-login">
            <Button type="text" @click.native="toLoginPage">
              若已激活, 点击这里去登录
            </Button>
          </div>
          <div class="to-notice">
            注: 账号激活前, 请联系园所开通账号
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import './index.less';

// ? import components
import Wrapper from '@common/wrapper';
// ? request
import { getPhoneCode, activateAccount } from '@/request/user';
// ? utils
import {
  // ? regExp
  checkPhoneNumber,
  checkPassword,
  checkVrCode,
  // ? request
  handleOpResult,
  handleErrorCode
} from '@/utils';

export default {
  name: 'AccountActivate',
  components: {
    Wrapper
  },
  data() {
    return {
      currentImg:
        'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/h-ui.admin/images/icon-logoin.png',
      phoneNumber: '',
      checkType: '激活教师',
      password: '',
      vrCode: '',
      isAgree: false,
      ableActivate: false
    };
  },
  methods: {
    // ? 校验方法
    checkPhoneNumber() {
      const phone = this.phoneNumber;
      if (phone === '') {
        this.$Message.warning('请填写您的手机号');
        this.ableActivate = false;
        return;
      }
      if (checkPhoneNumber(phone) === false) {
        this.$Message.warning('请填写合法的手机号');
        this.ableActivate = false;
        return;
      }
      this.ableActivate = true;
    },
    checkPassword() {
      const password = this.password;
      if (password === '') {
        this.$Message.warning('请输入密码');
        this.ableActivate = false;
        return;
      }
      if (!checkPassword(password)) {
        this.$Message.warning('密码要求: 由8-18位数字或字母的组合构成');
        this.ableActivate = false;
        return;
      }
      this.ableActivate = true;
    },
    checkVrCode() {
      const vrCode = this.vrCode;
      if (vrCode === '') {
        this.$Message.warning('请输入验证码');
        this.ableActivate = false;
        return;
      }
      if (!checkVrCode(vrCode)) {
        this.$Message.warning('验证码由6位数字组成, 请重新输入');
        this.ableActivate = false;
        return;
      }
      this.ableActivate = true;
    },
    async getVCode() {
      if (checkPhoneNumber(this.phoneNumber)) {
        this.$Spin.show();
        const params = {
          phone: this.phoneNumber,
          msgType: 'register'
        };
        const result = await getPhoneCode(params);
        if (handleOpResult(result)) {
          this.$Message.success('获取验证码成功');
        } else
          this.$Message.error(`${result.msg || handleErrorCode(result.code)}`);
        this.$Spin.hide();
      } else this.$Message.warning('请输入合法的手机号');
    },
    handleUserEnter(e) {
      this.isAgree && e.code === 'Enter' && this.handleActive();
    },
    // ? 激活请求
    async handleActive() {
      this.checkPhoneNumber();
      this.checkPassword();
      this.checkVrCode();
      if (this.ableActivate) {
        this.$Message.info('激活');
        const params = {
          phone: this.phoneNumber,
          regType: this.checkType === '激活教师' ? 'garden' : 'parent',
          password: this.password,
          code: this.vrCode
        };
        const result = await activateAccount(params);
        console.log(result);
        if (handleOpResult(result)) {
          this.$Message.success('激活成功');
          this.$router.replace('/user/login');
        } else {
          this.$Message.error(`激活失败, 原因: ${result.msg}`);
        }
      }
    },
    toLoginPage() {
      this.$router.push('/user/login');
    }
  }
};
</script>
