<template>
  <Querymenu>
    <div class="menu" slot="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div class="input" slot="second">
      <Input
        class="teacher-name-input"
        placeholder="请输入教师姓名"
        @on-blur="getTeacherName"
      />
    </div>
    <div class="date" slot="third">
      <DatePicker
        class="select-ym"
        type="month"
        placeholder="请选择月份"
        @on-change="getYm"
      />
    </div>
    <div class="search-button" slot="fourth">
      <Button type="primary" @click.native="handleSearch"> 查询 </Button>
    </div>
  </Querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? utils
import { getDays } from '@/utils';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'FullMenu',

  components: {
    Querymenu,
    SelectMenu
  },

  mixins: [getClassMixins],

  data: () => ({
    params: {}
  }),

  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'days'])
  },

  watch: {
    teacherIds(newVal) {
      this.params.teacher_ids = JSON.parse(JSON.stringify(newVal));
    }
  },

  methods: {
    getPageSize(size = 10) {
      this.params.page_size = size;
    },
    getTeacherName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.teacher_name = value;
      } else delete this.params.teacher_name;
    },
    getYm(yM) {
      this.getPageSize(20);
      if (yM !== '') {
        const [year, month] = yM.split('-');
        const days = getDays(year * 1, month * 1);
        this.params.start_time = `${year}-${month}-01`;
        this.params.end_time = `${year}-${month}-${days}`;
      } else this.initYm();
    },
    initYm() {
      this.params.start_time = `${this.defaultYear}-${this.defaultMonth}-01`;
      this.params.end_time = `${this.defaultYear}-${this.defaultMonth}-${this.days}`;
    },
    initParams() {
      this.getPageSize(20);
      this.initYm();
    },
    handleSearch() {
      if (!this.params.start_time) {
        this.initParams();
      }
      const params = JSON.parse(JSON.stringify(this.params));
      // console.log(params)
      this.$emit('handleSearch', params);
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  width: 100%;
  display: flex;
  padding: 1.6rem 0;
  .menu {
    flex: 1;
    .flex-center;
  }
  .input {
    flex: 1.2;
    .flex-center;
  }
  .date {
    flex: 2;
    .flex-center;
  }
  .search-button {
    flex: 5;
    .ivu-btn {
      width: 5.6rem;
    }
  }
}
</style>
