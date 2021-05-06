<template>
  <div class="login-page">
    <login-wrapper
      currentImg="http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/h-ui.admin/images/icon-logoin.png"
    />
    <div class="login-content">
      <Card class="login-card" :bordered="true">
        <p slot="title">登录</p>
        <div class="input-content">
          <!-- <Spin v-if="loading">加载中......</Spin> -->
          <div class="select-registry">
            <Select size="large" v-model="loginParams.userType">
              <Option
                v-for="role of roleList"
                :key="role.value"
                :value="role.value"
                :disabled="!role.able"
              >
                {{ role.label }}
              </Option>
            </Select>
          </div>
          <div class="input-info">
            <Input
              class="input"
              v-model="loginParams.account"
              prefix="ios-contact"
              placeholder="请输入用户名"
              maxlength="11"
              size="large"
              @keydown.native="handleUserEnter"
            />
            <Input
              class="input"
              v-model="loginParams.password"
              type="password"
              password
              placeholder="请输入密码"
              size="large"
              @keydown.native="handleUserEnter"
            />
          </div>
          <div class="operations">
            <div class="top">
              <Checkbox v-model="isRememberPwd">记住密码</Checkbox>
              <Button
                type="text"
                @click.native="handleFindPwd"
                :loading="loading"
              >
                忘记密码?
              </Button>
              <Button
                type="primary"
                size="large"
                @click.native="handleLogin"
                :loading="loading"
              >
                登录
              </Button>
            </div>
          </div>
          <div class="other">
            <Button
              type="success"
              @click.native="handleAccountActive"
              :loading="loading"
            >
              账号激活
            </Button>
            <Button
              type="text"
              size="large"
              @click.native="handleBackMain"
              :loading="loading"
            >
              关于我们
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? import components
import LoginWrapper from '@common/wrapper';
// ? request
// import { postLoginRequest } from '@/request/user';
// ? utils
import {
  // ? regexp
  checkUsername,
  handleCheckPassword,
  ePassword,
  // ? request
  // ? arr / obj
  deepCopyObj,
  // ? check / set userinfo
  checkUserInfo,
  setUserInfo,
  // ? encrypt
  encrtptedStr,
  // ? storage
  localSet
} from '@/utils';
// ? configs
import { cookies, local } from '@/config';
// ? mixins
import roleMix from '../roleMix';
// import checkLoginMix from '../../checkIsLogin';
// ? vuex
import { mapActions, mapState } from 'vuex';
import {
  GET_IS_LOGIN,
  GET_USER_TOKEN,
  GET_USERNAME,
  GET_AVATAR,
  GET_PHONE,
  GET_ROUTES,
  GET_GARDEN_ID,
  GET_UID
} from '@/store/storeType';
// ? cookies
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  components: { LoginWrapper },
  mixins: [roleMix],
  data: () => ({
    loginParams: {
      account: '',
      password: '',
      userType: 'garden'
    },
    isRememberPwd: false,
    loading: false
  }),
  computed: {
    ...mapState(['platformUrl']),
    uploadParams() {
      const uploadParams = deepCopyObj(this.loginParams);
      // uploadParams.oldpassword = this.loginParams.password;
      uploadParams.password = ePassword(this.loginParams.password);
      uploadParams.alwaysOnline = this.isRememberPwd ? '1' : '0';
      return uploadParams;
    }
  },
  watch: {},
  methods: {
    // ! MuTaTions && ACTIONS
    ...mapActions({
      setIsLogined: GET_IS_LOGIN,
      setUserToken: GET_USER_TOKEN,
      setUsername: GET_USERNAME,
      setUserAvatar: GET_AVATAR,
      setGardenId: GET_GARDEN_ID,
      setUserPhone: GET_PHONE,
      handleUserLogin: GET_ROUTES,
      setUid: GET_UID
    }),
    // ?? 跳转
    handleFindPwd() {
      this.$router.push('/user/findPassword');
    },
    handleAccountActive() {
      this.$router.push('/user/accountActivate');
    },
    handleBackMain() {
      this.$Message.info('跳转到首页...');
      window.location.href = 'http://www.langlangyun.com/';
    },
    handleUserEnter(e) {
      // console.log(e.code);
      if (e.code === 'NumpadEnter' || e.code === 'Enter') {
        this.handleLogin();
      }
    },
    // ? 请求(async)
    async handleLogin() {
      const currentInstance = this;
      if (
        checkUsername(currentInstance) &&
        handleCheckPassword(currentInstance)
      ) {
        this.loading = true;
        const params = deepCopyObj(currentInstance.uploadParams);
        this.handleUserLogin(params);
        setUserInfo(this.loginParams);
        this.handlePwdSave();
      }
      this.loading = false;
    },
    handlePwdSave() {
      if (this.isRememberPwd) {
        Cookies.set(
          'user___pwd',
          encrtptedStr(this.loginParams.password, 'user___pwd'),
          {
            expires: 1
          }
        );
      } else Cookies.remove('user___pwd');
    }
  },
  created() {
    checkUserInfo(this);
  },
  mounted() {
    const token = Cookies.get(cookies.TOKEN),
      { menus } = localSet(local.HOME_MENUS);
    if (token && menus) {
      return;
    } else {
      this.$Modal.info({
        title: '欢迎您',
        content: '请先登录。'
      });
    }
  }
  // ,beforeRouteEnter() {
  //   console.log('beforeRouteEnter');
  // }
};
</script>
