// ? async-functions / mock-data
// ? utils
import { localSet } from '@/utils';
// ?configs
import { cookies, local } from '@/config';
// ? cookies
import Cookies from 'js-cookie';

export default {
  created() {
    const token = Cookies.get(cookies.TOKEN),
      { menus } = localSet(local.HOME_MENUS);
    token &&
      menus &&
      this.$Modal.success({
        title: '欢迎您',
        content: '您已进入园所'
      }) &&
      this.$router.replace('/garden');
  }
}