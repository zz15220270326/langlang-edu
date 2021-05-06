// ? async-functions / mock-data
import { childrenAskLeaveListRequest } from '@/request/garden-approve/5-children-ask-leave';
// ? utils
import { getDataSource, checkDataSource } from '@/utils';

export default {
  data() {
    return {
      // ? table-data
      titleList: [
        {
          title: '序号',
          key: 'number',
          align: 'center',
          width: 100
        },
        {
          title: '请假幼儿',
          key: 'nickName',
          align: 'center',
          width: 120
        },
        {
          title: '所在班级',
          key: 'className',
          align: 'center',
          width: 300
        },
        {
          title: '请假时间',
          slot: 'requestTime',
          align: 'center',
          width: 250
        },
        {
          title: '内容',
          key: 'content',
          align: 'center',
          width: 200
        },
        {
          title: '提交时间',
          key: 'createTime',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          slot: 'operations',
          align: 'center'
        }
      ],
      dataList: [],
      operations: [{
        tag: '审批',
        type: 'primary'
      }],
      // ? 当前页码
      page: 0,
      // ? 每页条数
      pageSize: 20,
      // ? 总共页数
      totalPage: 0,
      // ? 数据总数
      total: 0
    }
  },
  methods: {
    async getTableData(params = { page_size: this.pageSize }) {
      const result = await childrenAskLeaveListRequest(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.page = dataSource.page || 0;
        this.totalPage = dataSource.total_page || 0;
        this.total = dataSource.total || 0;
        if (dataSource.list) {
          const { list } = dataSource;
          this.setDataList(list);
        }
      }
    },
    setDataList(list) {
      this.titleList, this.dataList = [];
      list.map((item, index) => {
        this.dataList.push({
          number: index + 1,
          id: item.id,
          nickName: item.NickName,
          className: item.ClassName,
          requestTime: {
            startTime: item.start_time,
            endTime: item.end_time,
          },
          title: item.title,
          content: item.content,
          createTime: item.createTime,
          relationshipId: item.relationshipId,
          operations: this.statusIdx === 0 ? [{
            tag: '审批请假',
            type: 'primary'
          }] : [{
            tag: '审批结果',
            type: 'success'
          }]
        });
      });
    },
    changeTableData(params) {
      params.page_size = this.pageSize
      this.getTableData(params)
    }
  },
  created() {
    this.getTableData()
  }
}