// * 加密 / 解密 参数 
import CryptoJS from 'crypto-js';
// import sha1 from 'js-sha1';
// import Cookies from 'js-cookie';

// ? 加密(对象)
export function encryptedParams(value = {}, key) {
  const params = JSON.stringify(value);
  const eParams = CryptoJS.AES.encrypt(params, key);
  return eParams;
}

// ? 解密(对象)
export function decryptedParams(eParams, key = '') {
  const codeStr = CryptoJS.AES.decrypt(eParams, key);
  const dParams = codeStr.toString(CryptoJS.enc.Utf8);
  return JSON.parse(dParams);
}

// ? 加密(字符串)
export function encrtptedStr(str = '', key = '') {
  const eStr = CryptoJS.DES.encrypt(str, key).toString();
  // console.log(eStr);
  return eStr;
}

// ? 解密字符串
export function decrtptedStr(eStr = '', key = '') {
  const str = CryptoJS.DES.decrypt(eStr, key);
  const dStr = str.toString(CryptoJS.enc.Utf8);
  // console.log(dStr);
  return dStr;
}

// ? encrypt-password ? //
export function ePassword(oldpassword) {
  const newPassword = CryptoJS.SHA1(oldpassword).toString();
  return newPassword;
}

export function dPassword(ePassword) {
  // const hasher = CryptoJS.algo.SHA1.create();
  // hasher.update(ePassword);
  // const hash = hasher.finalize(ePassword).toString();
  // console.log(hash);
  console.log(ePassword, CryptoJS.enc);
  const newPassword = CryptoJS.enc.Latin1.stringify(ePassword);
  return newPassword;
}