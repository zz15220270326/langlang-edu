// ? request
// ? import regexp
import { checkPassword } from '@/utils';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: ''
    };
  },
  methods: {
    handleChangePwd() {
      if (this.oldPassword === '' || this.newPassword1 === '' || this.newPassword2 === '') {
        this.$Message.error('输入内容不得为空')
        return
      }
      if (!checkPassword(this.oldPassword) || !checkPassword(this.newPassword1)) {
        this.$Message.error('输入的密码不符合格式要求')
        return
      }
      if (this.newPassword1 !== this.newPassword2) {
        this.$Message.error('两次输入的密码不一致')
        return
      }
      // ? 还有后台的校验
      this.$Spin.show()
      setTimeout(() => {
        this.$Message.success('修改成功')
        this.clearPwd()
        this.$Spin.hide()
      }, 500)
    },
    clearAll() {
      this.$Modal.confirm({
        title: '清空内容',
        content: '确认操作? 清空后需要重新输入',
        onOk: () => {
          this.clearPwd()
          this.$Message.info('已清空内容')
        },
        onCancel: () => {
          this.$Message.info('您取消了本次操作')
        }
      })
    },
    clearPwd() {
      this.oldPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
    }
  },
  created() { }
}