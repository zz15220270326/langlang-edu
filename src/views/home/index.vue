<template>
  <div class="home">
    <logo-wrapper />
    <Layout>
      <home-top
        :topRouteName="topRouteName"
        :routerList="routerList"
        @clickMenuTop="clickMenuTop"
      />
      <Layout :style="layoutStyle">
        <home-breads
          v-show="true"
          :firstTitle="topItemName"
          :firstRoute="topRouteName"
        />
        <Content :style="contentStyle">
          <Layout>
            <Sider
              v-show="true"
              class="home-slider"
              :collapsible="true"
              :collapsed-width="100"
              v-model="isCollapsed"
              :style="sliderStyle"
            >
              <home-slider
                v-show="true"
                :isCollapsed="isCollapsed"
                :sliderRoute="sliderRoute"
                :childrenList="childrenList"
                @clickMenuLeft="clickMenuLeft"
                @handleRefresh="handleRefresh"
              />
            </Sider>
            <Content>
              <home-content />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import './index.less';

import LogoWrapper from './components/LogoWrapper';
import HomeTop from './components/HomeTopBar';
import HomeBreads from './components/HomeBreads';
import HomeSlider from './components/HomeSlider';
import HomeContent from './components/HomeContent';

import {
  // ? time
  // dateToMs,
  transformToYMD,
  getDays,
  // ? arr / obj
  deepCopyObj,
  uniObjArr,
  // ? login
  checkUserInfo
} from '@/utils';

import {
  GET_USERNAME,
  GET_AVATAR,
  GET_PHONE,
  GET_GARDEN_ID,
  GET_UID,
  GET_DEFAULT_YEAR,
  GET_DEFAULT_MONTH,
  GET_DEFAULT_DAY,
  GET_DAYS
} from '@/store/storeType';

// ? home-routes
// import routerList from '@/router/routes/home'
import styleMix from './styleMix';

// ? vuex
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    LogoWrapper,
    HomeTop,
    HomeBreads,
    HomeSlider,
    HomeContent
  },
  mixins: [styleMix],
  data: () => ({
    routerList: [],
    topItemName: '',
    topRouteIdx: 0,
    slideRouteIdx: 0,
    childrenList: [],
    isCollapsed: false,
    sliderStyle: {
      color: '#fff'
    }
  }),
  computed: {
    // ? 一级路由
    topRouteName() {
      const routeArr = this.$route.path.split('/');
      return routeArr[2];
    },
    // ? 二级路由
    sliderRoute() {
      const routeArr = this.$route.path.split('/');
      if (routeArr[3]) {
        return routeArr[3];
      } else {
        return '/';
      }
    },
    ...mapState(['isLogin', 'routes'])
  },
  methods: {
    ...mapMutations({
      getNowYear: GET_DEFAULT_YEAR,
      getNowMonth: GET_DEFAULT_MONTH,
      getNowDay: GET_DEFAULT_DAY,
      getMonthDays: GET_DAYS,
      setUsername: GET_USERNAME,
      setUserAvatar: GET_AVATAR,
      setUserPhone: GET_PHONE,
      setGardenId: GET_GARDEN_ID,
      setUid: GET_UID
    }),
    // ? 函数(sync)
    initYMD() {
      // '当前的: 年-月-日'
      const datestamp = new Date().getTime();
      // 把'年-月'转化成数组
      let ymdArr = transformToYMD(datestamp)
        .toString()
        .split('-');
      const [y, m, d] = ymdArr;
      this.getNowYear(y);
      this.getNowMonth(m);
      this.getNowDay(d);
      this.getMonthDays(getDays(y * 1, m * 1));
    },
    // ? 更新 面包屑导航 以及 当前路由下标
    updateCrtRoute() {
      const crtRoute = this.routerList
        .filter((r, ri) => ri > 0)
        .find(r => r.path === this.topRouteName);
      const crtIdx = this.routerList.indexOf(crtRoute);
      if (crtRoute && crtIdx > -1) {
        // console.log(crtRoute['showName'], crtIdx)
        this.$nextTick(() => {
          this.topItemName = crtRoute['showName'];
          this.topRouteIdx = crtIdx;
        });
      }
      this.slideRouteIdx = crtIdx;
    },
    // ? 初始化路由列表( 顶部为2级路由, 左边为3级路由 )
    initRouter() {
      this.routerList = deepCopyObj(this.routes.children);
      if (
        this.routerList[this.topRouteIdx].children &&
        this.slideRouteIdx > 0
      ) {
        const { children } = this.routerList[this.slideRouteIdx];
        if (children) {
          const list = uniObjArr(children, 'name');
          this.childrenList = list;
        }
      } else {
        this.childrenList = [];
      }
    },
    // ? 顶部路由点击事件
    clickMenuTop(index, path) {
      // console.log(path)
      this.updateCrtRoute();
      if (path !== '/') {
        this.$router.push('/garden/' + path);
        this.topRouteIdx = index;
        if (this.routerList[index].children) {
          const { children } = this.routerList[index],
            list = uniObjArr(children, 'name');
          this.childrenList = list;
        } else {
          this.childrenList = [];
        }
      }
    },
    // ? 侧边路由触发事件
    clickMenuLeft(index, path) {
      this.$router.push(path);
    },
    handleRefresh() {
      this.initYMD();
      this.$Message.success('刷新成功');
    }
    // ? 方法(async)
  },
  /**
   * ! life-hooks
   */
  created() {
    checkUserInfo(this);
    this.updateCrtRoute();
    this.initRouter();
    this.initYMD();
    console.log('Home Created ! ');
  },
  updated() {
    this.updateCrtRoute();
    // console.log('updated');
  },
  activated() {
    this.updateCrtRoute();
    this.initRouter();
  }
};
</script>
