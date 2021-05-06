<template>
  <div class="input-plan-name">
    <div class="header-tag">
      <span>方案名称:</span>
    </div>
    <div class="header-input">
      <Input
        placeholder="请输入方案名称"
        v-model="planName"
        @on-blur="getPlanName"
        maxlength="10"
        :show-word-limit="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputPlanName',
  data: () => ({
    planName: ''
  }),
  props: {
    propName: {
      type: String,
      default: ''
    }
  },
  watch: {
    propName(newValue) {
      this.planName = newValue;
    }
  },
  methods: {
    getPlanName() {
      this.$emit('getPlanName', this.planName);
    }
  }
};
</script>

<style lang="less" scoped>
.input-plan-name {
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-tag {
    flex: 2;
    text-align: right;
    span {
      margin-right: 2rem;
      color: #999;
    }
  }
  .header-input {
    flex: 5;
    margin-right: 5rem;
  }
}
</style>
