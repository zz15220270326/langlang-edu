import { Spin, LoadingBar } from 'view-design';

export default {
  created() {
    LoadingBar.start();
    Spin.show();
  },
  mounted() {
    LoadingBar.finish();
    Spin.hide();
  }
}