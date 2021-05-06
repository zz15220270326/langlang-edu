import { transformToYM } from '@/utils/changeTime';

export default {
  // ? 日期相关
  selectMonth: transformToYM(Date.parse(new Date())),
  // 默认的: 年 月 日
  defaultYear: '',
  defaultMonth: '',
  defaultDay: '',
  // days in month
  days: 0,
  // ?? 登录权限
  userName: `开发者`,
  // isLogin: true,
  userToken: '',
  // ? `游客${new Date()}`
  // ? 园所名称
  platformName: '智慧幼教管理平台',
  // platformUrl: 'http://t.static.langlangyun.com/',
  platformUrl: require('@/assets/images/myGarden.png'),
  // ? 是否登录
  isLogin: false,
  // ? 是否允许修改密码
  ableChangePwd: false,
  // ? 模拟身份
  identify: '园长',
  // ? 模拟园所
  // gardenId: 19,
  gardenId: 19,
  // ? 模拟项目图标, 用户图标
  avatar: 'http://t.static.langlangyun.com/pcUpload/a39c0c2a17a3c3579a04ef45b1a8fee7?imageView2/1/w/60/h/60',
  projectIcon: 'http://t.aservice.langlangyun.com/langyun/www/public/static/workplace/images/logo.png',
  // ? 负责班级
  managedClass: '全部班级',
  // ? 虚拟存储: uid classIds(真实的数据是在登录的时候获取)
  uid: 29,
  classIds: '76',
  // ? 手机号
  phoneNumber: '',
  // ? uploadUrl
  uploadUrl: 'http://up-z2.qiniu.com',
  gardenBadge: 'http://t.static.langlangyun.com/pcUpload/d6e48e3586945fd9fa34c6671c8141f4?imageView2/1/w/101/h/160',

  // ? HomeRoute
  routes: {}
};