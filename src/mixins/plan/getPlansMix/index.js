// ? async-functions
import { getTimePlanList } from '@/request/plan/1-class-plan';

// ? utils
import { getDataSource, checkDataSource } from '@/utils';

export default {
  data() {
    return {
      // ? 显示下拉列表的标题和下拉列表的内容
      planTitle: '',
      planList: [],
      planId: 0,
      planIndex: 0
    }
  },
  watch: {
    planId(planId) {
      this.$bus.$emit('emitSelectPlanId', planId, this.planIndex);
    },
    planIndex(planIndex) {
      this.$bus.$emit('emitSelectPlanId', this.planId, planIndex);
    }
  },
  methods: {
    async getPlansData() {
      const result = await getTimePlanList();
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // console.log(dataSource)
        if (dataSource.list) {
          const { list } = dataSource;
          this.planList = [];
          this.planTitle = list[0].name ? list[0].name : '';
          this.planList[0] = {
            planId: 0,
            gardenId: 0,
            type: 'none',
            info: '请选择计划类型',
            status: '',
            disabled: true
          }
          this.planTitle = '请选择计划类型';
          list.forEach((item, index) => {
            this.planList.push({
              planId: item.id,
              gardenId: item.garden_id,
              type: item.type,
              info: item.name,
              status: item.status,
              used: item.used,
              index
            });
          });
          this.$bus.$emit('emitSelectPlanId', this.planId, this.planIndex);
        }
      } else {
        this.$Message.error('请求失败, 请稍后重试');
      }
    },
    selectPlan(selectItem) {
      this.planTitle = selectItem.info;
      this.planId = selectItem.planId;
      this.planIndex = selectItem.index;
      this.$bus.$emit('emitSelectPlanId', this.planId, this.planIndex);
    },
    updateAddedPlan() {
      this.getPlansData();
      this.$bus.$on('updateAddedPlan', () => this.getPlansData());
    }
  },
  created() {
    this.getPlansData();
  },
  mounted() {
    this.updateAddedPlan();
  }
}