<template>
  <div class="pwd-wrapper">
    <div class="tag">
      <Tag :color="color" :size="size">
        {{ placeTag }}
      </Tag>
    </div>
    <div class="content">
      <Input
        :placeholder="placeholder"
        v-model="pwd"
        :size="size"
        type="password"
        password
        @on-blur="handleChangePwd"
      />
    </div>
  </div>
</template>

<script>
import clearPwdBus from './clearPwdBus';

export default {
  name: 'ChildItem',

  data() {
    return {
      pwd: ''
    };
  },

  props: {
    color: {
      type: String,
      default: 'gray'
    },
    size: {
      type: String,
      default: 'large'
    },
    placeTag: {
      type: String,
      default: '请输入密码:'
    },
    placeholder: {
      type: String,
      default: 'Please input your password ...... '
    }
  },

  computed: {},

  methods: {
    handleChangePwd(e) {
      const { value } = e.target;
      this.$emit('handleChangePwd', value);
    },
    clearPwd() {
      this.pwd = '';
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {
    clearPwdBus.$on('clearPwd', () => this.clearPwd());
  },
  beforeDestroy() {
    clearPwdBus.$off('clearPwd');
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
.pwd-wrapper {
  .common-content;
}
</style>
