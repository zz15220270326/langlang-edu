<template>
  <querymenu>
    <div class="menu" slot="first">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div class="name" slot="second">
      <Input
        placeholder="请输入教师姓名"
        width="200"
        suffix="ios-search"
        @on-blur="getTeacherName"
      />
    </div>
    <div class="date" slot="third">
      <DatePicker
        type="date"
        placeholder="Select date"
        @on-change="getSelectDate"
      />
    </div>
    <div class="search-button" slot="fourth">
      <search-button @click.native="handleSearch" />
    </div>
  </querymenu>
</template>

<script>
// ? common components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';

// ? utils
import {
  getMondayDate,
  getDays,
  // ? is-add-zero
  isAddZero
} from '@/utils';

// ? mixins
import getClassMixins from '@/mixins/Common/getClassMixins';

// ? mapState
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'DutyQueryMenu',
  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },
  mixins: [getClassMixins],
  data: () => ({
    params: {}
  }),
  watch: {
    teacherIds(newValue) {
      this.params.teacher_ids = newValue;
    }
  },
  computed: {
    ...mapState(['defaultYear', 'defaultMonth', 'defaultDay']),
    ...mapGetters(['ymdGetters'])
  },
  methods: {
    getTeacherName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.teacher_name = value;
      } else delete this.params.teacher_name;
    },
    initSelectDate() {
      const date = getMondayDate(this.ymdGetters);
      this.getSelectDate(date);
    },
    getSelectDate(date = '') {
      let startTime = '';
      date !== ''
        ? (startTime = getMondayDate(date))
        : (startTime = getMondayDate(this.ymdGetters));
      const list = startTime.split('-'),
        day = getDays(list[0] * 1, list[1] * 1);
      this.params.start_time = startTime;
      if (list[2] * 1 + 13 <= day) {
        this.params.end_time = `${list[0]}-${list[1]}-${list[2] * 1 + 13}`;
      } else {
        this.params.end_time = `${
          list[1] * 1 + 1 <= 12 ? list[0] : list[0] * 1 + 1
        }-${isAddZero(list[1] * 1 + 1 <= 12 ? list[1] * 1 + 1 : 1)}-${isAddZero(
          list[2] * 1 + 13 - day
        )}`;
      }
    },
    handleSearch() {
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
      // console.log(params)
    }
  },
  created() {
    this.initSelectDate();
  }
};
</script>

<style lang="less" scoped>
#flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  display: flex;
  margin-top: 1.2rem;
  padding: 1.2rem 0;
  .menu {
    flex: 1;
  }
  .name {
    flex: 1;
    padding: auto 0;
    #flex-center;
  }
  .date {
    flex: 1.5;
    #flex-center;
  }
  .search-button {
    flex: 5;
    margin-top: 0.1rem;
  }
}
</style>
