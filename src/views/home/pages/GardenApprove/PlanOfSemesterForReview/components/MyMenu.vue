<template>
  <querymenu>
    <div slot="first" class="approve-status">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="handleCommentButtons(key)"
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
    </div>
    <div slot="third" class="search-button">
      <search-button @click.native="searchComment" />
    </div>
  </querymenu>
</template>

<script>
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';
// ? common components
import Querymenu from '@common/query-menu';
// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';

export default {
  name: 'SemesterMenu',
  components: {
    Querymenu,
    SelectMenu,

    SearchButton
  },
  mixins: [getClassMixins, getYearMixins, getSemesterMixins],
  props: {},
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
    handleCommentButtons(statusIndex) {
      this.statusIndex = statusIndex;
      this.operations.forEach((item, index) =>
        index === statusIndex ? (item.type = 'info') : (item.type = 'default')
      );
      const params = {
        isRemarked: this.statusIndex
      };
      this.initSelect();
      this.$emit('searchTableByStatus', params);
    },
    // ? search-function
    searchComment() {
      const params = {};
      if (this.currentClassId) {
        params.classId = this.currentClassId;
      }
      if (this.year !== '选择学年' && this.year !== '') {
        params.year = this.year;
      }
      if (this.semester !== 0) {
        params.semester = this.semester;
      }
      this.$emit('searchComment', params);
    },
    initSelect() {
      this.classTitle = this.classList[0].info;
      this.currentClassId = this.classList[0].classId;
      this.teacherIds = this.classList[0].teacherIds;

      this.year = '选择学年';
      this.yearTitle = this.yearList[0].info;

      this.semester = 0;
      this.semesterTitle = this.semesterList[0].info;
    }
  }
};
</script>

<style lang="less" scoped>
.query-menu {
  margin: 1.2rem 0;
  padding: 0.8rem 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .approve-status {
    flex: 1.2;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .ivu-btn {
      width: 5.6rem;
    }
  }
  .select-class {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-child {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-button {
    flex: 5;
  }
}
</style>
