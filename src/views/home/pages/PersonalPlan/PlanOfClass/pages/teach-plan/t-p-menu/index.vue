<template>
  <Querymenu>
    <div slot="first" class="first">
      <!-- year-info -->
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
    <div slot="second" class="second">
      <select-menu
        :listTitle="statusTitle"
        :listItems="statusList"
        @handleSelect="getStatus"
      />
    </div>
    <div slot="third" class="third">
      <Button
        v-for="(item, index) in operations"
        :key="index"
        :type="item.type"
        @click.native="handleAll(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="fourth" class="fourth">
      <Button type="info" @click.native="addTeachPlan">
        创建教学计划
        <Icon type="md-add" />
      </Button>
    </div>
  </Querymenu>
</template>

<script>
// ? import components
// ? 1. query-menu
import Querymenu from '@common/query-menu';
// ? 2. select-menu
import { SelectMenu } from '@common/select-menu';
// ? mapState
import { mapState } from 'vuex';
// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getWeekTimeMixins from '@/mixins/Common/getWeekTimeMixins';
import getStatusMixin from '@/mixins/Common/getStatusMixin';
import menuCommonMixin from '@/mixins/plan/menuCommonMixin';

// ? import styles
import './index.less';

export default {
  name: 'TeachQueryMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  data: () => ({
    // currentClassId
    // year
    // semester
    // week
    // status (重写状态)
    statusList: [
      {
        info: '未点评',
        key: 0
      },
      {
        info: '已点评',
        key: 1
      }
    ]
  }),
  computed: {
    ...mapState(['defaultYear'])
  },
  mixins: [
    getClassMixins,
    getYearMixins,
    getSemesterMixins,
    getWeekTimeMixins,
    getStatusMixin,

    menuCommonMixin
  ]
};
</script>
