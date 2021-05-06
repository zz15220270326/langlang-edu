<template>
  <querymenu>
    <div slot="first" class="input">
      <!-- 请输入教师姓名 -->
      <Input
        class="input-teacher-name"
        placeholder="请输入教师姓名"
        @on-blur="getTeacherName"
      />
      <DatePicker
        type="daterange"
        split-panels
        placeholder="选择时间范围"
        @on-change="getDateSpan"
      ></DatePicker>
    </div>
    <div slot="second" class="select">
      <select-menu
        :listTitle="healthStatusTitle"
        :listItems="healthStatusList"
        @handleSelect="selectHealthStatus"
      />
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
    <div slot="fourth" class="export">
      <Button type="success" @click.native="exportTable"> 导出 </Button>
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';

// ? import mixins
import healthStatusMixin from '@/mixins/health-border/healthStatusMixin';
// ? utils
import { healthStatusList } from '../myUtils';

export default {
  name: 'WorkerMenu',

  components: {
    Querymenu,
    SelectMenu
  },

  mixins: [healthStatusMixin],

  data: () => ({
    healthStatusList,
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
  methods: {
    getTeacherName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.teacherName = value;
      } else {
        delete this.params.teacherName;
      }
    },
    getDateSpan(dateSpan) {
      if (dateSpan[0] !== '' && dateSpan[1] !== '') {
        this.params.startTime = dateSpan[0];
        this.params.endTime = dateSpan[1];
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
    },
    setHealthCondition() {
      if (this.healthCondition > 0) {
        this.params.healthCondition = this.healthCondition;
      } else {
        delete this.params.healthCondition;
      }
    },
    menuOperations(btnIdx) {
      switch (btnIdx) {
        case 0:
          this.handleSearch();
          break;
        case 1:
          this.handleDeleteItems();
          break;
      }
    },
    handleSearch() {
      this.setHealthCondition();
      const params = Object.assign({}, this.params);
      this.$emit('handleSearch', params);
    },
    handleDeleteItems() {
      this.$emit('handleDeleteItems');
    },
    exportTable() {
      this.$emit('exportTable');
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
    .input-teacher-name {
      width: 13rem;
    }
  }
  .operations {
    flex: 2;
    .ivu-btn {
      width: 6rem;
      margin: 0 0.8rem;
    }
  }
  .export {
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
