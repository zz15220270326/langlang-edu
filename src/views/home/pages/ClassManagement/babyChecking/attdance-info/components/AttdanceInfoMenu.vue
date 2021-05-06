<template>
  <querymenu>
    <div slot="first" class="menu-1">
      <!-- <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      /> -->
      <group-select :renderList="classInfoList" @getSelect="getClassInfo" />
      <DatePicker
        type="month"
        class="select-month"
        @on-change="handleYM"
        placeholder="请选择月份"
      />
      <search-button @click.native="handleSearch" />
    </div>
    <div slot="second" class="menu-2">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleOps(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import GroupSelect from '@common/group-select';
import SearchButton from '@common/search-button';
// ? utils
import {
  getDays,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { switchGrade } from '../utils/function';
// ? configs

// ? import mixins
import classInfoMixs from '@/mixins/Common/getClassMixins';

import { mapState } from 'vuex';

export default {
  name: 'AttdanceInfoMenu',
  components: {
    Querymenu,
    GroupSelect,
    SearchButton
  },
  mixins: [classInfoMixs],
  data: () => ({
    operations: [
      {
        tag: '出勤',
        type: 'success'
      },
      {
        tag: '病假',
        type: 'error'
      },
      {
        tag: '事假',
        type: 'warning'
      }
    ],
    params: {},
    classTitle: '',
    classInfoList: [],
    currentClassId: 0
  }),
  props: {
    classGroups: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  watch: {
    classGroups(newVal) {
      Object.keys(newVal).length && this.setClassInfo(newVal);
    },
    classTitle() {
      this.setCrtClass();
    }
  },
  computed: {
    ...mapState(['defaultYear', 'defaultMonth'])
  },
  methods: {
    setClassInfo(infos = {}) {
      this.classInfoList = [];
      Object.keys(infos).forEach((g, gi) => {
        this.classInfoList.push({
          label: switchGrade(g),
          index: gi + 1,
          list: infos[g].map((c, ci) => {
            let item = {};
            item.index = ci + 1;
            item.id = c.id;
            item.info = c.ClassName;
            return item;
          })
        });
      });
      this.currentClassId = this.classInfoList[0].list[0].id;
    },
    getClassInfo(id, info) {
      // console.log(id, info);
      this.currentClassId = id;
      this.classTitle = info;
    },
    setCrtClass() {
      this.params.crtClass = this.classTitle;
      this.params.classId = this.currentClassId;
    },
    initYM() {
      const year = this.defaultYear,
        month = this.defaultMonth;
      const days = getDays(year, month);
      const startDate = `${year}-${month}-01`;
      const endDate = `${year}-${month}-${days}`;
      this.params.year = year;
      this.params.month = month;
      this.params.startDate = startDate;
      this.params.endDate = endDate;
    },
    handleYM(yM = '') {
      if (yM.length) {
        const [year, month] = yM.split('-');
        const days = getDays(year, month);
        const startDate = `${year}-${month}-01`;
        const endDate = `${year}-${month}-${days}`;
        this.params.year = year;
        this.params.month = month;
        this.params.startDate = startDate;
        this.params.endDate = endDate;
      } else this.initYM();
    },
    handleSearch() {
      const params = deepCopyObj(this.params);
      this.$emit('handleSearch', params);
    },
    handleOps(btnTag) {
      switch (btnTag) {
        case '出勤':
          this.handleAttdence();
          break;
        case '病假':
          this.handleSickHdy();
          break;
        case '事假':
          this.handleThingHdy();
          break;
      }
    },
    handleAttdence() {
      this.$emit('handleAttdence');
    },
    handleSickHdy() {
      this.$emit('handleSickHdy');
    },
    handleThingHdy() {
      this.$emit('handleThingHdy');
    }
  },
  created() {
    this.initYM();
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 1rem 0;
  .full_flex();
  .menu-1 {
    flex: 2;
    .select-menu {
      margin: 0 0.6rem;
    }
    .select-month {
      width: 12rem;
      margin: 0 0.8rem;
    }
  }
  .menu-2 {
    flex: 3;
    text-align: right;
    margin-right: 2rem;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
