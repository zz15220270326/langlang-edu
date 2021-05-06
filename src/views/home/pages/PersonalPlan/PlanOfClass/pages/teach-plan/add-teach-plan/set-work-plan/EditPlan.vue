<template>
  <div class="info">
    <Table :border="true" :columns="titleList" :data="dataList">
      <template slot-scope="{ index }" slot="planContent">
        <Input
          placeholder="请填写课程内容"
          v-model="itemInputs[index]"
          maxlength="10"
          :show-word-limit="true"
          @on-blur="handlePlanInput($event, index)"
        />
      </template>
      <template slot-scope="{ index }" slot="planTypes">
        <Select
          :transfer="true"
          :value="itemTypes[index]"
          @on-select="selectPlanType($event, index)"
        >
          <Option
            ref="selectOption"
            v-for="item of selectTypeList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.value }}
          </Option>
        </Select>
      </template>
    </Table>
  </div>
</template>

<script>
// ? request
import { getTeacherPlan } from '@/request/plan/1-class-plan';
// ? utils
import {
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
import { postData } from './edit-plan';
import {
  getDayKey,
  getNoonKey,
  setNullValue
  // ? 初始化上传列表
  // initPostData
} from './edit-plan';

export default {
  name: 'EditPlan',
  data: () => ({
    selectTypeList: [],
    timeCases: [],
    titleList: [
      {
        title: '计划时间',
        key: 'time',
        align: 'center'
      },
      {
        title: '计划类型',
        slot: 'planTypes',
        align: 'center'
      },
      {
        title: '计划内容',
        slot: 'planContent',
        align: 'center'
      }
    ],
    // ? 动态渲染
    dataList: [],
    dayIndex: 0,
    noonIndex: 0,
    planId: 0,
    planIndex: 0,
    planTypeIndex: 0,
    tableIsLoading: false,
    postData: {}
  }),
  computed: {
    itemTypes() {
      const { type } = this.postData[getDayKey(this.dayIndex)][
        getNoonKey(this.noonIndex)
      ];
      return type;
    },
    itemInputs() {
      return this.postData[getDayKey(this.dayIndex)][getNoonKey(this.noonIndex)]
        .class;
    }
  },
  methods: {
    initPostData() {
      this.postData = deepCopyObj(postData);
    },
    async getSourceData() {
      const result = await getTeacherPlan();
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.initPostData();
        this.init(dataSource);
        this.setTableData();
      } else {
        this.$Message.error('查询失败, 请稍后重试');
      }
    },
    init(dataSource) {
      this.initTargetSource(dataSource);
      this.setTimeCases(dataSource);
      // console.log('selectTypeList', this.selectTypeList)
      // console.log('timeCases', this.timeCases)
    },
    // ? 步骤
    initTargetSource(data) {
      if (data.time_case_types) {
        const sourceList = data.time_case_types;
        sourceList.map((item, key) => {
          this.selectTypeList.push({
            id: item.id,
            key,
            gardenId: item.garden_id,
            type: item.type,
            value: item.name
          });
        });
      }
    },
    setTimeCases(data) {
      if (data.time_cases) {
        this.timeCases = data.time_cases;
      }
    },
    setTableData() {
      // ? 切换时间列表
      const timeTables = this.timeCases[this.planIndex].timeTables || [];
      if (timeTables.length) {
        this.dataList = [];
        timeTables.forEach(item => {
          const { start_time, end_time } = item;
          const startHour = start_time.split(':')[0] * 1;
          if (this.noonIndex === 0) {
            // ? 上午
            if (startHour < 13) {
              this.dataList.push({
                time: `${start_time}-${end_time}`
              });
            }
          }
          if (this.noonIndex === 1) {
            // ? 下午
            if (startHour >= 13) {
              this.dataList.push({
                time: `${start_time}-${end_time}`
              });
            }
          }
        });
      } else this.$Message.error('暂无内容');
    },
    // ? this.postData this.dayIndex this.noonIndex
    handlePlanInput(event, rowIndex) {
      const { value } = event.target;
      this.itemInputs[rowIndex] = value;
      setNullValue(this.itemInputs, rowIndex);
      this.$emit('getAddTeachPlanData', this.postData);
    },
    selectPlanType(info, rowIndex) {
      this.itemTypes[rowIndex] = info.value;
      setNullValue(this.itemTypes, rowIndex);
      this.$emit('getAddTeachPlanData', this.postData);
    },
    // ? 其它组件改变引起自身的改变
    getPlanId() {
      this.$bus.$on('emitSelectPlanId', (planId, planIndex) => {
        this.planId = planId;
        this.planIndex = planIndex;
        this.setTableData();
        this.initPostData();
        this.$emit('getAddTeachPlanData', this.postData);
      });
    },
    handleNoonChange() {
      this.$bus.$on('selectNoon', noonIndex => {
        this.noonIndex = noonIndex;
        this.setTableData();
      });
    },
    handleDayChange() {
      this.$bus.$on('selectWorkDay', dayIndex => {
        this.dayIndex = dayIndex;
        this.setTableData();
      });
    },
    handleBeforeAdd() {},
    handleBeforeEdit() {
      this.$bus.$on('handleEditTeachPlanInfo', edits => {
        const { content } = edits;
        this.postData = JSON.parse(JSON.stringify(content));
      });
    }
  },
  created() {
    this.getSourceData();
  },
  mounted() {
    this.getPlanId();
    this.handleNoonChange();
    this.handleDayChange();

    this.handleBeforeAdd();
    this.handleBeforeEdit();
  }
};
</script>

<style lang="less" scoped>
.info {
  width: 100%;
  text-align: center;
  overflow: auto;
}
</style>
