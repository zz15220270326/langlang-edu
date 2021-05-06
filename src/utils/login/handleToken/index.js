// ? 加密
import sha1 from 'js-sha1';
import md5 from 'js-md5';
// ? js-cookie
import Cookies from 'js-cookie';
// ? store
import store from '@/store';
import { GET_USER_TOKEN } from '@/store/storeType';

// ? 设置用户token
export default function handleToken(
  dataSource = {
    token: '',
    timestamp: 0,
    flag: 0,
  },
  loginParams
) {
  // debugger;
  const { token, timestamp } = dataSource,
    { account } = loginParams,
    token1 = sha1(token + account.toString().toLowerCase()),
    token2 = md5(token1 + timestamp.toString().toLowerCase());
  store.dispatch(GET_USER_TOKEN, token2);
  Cookies.set('token', token2, {
    expires: 1
  });
}