import { checkPhoneNumber, checkPassword } from '@/utils';
import { Message } from 'view-design';

function checkUsername(vueComponent) {
  const account = vueComponent.loginParams.account;
  if (account === '') {
    Message.warning('您输入的账号不能为空');
    return false
  }
  if (!checkPhoneNumber(account)) {
    Message.warning('请输入合法的用户名');
    return false
  }
  return true;
}

function handleCheckPassword(vueComponent) {
  const password = vueComponent.loginParams.password;
  if (password === '') {
    Message.warning('密码不能为空');
    return false
  }
  if (!checkPassword(password)) {
    Message.warning('密码要求: 由8-18位数字或字母的组合构成');
    return false
  }
  return true;
}

export {
  checkUsername,
  handleCheckPassword
}