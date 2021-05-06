<template>
  <div class="personal-menu">
    <DatePicker
      class="select-ym"
      type="month"
      size="large"
      placeholder="请选择日期(年份和月份)"
      @on-change="getYM"
    />
    <Button size="large" type="primary" @click.native="handleSearch">
      查询
    </Button>
  </div>
</template>

<script>
// ? utils
import { getDays } from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'PersonalMenu',
  data: () => ({
    params: {}
  }),
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days'])
  },
  methods: {
    getYM(yM = '') {
      if (yM !== '') {
        const [year, month] = yM.split('-');
        const days = getDays(year * 1, month * 1);
        this.params = {
          page_size: 20,
          start_time: `${year}-${month}-01`,
          end_time: `${year}-${month}-${days}`
        };
      } else {
        this.initYM();
      }
    },
    initYM() {
      this.params = {
        page_size: 20,
        start_time: `${this.defaultYear}-${this.defaultMonth}-01`,
        end_time: `${this.defaultYear}-${this.defaultMonth}-${this.days}`
      };
    },
    handleSearch() {
      if (!this.params.page_size) {
        this.initYM();
      }
      const params = JSON.parse(JSON.stringify(this.params));
      // console.log(params)
      this.$emit('handleSearch', params);
    }
  }
};
</script>

<style lang="less" scoped>
.personal-menu {
  padding: 1.2rem 0;
  margin-left: 2rem;
  .ivu-btn {
    width: 6.6rem;
    margin: 0 1.2rem;
  }
}
</style>
