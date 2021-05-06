<template>
  <div class="account-management">
    <div class="top-menu">
      <Button
        v-for="(item, key) of selectTabs"
        :key="key"
        :type="item.type"
        @click.native="switchPages(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div class="content" v-show="crtIdx === 0">
      <account-info />
    </div>
    <div class="content" v-show="crtIdx === 1">
      <change-password />
    </div>
    <div class="content" v-if="crtIdx === 2">
      <change-phone-number />
    </div>
  </div>
</template>

<script>
// ? import components
import AccountInfo from './components/account-info';
import ChangePassword from './components/change-password';
import ChangePhoneNumber from './components/change-phone-number';

// ? import mixins

export default {
  name: 'AccountManagement',
  components: {
    AccountInfo,
    ChangePassword,
    ChangePhoneNumber
  },
  data: () => ({
    selectTabs: [
      {
        tag: '账户信息',
        type: 'primary'
      },
      {
        tag: '修改密码',
        type: 'default'
      },
      {
        tag: '修改手机号',
        type: 'default'
      }
    ],
    crtIdx: 0
  }),
  methods: {
    switchPages(crtIdx) {
      this.crtIdx = crtIdx;
      this.selectTabs.forEach((item, index) => {
        index === crtIdx ? (item.type = 'primary') : (item.type = 'default');
      });
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  activated() {
    this.crtIdx = 0;
    this.switchPages(this.crtIdx);
  }
};
</script>

<style lang="less" scoped>
.account-management {
  color: #666;
  .top-menu {
    padding: 0.8rem 0;
    background-color: #fff;
    .ivu-btn {
      margin: 0 0.8rem;
    }
  }
}
</style>
