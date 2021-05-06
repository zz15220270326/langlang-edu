<template>
  <Row class="home-wrapper">
    <Col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
      <span class="platform-name">{{ platformName }}</span>
    </Col>
    <Col :xs="6" :sm="10" :md="12" :lg="16" :xl="16">
      (~~introduce~~)
    </Col>
    <Col :xs="6" :sm="6" :md="6" :lg="4" :xl="5" class="logout-wrapper">
      <user-logout />
    </Col>
  </Row>
</template>

<script>
// ? import components
import UserLogout from '@common/user-logout'

// ? mapState
import { mapState } from 'vuex'

export default {
  name: 'HomeTop',
  components: {
    UserLogout
  },
  computed: {
    ...mapState(['platformName'])
  }
}
</script>

<style lang="less" scoped>
@import "~@/themes/index.less";
.home-wrapper {
  height: 3.6rem;
  background-color: @sider-color;
  .ivu-col {
    display: flex;
    justify-content: center;
    align-items: center;
    .platform-name {
      color: #fff;
      font-size: 1rem;
      margin-top: 0.93rem;
    }
  }
  .logout-wrapper {
    position: relative;
    .logout-menu {
      position: absolute;
      top: 0;
      right: 0.3rem;
    }
  }
  :nth-child(2) {
    color: @sider-color;
  }
}
</style>
