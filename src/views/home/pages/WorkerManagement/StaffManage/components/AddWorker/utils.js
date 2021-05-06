import { checkPhoneNumber } from '@/utils';
import { Message } from 'view-design';

function checkParams(params = {}) {
  if (!params.username) {
    Message.warning('请输入用户名');
    return false;
  }
  if (!params.phone) {
    Message.warning('请输入手机号');
    return false;
  }
  if (!checkPhoneNumber(params.phone)) {
    Message.warning('手机号不合法');
    return false;
  }
  if (!params.role) {
    Message.warning('请选择职位');
    return false;
  }
  // ? birthday, hiredate, motto, honor
  return true;
}

export {
  checkParams
};