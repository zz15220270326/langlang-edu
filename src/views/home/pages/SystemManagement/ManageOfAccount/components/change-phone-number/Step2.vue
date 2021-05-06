<template>
  <div class="change-password">
    <div class="new-phone-number">
      <div class="tag">
        <Tag color="gold" size="large">新手机号</Tag>
      </div>
      <div class="content">
        <Input
          v-model="newPhoneNumber"
          placeholder="请输入新的手机号"
          size="large"
          maxlength="11"
          :show-word-limit="true"
        />
      </div>
    </div>
    <div class="verify-code">
      <div class="tag">
        <Tag color="green" size="large">验证码</Tag>
      </div>
      <div class="content">
        <div class="content">
          <Input
            v-model="vCode"
            placeholder="请输入验证码"
            size="large"
            maxlength="6"
            :show-word-limit="true"
          />
          <Button type="info" size="large" @click.native="handleGetCode">
            获取验证码
          </Button>
        </div>
      </div>
    </div>
    <div class="operation">
      <Button type="success" size="large" @click.native="handleSecondStep">
        提交
      </Button>
    </div>
  </div>
</template>

<script>
// ? import utils
import { checkPhoneNumber, checkVrCode } from '@/utils/regexp';

export default {
  name: 'Step2',
  data: () => ({
    newPhoneNumber: '',
    vCode: ''
  }),
  methods: {
    handleGetCode() {
      const params = {
        phone: this.newPhoneNumber,
        type: 'getCode'
      };
      this.$emit('handleGetCode', params);
    },
    handleSecondStep() {
      if (this.newPhoneNumber === '' || this.vCode === '') {
        this.$Message.warning('输入的内容不能为空');
        return;
      }
      if (!checkPhoneNumber(this.newPhoneNumber)) {
        this.$Message.error('输入的手机号格式有误');
        return;
      }
      if (!checkVrCode(this.vCode)) {
        this.$Message.error('输入的验证码格式有误');
        return;
      }
      const params = {
        type: 'changePhone',
        code: this.vCode
        // , phone: this.newPhoneNumber
      };
      this.$emit('handleSecondStep', params);
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
.common-style {
  margin-top: 2rem;
  .full_flex();
  .tag {
    flex: 4;
    text-align: right;
    margin-right: 5rem;
  }
  .content {
    flex: 11;
    margin-right: 16rem;
  }
}
.change-password {
  .new-phone-number {
    .common-style;
  }
  .verify-code {
    .common-style;
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .content {
        text-align: right;
        .ivu-btn {
          margin: 0 1rem;
        }
      }
    }
  }
  .operation {
    margin-top: 1.2rem;
    padding: 2rem 0;
    text-align: center;
    .ivu-btn {
      width: 6rem;
    }
  }
}
</style>
