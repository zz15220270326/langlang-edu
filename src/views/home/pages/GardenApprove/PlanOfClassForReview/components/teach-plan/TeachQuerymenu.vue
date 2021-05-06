<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="checkApproveStatus(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="second" class="select-class">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <select-menu
        :listTitle="yearTitle"
        :listItems="yearList"
        @handleSelect="selectYear"
      />
      <select-menu
        :listTitle="semesterTitle"
        :listItems="semesterList"
        @handleSelect="selectSemester"
      />
      <select-menu
        :listTitle="weekTimeTitle"
        :listItems="weekTimeList"
        @handleSelect="selectWeekTime"
      />
    </div>
    <div slot="third" class="search-button">
      <search-button @click.native="searchComment" />
    </div>
  </querymenu>
</template>

<script>
// ? components
import SelectMenu from '@common/select-menu/SelectMenu.vue';
import SearchButton from '@common/search-button';

import Querymenu from '@common/query-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getWeekTimeMixins from '@/mixins/Common/getWeekTimeMixins';

export default {
  name: 'TeachQuerymenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getClassMixins, getYearMixins, getSemesterMixins, getWeekTimeMixins],
  props: {
    commentStatus: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    statusIndex: 0,
    operations: [
      {
        tag: '待点评',
        type: 'info'
      },
      {
        tag: '已点评',
        type: 'default'
      }
    ]
  }),
  methods: {
    checkApproveStatus(statusIndex) {
      this.statusIndex = statusIndex;
      this.operations.forEach((item, index) =>
        index === statusIndex ? (item.type = 'info') : (item.type = 'default')
      );
      const params = {
        isRemarked: this.statusIndex
      };
      this.initSelect();
      this.$emit('getTableByStatus', params);
    },
    // ? search-function
    searchComment() {
      const { statusIndex, currentClassId, year, semester, week } = this;
      const params = {};
      params.isRemarked = statusIndex;
      if (currentClassId) {
        params.classId = currentClassId;
      }
      if (year !== '' && year !== '选择学年') {
        params.year = year;
      }
      if (semester !== 0) {
        params.semester = semester;
      }
      if (week !== 0) {
        params.week = week;
      }
      this.$emit('getTableBySelects', params);
    },
    initSelect() {
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;

      this.year = '选择学年';
      this.yearTitle = this.yearList[0].info;

      this.semester = 0;
      this.semesterTitle = this.semesterList[0].info;

      this.week = 0;
      this.weekTimeTitle = this.weekTimeList[0].info;
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
  margin: 1.2rem 0;
  padding: 0.8rem 0.6rem;
  .flex-center;
  .approve-status {
    flex: 1.2;
    .flex-center;
    justify-content: space-evenly;
    .ivu-btn {
      width: 5.6rem;
      margin: 0 0.5rem;
    }
  }
  .select-class {
    flex: 1;
    .flex-center;
  }
  .input-child {
    flex: 1;
    .flex-center;
  }
  .search-button {
    flex: 5;
  }
}
</style>
