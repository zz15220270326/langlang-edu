<template>
  <div class="user">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import './index.less';
// ? mixins
import checkLoginMix from './checkIsLogin';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'User',

  mixins: [checkLoginMix],

  computed: {
    ...mapState(['isLogin'])
  }
};
</script>
