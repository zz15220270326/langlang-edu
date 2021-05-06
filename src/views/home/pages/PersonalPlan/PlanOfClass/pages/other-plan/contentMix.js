// ? components
import PlanTable from 'HomePage/PersonalPlan/PlanTable';
// ? request
import {
  getOtherPlanList,
  getOtherPlanInfo
} from '@/request/plan/1-class-plan';
import deletePlan from '@/request/plan/3-delete-plan/deletePlan';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? htmlToText
  htmlToText
} from '@/utils';

export default {
  components: { PlanTable },
  data() {
    return {
      titleList: [
        {
          type: 'selection',
          width: 80,
          align: 'center'
        },
        {
          title: '序号',
          key: 'number',
          align: 'center',
          width: 120
        },
        {
          title: '标题',
          key: 'content',
          align: 'center',
          width: 360
        },
        {
          title: '班级',
          key: 'className',
          align: 'center',
          width: 150
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 120
        },
        {
          title: '提交人',
          key: 'realname',
          align: 'center',
          width: 120
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 240
        },
        {
          title: '操作',
          slot: 'operations',
          align: 'center',
          width: 500
        },
      ],
      dataList: [],
      selectItem: [],
      tableIsLoading: false,
      total: 0,
      totalPage: 0
    };
  },
  methods: {
    // ? 表格内容的方法
    async getOtherPlanInfo(params = { page_size: 20 }) {
      const result = await getOtherPlanList(params),
        dataSource = await getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.tableIsLoading = false;
        this.total = dataSource.total || 0;
        this.totalPage = dataSource.total_page || 0;
        this.dataList = [];
        if (dataSource.list) {
          const { list } = dataSource;
          list.map((item, key) => {
            this.dataList.push({
              number: key + 1,
              content: htmlToText(item.content).input,
              className: item.class_name,
              classId: item.class_id,
              status: item.status === 0 ? '待点评' : item.status === 1 ? '已点评' : '',
              realname: item.realname,
              createTime: item.create_time,
              operations: [
                {
                  tag: '详情',
                  type: 'info'
                },
                {
                  tag: '编辑',
                  type: 'primary'
                },
                {
                  tag: '导出',
                  type: 'success'
                },
                {
                  tag: '删除',
                  type: 'error'
                },
              ],
              id: item.id
            });
          });
        } else this.$Message.error({
          content: `请求数据失败, 原因: ${result.msg}`,
          background: true,
          duration: 2000
        });
      }
    },
    changeTableData(params) {
      this.getOtherPlanInfo(params);
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    handleOperations(tag, selectIndex, table) {
      switch (tag) {
        case '详情':
          this.openInfoModal(selectIndex);
          break
        case '编辑':
          this.openEditModal(selectIndex);
          break
        case '导出':
          this.$Message.success(`导出第${selectIndex + 1}条内容`);
          this.handleExport(selectIndex, table);
          break
        case '删除':
          this.handleDelete(selectIndex);
          break
      }
    },
    async openInfoModal(selectIndex) {
      this.$Message.success('查看详情');
      const { id } = this.dataList[selectIndex];
      const result = await getOtherPlanInfo(id);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.infos = {
          infoTitle: dataSource.title,
          infoTime: this.dataList[selectIndex].createTime,
          infoId: id,
          info: dataSource
        };
        this.infoModalTitle = '详情';
        this.isShowInfoModal = true;
      } else this.$Message.error('获取详情失败, 请稍后重试');
    },
    async openEditModal(selectIndex) {
      const { id } = this.dataList[selectIndex];
      const result = await getOtherPlanInfo(id);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.edits = {
          id,
          className: this.dataList[selectIndex].className,
          classId: this.dataList[selectIndex].classId.toString(),
          title: dataSource.title,
          content: htmlToText(dataSource.content).htmlText
        };
        this.editModalTitle = '编辑';
        this.isShowEditModal = true;
      } else {
        this.$Message.error('获取详情失败, 请稍后编辑');
      }
    },
    handleExport(selectIndex, table) {
      this.$Message.success(`导出第${selectIndex + 1}条内容`);
      table.exportCsv({
        filename: `表格第${selectIndex}条数据`,
        data: this.dataList[selectIndex],
        original: false
      });
    },
    handleDelete(selectIndex) {
      this.$Modal.confirm({
        title: '删除这一条信息',
        content: '您是否要删除这一条记录? 删除后数据无法恢复!',
        onOk: async () => {
          const { id } = this.dataList[selectIndex];
          const result = await deletePlan(id);
          // console.log(result);
          if (result.status === 'Success') {
            this.$Message.error('删除成功');
            this.getOtherPlanInfo();
          } else {
            this.$Message.warning('当前服务繁忙, 请稍后再试!');
          }
        },
        onCancel: () => {
          this.$Message.info('您取消了本次操作');
        }
      })
    },
  },
  created() {
    this.getOtherPlanInfo();
  }
}