<template>
  <!-- <Menu mode="horizontal" active-name="1" class="logout-menu">
    <Submenu class="main-menu" name="3">
      <template slot="title">
        <img :src="avatar" />
        <span class="sub-title">
          {{ userName }}
        </span>
      </template>
      <MenuItem class="logout-btn" name="log-out" @click.native="handleLogout">
        退出登录
      </MenuItem>
    </Submenu>
  </Menu> -->
  <Dropdown
    class="logout-menu"
    :transfer="true"
    :style="{ position: 'relative', right: '-6rem', top: '1rem' }"
  >
    <!-- <Button type="text">
      <Avatar :src="avatar"></Avatar>
      {{ userName }}
    </Button> -->
    <Avatar :src="avatar" />
    {{ userName }} ↓
    <DropdownMenu class="select" slot="list">
      <DropdownItem @click.native="handleLogout">
        <Icon type="ios-contact" size="20" />
        退出登录
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
// ? styles
import './index.less';

// ? router
import router from '@/router';
import { resetRouter } from '@/router/routerHooks';
// ? cookies
import {
  cookies
  // urls
  // local
} from '@/config';
import Cookies from 'js-cookie';

// ? mapState
import { mapState } from 'vuex';

export default {
  name: 'UserLogout',
  computed: {
    ...mapState(['userName', 'avatar'])
  },
  methods: {
    handleLogout() {
      this.$Modal.confirm({
        title: '退出登录',
        content: '确认退出?',
        onOk: () => this.confirmLogout()
        // ,onCancel: () => this.cancelLogout()
      });
    },
    confirmLogout() {
      this.$Spin.show();
      // ? 移除cookie和localStorage
      // this.$Message.info('正在退出登录')
      this.removeCookies();
      this.removeLocalStorage();
      // ? 重置路由
      this.$Message.info({
        content: '退出登录成功, 请重新登录',
        background: true
      });
      this.$router.replace('/user/login');

      setTimeout(() => {
        this.$Spin.hide();
        resetRouter(router);
        location.reload();
      }, 300);
    },
    removeCookies() {
      Cookies.remove(cookies.TOKEN);
      // Cookies.remove(cookies.USER_INFO)
    },
    removeLocalStorage() {
      localStorage.clear();
    },
    cancelLogout() {
      this.$Message.info('您取消了本次删除操作');
    }
  }
  /**
   * @description
   * * Vue2.x Avatar
   */
  // created() {
  //   console.log(this.avatar);
  // }
};
</script>

