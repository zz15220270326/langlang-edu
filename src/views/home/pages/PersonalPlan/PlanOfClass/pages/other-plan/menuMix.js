// ? async-functions / mock-data
import deletePlan from '@/request/plan/3-delete-plan/deletePlan';

// ? utils
import { handleOpResult } from '@/utils';

export default {
  data() {
    return {
      // ? menu-request-data
      classId: '',
      status: 2, // ??? 默认点评状态为 2
    };
  },
  methods: {
    // ? get-menu-functions
    getClassId(classId) {
      this.classId = classId ? classId : 2;
    },
    getStatus(status) {
      if (status || status >= 0) {
        this.status = status;
      }
    },
    handleSearch(params = {}) {
      this.getOtherPlanInfo(params);
    },
    deleteItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的计划项');
      } else {
        this.$Modal.confirm({
          title: '删除表格中选中的信息',
          content: '您是否要删除这些已经选中的信息? 删除后数据无法恢复!',
          onOk: () => this.confirmDelete(),
          onCancel: () => this.cancelDelete()
        });
      }
    },
    async confirmDelete() {
      const idArr = [];
      this.selectItem.forEach(item => idArr.push(item.id));
      const id = idArr.toString();
      const result = await deletePlan(id);
      if (handleOpResult(result)) {
        this.$Message.error('删除成功');
        this.getOtherPlanInfo();
      } else {
        this.$Message.warning('删除失败');
      }
    },
    cancelDelete() {
      this.$Message.info('您取消了本次操作');
    },
  },
  created() {
    this.getClassId();
    this.getStatus();
  }
}