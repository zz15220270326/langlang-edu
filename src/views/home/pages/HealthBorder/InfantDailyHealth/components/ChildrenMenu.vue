<template>
  <querymenu>
    <div slot="first" class="select">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
      <select-menu
        :listTitle="healthStatusTitle"
        :listItems="healthStatusList"
        @handleSelect="selectHealthStatus"
      />
    </div>
    <div slot="second" class="input">
      <Input
        placeholder="请输入幼儿姓名"
        class="stu-name"
        @on-blur="getInfantName"
      />
      <DatePicker
        class="pick-time-span"
        type="daterange"
        split-panels
        placeholder="请选择开始日期和结束日期"
        @on-change="getTimeSpan"
      ></DatePicker>
    </div>
    <div slot="third" class="operations">
      <Button
        v-for="(item, key) in operations"
        :key="key"
        :type="item.type"
        @click.native="menuOperations(key)"
      >
        {{ item.tag }}
      </Button>
    </div>
    <div slot="fourth" class="create-report">
      <Button type="success" @click.native="createTable"> 生成报表 </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import healthStatusMixin from '@/mixins/health-border/healthStatusMixin';

export default {
  name: 'ChildrenMenu',

  components: {
    Querymenu,
    SelectMenu
  },

  mixins: [getClassMixins, healthStatusMixin],

  data: () => ({
    operations: [
      {
        type: 'primary',
        tag: '查询'
      },
      {
        type: 'error',
        tag: '删除'
      }
    ],
    params: {
      page_size: 20
    }
  }),

  props: {},

  computed: {},

  methods: {
    getInfantName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.infantName = value;
      } else {
        delete this.params.infantName;
      }
    },
    getTimeSpan(timeSpan) {
      if (timeSpan.length > 0 && timeSpan[0] && timeSpan[1]) {
        this.params.startTime = timeSpan[0];
        this.params.endTime = timeSpan[1];
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
    },
    menuOperations(index) {
      switch (index) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch() {
      // ? this.currentClassId.indexOf(',') === -1
      this.currentClassId > 0
        ? (this.params.classId = this.currentClassId)
        : delete this.params.classId;
      this.healthCondition > 0
        ? (this.params.healthCondition = this.healthCondition)
        : delete this.params.healthCondition;
      const params = JSON.parse(JSON.stringify(this.params));
      console.log(params);
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDeleteItems');
    },
    createTable() {
      this.$emit('createTable');
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-menu {
  padding: 0.8rem 0;
  .flex-center;
  .select {
    flex: 2;
    .flex-center;
  }
  .input {
    flex: 3;
    .flex-center;
    justify-content: space-evenly;
    .stu-name {
      width: 12rem;
    }
    .pick-time-span {
      width: 16rem;
    }
  }
  .operations {
    flex: 2;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
  .create-report {
    flex: 2;
    text-align: right;
    margin-right: 1.2rem;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
}
</style>
