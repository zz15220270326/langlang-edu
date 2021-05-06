<template>
  <div>
    <Button size="large" type="text" @click.native="backHome">
      返回首页/重新登录
    </Button>
    <Button size="large" type="text" @click.native="backPrev">
      返回上一页({{ second }}s)
    </Button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BackBtnGroup',
  data: () => ({
    second: 10,
    timer: null
  }),
  computed: {
    ...mapState(['routes'])
  },
  methods: {
    backHome() {
      if (Object.keys(this.routes).length || this.routes.length) {
        this.$router.replace('/GardenMain/Overview');
      } else {
        this.$router.replace('/user/login');
      }
    },
    backPrev() {
      if (Object.keys(this.routes).length || this.routes.length) {
        this.$router.go(-1);
      } else {
        this.$router.replace('/user/login');
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
