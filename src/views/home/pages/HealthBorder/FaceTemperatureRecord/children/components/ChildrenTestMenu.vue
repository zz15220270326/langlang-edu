<template>
  <querymenu>
    <div slot="first" class="select-class">
      <select-menu
        :listTitle="classTitle"
        :listItems="classList"
        @handleSelect="selectClass"
      />
    </div>
    <div slot="second" class="input">
      <Input
        class="infant-name-input"
        placeholder="请输入幼儿姓名"
        @on-blur="getInfantName"
      />
      <DatePicker
        class="select-date-span"
        type="daterange"
        split-panels
        placeholder="请选择时间范围"
        @on-change="getDateSpan"
      />
    </div>
    <div slot="third" class="select-status">
      <select-menu
        :listTitle="healthStatusTitle"
        :listItems="healthStatusList"
        @handleSelect="selectHealthStatus"
      />
    </div>
    <div slot="fourth" class="search">
      <search-button @click.native="handleSearch" />
    </div>
  </querymenu>
</template>

<script>
// ? import components
import Querymenu from '@common/query-menu';
import { SelectMenu } from '@common/select-menu';
import SearchButton from '@common/search-button';
// ? import mixins
import getClassMixins from '@/mixins/Common/getClassMixins';
import healthStatusMixin from '@/mixins/health-border/healthStatusMixin';

export default {
  name: 'ChildrenTestMenu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [getClassMixins, healthStatusMixin],

  data: () => ({
    params: {
      page_size: 20
    },
    healthStatusList: [
      {
        info: '健康状态',
        key: 0
      },
      {
        info: '正常',
        key: 1
      },
      {
        info: '异常',
        key: 2
      }
    ]
  }),
  methods: {
    getInfantName(event) {
      const { value } = event.target;
      if (value !== '') {
        this.params.infantName = value;
      } else {
        delete this.params.infantName;
      }
    },
    getDateSpan(dateSpan) {
      if (dateSpan && dateSpan[0] !== '' && dateSpan[1] !== '') {
        this.params.startTime = dateSpan[0];
        this.params.endTime = dateSpan[1];
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
    },
    handleSearch() {
      // ? this.currentClassId.indexOf(',') === -1
      this.currentClassId > 0
        ? (this.params.classId = this.currentClassId)
        : delete this.params.classId;
      this.params.temperatureStatus =
        this.healthCondition > 0 ? this.healthCondition : undefined;
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
      this.clearBoth();
    },
    clearBoth() {
      this.getClassList();
      this.gethealthStatusData();
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
  .flex-center;
  margin: 1rem 0;
  .select-class {
    text-align: center;
    flex: 1;
  }
  .input {
    flex: 3;
    .flex-center;
    justify-content: space-evenly;
    .infant-name-input {
      width: 10.8rem;
    }
  }
  .select-status {
    flex: 1;
  }
  .search {
    flex: 4;
  }
}
</style>
