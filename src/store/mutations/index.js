import {
  GET_SELECT_MONTH,
  GET_DEFAULT_YEAR,
  GET_DEFAULT_MONTH,
  GET_DEFAULT_DAY,
  GET_DAYS,

  GET_USERNAME,
  GET_AVATAR,
  GET_PHONE,
  GET_IS_LOGIN,
  GET_USER_TOKEN,
  GET_UID,
  GET_CLASS_IDS,
  GET_GARDEN_ID,
  HANDLE_UPLOAD_URL,

  GET_ROUTES
} from '@/store/storeType';

export default {
  // ! 日期相关的mutations
  [GET_SELECT_MONTH](state, inputValue) {
    state.selectMonth = inputValue;
  },
  // 今年 今月 今日
  [GET_DEFAULT_YEAR](state, year) {
    state.defaultYear = year;
  },
  [GET_DEFAULT_MONTH](state, month) {
    state.defaultMonth = month;
  },
  [GET_DEFAULT_DAY](state, day) {
    state.defaultDay = day;
  },
  [GET_DAYS](state, days) {
    state.days = days;
  },
  // !!用户相关
  [GET_USERNAME](state, userName) {
    state.userName = userName;
  },
  [GET_AVATAR](state, avatar) {
    state.avatar = avatar;
  },
  [GET_PHONE](state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  [GET_IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin;
  },
  [GET_USER_TOKEN](state, userToken) {
    state.userToken = userToken;
  },
  [GET_UID](state, uid) {
    state.uid = uid;
  },
  [GET_CLASS_IDS](state, classIds) {
    state.classIds = classIds;
  },
  [GET_GARDEN_ID](state, gardenId) {
    state.gardenId = gardenId;
  },
  [HANDLE_UPLOAD_URL](state, uploadUrl) {
    state.uploadUrl = uploadUrl;
  },

  [GET_ROUTES](state, routes) {
    state.routes = routes;
  },
};