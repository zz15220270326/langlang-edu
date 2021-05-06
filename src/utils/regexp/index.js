/**
 * TODO 正则表达式
 */
// ? 1. 验证用户手机号
export function checkPhoneNumber(phone) {
  // const stadandard = /^1[3456789]\d{9}$/;
  const stadandard = /^0{0,1}(13[0-9]|141|144|145|146|147|148|149|166|167|191|198|199|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
  if (!(stadandard.test(phone))) {
    return false;
  }
  return true;
}
/* ------------------------------------------------------------------ */
// ? 2. 输入密码 (1. 8-18位组成  2. 数字 / 字母 / 下划线组成)
// ? 2.1 密码的合法性
export function checkPassword(password) {
  const standarad = /^(\w){6,18}$/;
  if (!(standarad.test(password))) {
    return false;
  } else {
    return true;
  }
}
// ? 2.2 密码是否相同
export function handleIsSamePwd(oldPwd = '', newPwd = '') {
  if (oldPwd === newPwd) {
    return true;
  } else {
    return false;
  }
}
/* ------------------------------------------------------------------ */
// ? 3. 手机验证码
export function checkVrCode(code) {
  const stadandard = /^[0-9]{6}$/;
  if (!(stadandard.test(code))) {
    return false;
  } else {
    return true;
  }
}