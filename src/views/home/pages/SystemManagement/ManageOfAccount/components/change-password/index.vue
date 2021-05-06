<template>
  <div class="account-change-password">
    <old-pwd
      @handleChangePwd="getOldPwd"
      placeTag="当前密码: "
      placeholder="请输入当前的密码: "
    />
    <new-pwd
      color="primary"
      @handleChangePwd="getNewPwd"
      placeTag="更新密码: "
      placeholder="请输入修改的密码: "
    />
    <cfm-pwd
      color="success"
      @handleChangePwd="getCfmPwd"
      placeTag="确认密码: "
      placeholder="请确认修改的密码: "
    />
    <div class="operations">
      <Button size="large" type="success" @click.native="handleChangePwd">
        确认修改
      </Button>
      <Button size="large" type="info" @click.native="clearAll">
        清空内容
      </Button>
    </div>
  </div>
</template>

<script>
// ? components
import PwdItem from './ChildItem';
// ? request
import { changePwd } from '@/request/system-management';
// ? utils
import {
  // ? regExp
  checkPassword,
  handleIsSamePwd,
  // ? arr / obj
  deepCopyObj,
  // ? request
  handleOpResult
} from '@/utils';
import clearPwdBus from './clearPwdBus';

export default {
  name: 'AccountChangePassword',

  components: {
    OldPwd: PwdItem,
    NewPwd: PwdItem,
    CfmPwd: PwdItem
  },

  data: () => ({
    params: {}
  }),

  props: {},

  computed: {},

  methods: {
    getOldPwd(pwd) {
      this.params.oldpassword = pwd;
    },
    getNewPwd(pwd) {
      this.params.password = pwd;
    },
    getCfmPwd(pwd) {
      this.params.confirmPassword = pwd;
    },
    handleValidate() {
      if (!this.params.oldpassword || !checkPassword(this.params.oldpassword)) {
        this.$Message.warning('旧密码输入为空或不合法');
        return false;
      }
      if (!this.params.password || !checkPassword(this.params.password)) {
        this.$Message.warning('新密码输入为空或不合法');
        return false;
      }
      if (!handleIsSamePwd(this.params.password, this.params.confirmPassword)) {
        this.$Message.warning('两次密码输入不一致');
        return false;
      }
      return true;
    },
    handleChangePwd() {
      if (this.handleValidate()) {
        this.$Message.info('验证通过');
        this.$Modal.confirm({
          title: '修改密码',
          content: '确认操作',
          onOk: () => this.handleConfirmChangePwd()
        });
      }
    },
    async handleConfirmChangePwd() {
      const params = deepCopyObj(this.params);
      const result = await changePwd(params);
      if (handleOpResult(result)) {
        this.$Message.success({
          content: '密码修改成功, 请稍后重新登录',
          // background: true,
          duration: 2.5
        });
        this.clearAll();
      } else this.$Message.error(`修改失败, 原因: ${result.msg}`);
    },
    clearAll() {
      this.params = {};
      clearPwdBus.$emit('clearPwd');
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
.common-content {
  margin-top: 2rem;
  .full_flex();
  .tag {
    flex: 3;
    text-align: right;
    margin-right: 4rem;
  }
  .content {
    flex: 7;
    margin-right: 16rem;
  }
}
.account-change-password {
  .old-password {
    .common-content;
  }
  .new-password1 {
    .common-content;
  }
  .new-password2 {
    .common-content;
  }
  .operations {
    margin-top: 3rem;
    text-align: center;
    .ivu-btn {
      margin: 0 1.2rem;
    }
  }
}
</style>
