const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const externals = {
  'vue': 'Vue',
  'vuex': 'Vuex',
  // 'vue-router': 'VueRouter',

  'axios': 'axios',
  'qs': 'qs',

  'wangeditor': 'Editor',
  'view-design': 'ViewUI',
  'crypto-js': 'CryptoJS',
  'echarts': 'echarts',
  'js-cookie': 'Cookies',

  'js-md5': 'md5',
  'js-sha1': 'sha1',
  'qiniu-js': 'qiniu',
  'video.js': 'Video',
  'videojs-contrib-hls': 'hls'
};
const cdn = {
  dev: {
    css: [
      'https://unpkg.com/view-design@4.5.0/dist/styles/iview.css'
    ],
    js: []
  },
  build: {
    css: [
      'https://unpkg.com/view-design@4.5.0/dist/styles/iview.css',
      'https://cdn.bootcss.com/video.js/7.7.6/video-js.min.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      // 'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js',
      'https://cdn.bootcss.com/qs/6.9.6/qs.min.js',
    
      'https://cdn.jsdelivr.net/npm/wangeditor@4.6.1/dist/wangEditor.min.js',
      'https://unpkg.com/view-design@4.4.0/dist/iview.min.js',
      // crypto-js
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/core.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-base64.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/md5.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/evpkdf.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/cipher-core.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/aes.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/pad-pkcs7.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/mode-ecb.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-utf8.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/enc-hex.min.js',
      // echarts
      'https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js',
      'https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js',
      'https://cdn.jsdelivr.net/npm/echarts-stat/dist/ecStat.min.js',
      'https://cdn.jsdelivr.net/npm/echarts/dist/extension/dataTool.min.js',
      'https://cdn.jsdelivr.net/npm/echarts/map/js/china.js',
      'https://cdn.jsdelivr.net/npm/echarts/map/js/world.js',
      'https://cdn.jsdelivr.net/npm/echarts/dist/extension/bmap.min.js',

      'https://cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js',

      'https://cdn.bootcss.com/blueimp-md5/1.1.0/js/md5.min.js',
      'https://cdn.bootcss.com/js-sha1/0.6.0/sha1.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/qiniu-js/3.1.2/qiniu.min.js',

      'https://cdn.bootcss.com/video.js/7.7.6/video.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.15.0/videojs-contrib-hls.min.js',
    ]
  }
};

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: process.env.PUBLIC_PATH,
  assetsDir: process.env.ASSETS_DIR,

  chainWebpack: config => {
    // ? alias
    config.resolve.alias
      .set('@', resolve('src'));
    config.resolve.alias
      .set('@common', resolve('src/components/common'));
    config.resolve.alias
      .set('HomePage', resolve('src/views/home/pages'));
    config.resolve.alias
      .set('UserPage', resolve('src/views/user/pages'));

    // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
    config.optimization.delete('splitChunks');
    // * 移除 prefetch 插件 (index.html)
    config.plugins.delete('prefetch');
    // config.plugins.delete('prefetch-index').delete('preload-index');
    // * vue-cli3热更新(修复HMR)
    config.resolve.symlinks(true);

    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build;
      }
      if (isDevelopment) {
        args[0].cdn = cdn.dev;
      }
      return args;
    });

    // 打包时npm包转CDN
    config.externals = externals;
  },
  devServer: {
    port: 5013,
    // host: '0.0.0.0',
    // https: false,
    open: false,
    proxy: {
      // ?? 开发代理
      '/api/ly': {
        // target: 'http://192.168.31.227:50503',
        // ? 开发环境
        // target: 'http://192.168.31.227:50504',
        // !!! 测试环境 (测试环境要切换isTesting)
        target: 'http://t2.aservice.langlangyun.com:5480',
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/api': '/mock'
        // }
      },
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
};