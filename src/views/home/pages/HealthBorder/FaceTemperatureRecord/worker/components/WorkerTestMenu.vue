<template>
  <querymenu>
    <div slot="first" class="select-career">
      <select-menu
        :listTitle="careerTitle"
        :listItems="careerList"
        @handleSelect="selectCareer"
      />
    </div>
    <div slot="second" class="input">
      <Input
        class="teahcer-name-input"
        placeholder="请输入教师姓名"
        @on-blur="getTeacherName"
      />
      <DatePicker
        type="daterange"
        class="select-date-span"
        split-panels
        placeholder="请选择时间范围"
        @on-change="getDateSpan"
      />
    </div>
    <div slot="third" class="health-status">
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
import careerMixin from '@/mixins/health-border/careerMixin';
import healthStatusMixin from '@/mixins/health-border/healthStatusMixin';

export default {
  name: 'WorkerTestMenu',

  components: {
    Querymenu,
    SelectMenu,
    SearchButton
  },

  mixins: [careerMixin, healthStatusMixin],

  data: () => ({
    careerTitle: '',
    careerList: [],
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

  watch: {
    healthCondition(newValue) {
      if (newValue > 0) {
        this.params.temperatureStatus = newValue;
      } else delete this.params.temperatureStatus;
    }
  },

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
      const [startTime, endTime] = dateSpan;
      if (startTime !== '' && endTime !== '') {
        this.params.startTime = startTime;
        this.params.endTime = endTime;
      } else {
        delete this.params.startTime;
        delete this.params.endTime;
      }
    },
    handleSearch() {
      const params = JSON.parse(JSON.stringify(this.params));
      this.$emit('handleSearch', params);
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
  .select-career {
    text-align: center;
    flex: 1;
  }
  .input {
    flex: 3;
    .flex-center;
    justify-content: space-evenly;
    .teahcer-name-input {
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
