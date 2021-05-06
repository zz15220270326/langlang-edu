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
        :listTitle="statusTitle"
        :listItems="statusList"
        @handleSelect="getStatus"
      />
    </div>
    <div slot="second" class="second">
      <Button
        v-for="item in operations"
        :key="item.tag"
        :type="item.type"
        @click.native="handleMenuBtns(item.tag)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="third" class="third">
      <Button type="success" @click.native="addSemesterPlan">
        创建学期计划
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
// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import getYearMixins from '@/mixins/Common/getYearMixins';
import getSemesterMixins from '@/mixins/Common/getSemesterMixins';
import getStatusMixin from '@/mixins/Common/getStatusMixin';

export default {
  name: 'SemesterQueryMenu',
  components: {
    Querymenu,
    SelectMenu
  },
  mixins: [
    // ? top-select-mixs
    getClassMixins,
    getYearMixins,
    getSemesterMixins,
    getStatusMixin
  ],
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
    handleMenuBtns(btnTag) {
      const params = {};
      // ? this.currentClassId.indexOf(',') === -1
      if (this.currentClassId > 0) {
        params.classId = this.currentClassId * 1;
      }
      if (this.year.indexOf('2') !== -1) {
        params.year = this.year * 1;
      }
      if (this.semester && this.semester !== 0) {
        params.semester = this.semester * 1;
      }
      if (this.status === 0 || this.status === 1) {
        params.isRemarked = this.status * 1;
      }
      this.$emit('handleAll', btnTag, params);
    },
    addSemesterPlan() {
      this.$emit('addSemesterPlan');
    }
  }
};
</script>

<style lang="less" scoped>
.flex-format {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  background-color: #fff;
  color: #666;
  margin-top: 1.2rem;
  .flex-format;
  .first {
    flex: 3;
    .flex-format;
    padding: 1.2rem 0;
  }
  .second {
    flex: 2;
    padding: 1.2rem 0;
    .ivu-btn {
      margin-left: 0.6rem;
      width: 5rem;
    }
  }
  .third {
    flex: 2;
    padding: 1.2rem;
    .flex-format;
    .ivu-btn {
      width: 8rem;
    }
  }
}
</style>
