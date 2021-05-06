<template>
  <div class="weekly-menu">
    <querymenu>
      <div slot="first" class="select">
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
      <div slot="second" class="operations">
        <Button
          v-for="(item, idx) in operations"
          :key="idx"
          :type="item.type"
          @click.native="handleOperations(idx)"
        >
          {{ item.tag }}
        </Button>
      </div>
      <div slot="third" class="add">
        <Button type="success" @click.native="openAddModal"> 新建食谱 </Button>
      </div>
    </querymenu>
  </div>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getWeekTimeMixins from '@/mixins/Common/getWeekTimeMixins';

export default {
  name: 'WeeklyMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  mixins: [getYearMixins, getSemesterMixins, getWeekTimeMixins],
  data: () => ({
    operations: [
      {
        tag: '查询',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ]
  }),
  methods: {
    // ? operations-event
    handleOperations(btnIdx) {
      const params = {
        page_size: 20
      };
      if (this.year !== '' && this.year !== '选择学年') {
        params.year = this.year;
      }
      if (this.semester !== 0) {
        params.semester = this.semester;
      }
      if (this.week !== 0) {
        params.week = this.week;
      }
      if (btnIdx === 0) {
        console.log(params);
      }
      this.$emit('handleOperations', btnIdx, params);
      this.initAll();
    },
    openAddModal() {
      this.$emit('openAddModal');
    },
    initAll() {
      this.yearTitle = '选择学年';
      this.year = '';
      this.semesterTitle = '全部学期';
      this.semester = 0;
      this.weekTimeTitle = '全部周次';
      this.week = 0;
    }
  }
};
</script>

<style lang="less" scoped>
.weekly-menu {
  .query-menu {
    width: 100%;
    padding: 1.2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .select {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .operations {
      flex: 1;
      .ivu-btn {
        width: 5rem;
        margin: 0 0.5rem;
      }
    }
    .add {
      flex: 2;
      text-align: right;
      .ivu-btn {
        width: 6rem;
        margin-right: 1.2rem;
      }
    }
  }
}
</style>
