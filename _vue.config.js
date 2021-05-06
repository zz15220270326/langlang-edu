'use strict';
const { resolve } = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const exterals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'wangeditor': 'Editor',
  'view-design': 'ViewUI'
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
      'https://unpkg.com/view-design@4.5.0/dist/styles/iview.css'
    ],
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
      "https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js",
      "https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
      "https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js",
      'https://cdn.jsdelivr.net/npm/wangeditor@4.6.1/dist/wangEditor.min.js',
      "https://unpkg.com/view-design@4.4.0/dist/iview.min.js",
    ]
  }
};

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  assetsDir: process.env.ASSETS_DIR,
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    // config.resolve = {
    // exterals: {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'wangeditor': 'Wangeditor',
    //   'view-design': 'ViewDesign'
    // },
  },
  chainWebpack: config => {
    // * vue-cli3热更新(修复HMR)
    config.resolve.symlinks(true);
    // * 移除 prefetch 插件 (index.html)
    // config.plugins.delete('prefetch');
    config.plugins.delete('prefetch-index').delete('preload-index');
    // * 别名
    config.resolve.alias
      .set('@', resolve(__dirname, 'src'));
    config.resolve.alias
      .set('@common', resolve(__dirname, 'src/components/common'));
    config.resolve.alias
      .set('@utils', resolve(__dirname, 'src/utils'));
    config.resolve.alias
      .set('HomePage', resolve(__dirname, 'src/views/home/pages'));
    config.resolve.alias
      .set('UserPage', resolve(__dirname, 'src/views/user/pages'));

    // webpack 会默认给commonChunk打进chunk-vendors，所以需要对webpack的配置进行delete
    config.optimization.delete('splitChunks');
    // * 首页cdn配置
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build;
      }
      if (isDevelopment) {
        args[0].cdn = cdn.dev;
      }
    })
    // * 采用外部引入
    config.mode = process.env.NODE_ENV;
    // 打包时npm包转CDN
    config.exterals = exterals;
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
        // target: 'http://192.168.31.227:50504', // ? 开发环境
        target: 'http://t2.aservice.langlangyun.com:5480',  // !!! 测试代理 (测试环境要切换isTesting)
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