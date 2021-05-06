import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './themes/reset.less';
// ? iView
import ViewUI from 'view-design';
// import './themes/index.less';
// ? video.js-hls
import hls from 'videojs-contrib-hls';

Vue.use(ViewUI);
Vue.use(hls);

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

// document.documentElement.style.overflowY = 'auto' // ? 显示
// ? 显示
// document.documentElement.style.overflowY = 'hidden' //隐藏

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');