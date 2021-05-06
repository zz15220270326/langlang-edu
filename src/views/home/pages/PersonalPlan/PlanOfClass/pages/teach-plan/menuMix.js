// ? async-functions
import {
  deleteTeachPlan,
  exportClassPlan
} from '@/request/plan/1-class-plan';

// ? utils
import { handleOpResult } from '@/utils';
import { downloadFile } from '@/utils';

export default {
  data() {
    return {}
  },
  methods: {
    // ? 顶部菜单的方法
    handleAll(info, params) {
      switch (info) {
        case '查询':
          this.handleSearch(params);
          break;
        case '删除':
          this.handleDeleteItems();
          break;
        case '导出':
          this.exportTeachPlan();
          break;
        default:
          break;
      }
    },
    handleSearch(params) {
      this.tableIsLoading = true;
      this.getTeachPlanInfos(params);
      this.tableIsLoading = false;
    },
    handleDeleteItems() {
      if (this.selectItem.length === 0) {
        this.$Message.warning('请选择要删除的计划项');
      } else {
        this.$Modal.confirm({
          title: '删除表格中选中的信息',
          content: '您是否要删除这些已经选中的信息? 删除后数据无法恢复!',
          onOk: () => this.deleteItems(),
          onCancel: () => {
            this.$Message.info('您取消了本次操作')
          }
        });
      }
    },
    async deleteItems() {
      const idArr = [];
      this.selectItem.map(item => idArr.push(item.id));
      const id = idArr.toString();
      const result = await deleteTeachPlan(id);
      if (handleOpResult(result)) {
        this.$Message.success('批量删除成功');
        this.getTeachPlanInfos();
      } else {
        this.$Message.success('删除失败, 请稍后重试');
      }
    },
    addTeachPlan() {
      // this.$bus.$emit('clearEditTeachPlanInfo')
      this.modalTitle = '创建教学计划';
      this.isShowCreateModal = true;
    },
    exportTeachPlan() {
      if (!this.selectItem.length) {
        this.$Message.warning('请选择要导出的内容');
        return;
      } else {
        this.selectItem.map(async item => {
          const id = item.id;
          const result = await exportClassPlan({ id });
          downloadFile(result, '批量导出教学计划', 'application/pdf');
        })
      }
    }
  },
  created() {}
}