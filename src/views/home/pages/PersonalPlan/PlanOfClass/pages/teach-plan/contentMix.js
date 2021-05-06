// ? async-functions / mock-data
import {
  getTeachPlanList,
  exportClassPlan,
  deleteTeachPlan
} from '@/request/plan/1-class-plan';

// ? utils
import {
  renderStatus,
  getDataSource,
  checkDataSource,

  handleOpResult,
  // ? export download
  downloadFile
} from '@/utils';

export default {
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
          width: 100
        },
        {
          title: '提交人',
          key: 'realname',
          align: 'center',
          width: 180
        },
        {
          title: '计划名称',
          key: 'planName',
          align: 'center',
          width: 420
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 150,
          render: (h, params) => renderStatus(h, params)
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 220
        },
        {
          title: '操作',
          slot: 'operations',
          align: 'center',
          width: 500
        }
      ],
      dataList: [],
      tableIsLoading: false,
      // ? 被选中的内容
      selectItem: [],
      // ? 当前页码
      page: 0,
      // ? 该页数据总数
      pageSize: 20,
      // ? 总共页数
      totalPage: 0,
      // ? 数据总数
      total: 0,
    };
  },
  methods: {
    // ? content-functions
    async getTeachPlanInfos(params = {
      page_size: this.pageSize
    }) {
      this.tableIsLoading = true
      const result = await getTeachPlanList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.page = dataSource.page || 0;
        this.totalPage = dataSource.total_page || 0;
        this.total = dataSource.total || 0;
        if (dataSource.list) {
          this.dataList = [];
          const { list } = dataSource;
          list.map((item, index) => {
            this.dataList.push({
              id: item.id,
              number: index + 1,
              realname: item.realname,
              className: item.class_name,
              planName: `${item.class_name}  ${item.year}-${item.year + 1}学年${item.semester === 1 ? '第一学期' : '第二学期'}第${item.week}周教学计划`,
              status: item.status,
              createTime: item.create_time,
              operations: [{
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
              {
                tag: '复制计划',
                type: 'warning'
              },
              ]
            });
          });
        }
      } else {
        this.$Message.error('查询计划失败');
      }
      this.tableIsLoading = false;
    },
    getSelectItem(selection) {
      this.selectItem = selection;
    },
    handleOperations(tag, itemIndex, table) {
      switch (tag) {
        case '详情':
          this.openInfoModal(itemIndex);
          break
        case '编辑':
          this.openEditModal(itemIndex);
          break
        case '导出':
          // ? 发请求导出
          this.exportItem(itemIndex, table);
          break
        case '删除':
          this.handleDelete(itemIndex);
          break
        case '复制计划':
          this.handleCopy(itemIndex);
          break
        default:
          break
      }
    },
    handleDelete(itemIndex) {
      this.$Modal.confirm({
        title: '删除这一条信息',
        content: '您是否要删除这一条记录? 删除后数据无法恢复!',
        onOk: () => this.deleteItem(itemIndex)
      });
    },
    async deleteItem(itemIndex) {
      const { id } = this.dataList[itemIndex];
      const result = await deleteTeachPlan(id);
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getTeachPlanInfos();
      } else this.$Message.error('删除失败, 请稍后重试');
    },
    async exportItem(itemIndex) {
      const { id } = this.dataList[itemIndex];
      this.$Message.info(`导出第${itemIndex + 1}条内容`);
      const result = await exportClassPlan({ id });
      downloadFile(result, `教学计划第${itemIndex + 1}条数据`, 'application/pdf');
    },
    refreshAddTeachPlan() {
      this.$bus.$on('refreshTeachPlanPage', () => this.getTeachPlanInfos());
    },
    changeTableData(params) {
      this.getTeachPlanInfos(params);
    }
  },
  created() {
    this.getTeachPlanInfos();
  },
  mounted() {
    this.refreshAddTeachPlan();
  }
};