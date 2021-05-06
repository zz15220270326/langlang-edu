const BASE_URL = 'http://192.168.31.106:5013';

const DEV_URL = '/api'

const TEST_URL = '/api/ly'
// const DEV_URL = 'http://192.168.31.227',

function getUrlByEnv(env) {
  switch (env) {
    case 'dev':
      return DEV_URL
    case 'test':
      return TEST_URL
    case 'prod':
      return 'balala'
    default:
      return BASE_URL
  }
}

export default {
  // * 项目地址
  BASE_URL,
  // * 开发地址
  DEV_URL,
  // * 测试地址
  TEST_URL,
  // ** 根据环境获取当前访问path
  getUrlByEnv
}