// ? request
import { getInfantHealthList } from '@/request/health-border';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,
  // handleOpResult,
  // ? render
  healthStatus,
  handleChildType
} from '@/utils';
// ? configs

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
          title: '班级',
          key: 'className',
          width: 200,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'childName',
          width: 100,
          align: 'center'
        },
        {
          title: '晨、午检',
          key: 'type',
          width: 100,
          align: 'center'
        },
        {
          title: '体温',
          key: 'temperature',
          width: 80,
          align: 'center'
        },
        {
          title: '健康状况',
          key: 'healthStatus',
          width: 130,
          align: 'center',
          render: (h, params) => healthStatus(h, params)
        },
        {
          title: '症状',
          key: 'symptom',
          width: 200,
          align: 'center'
        },
        {
          title: '处理方式',
          key: 'processMode',
          width: 120,
          align: 'center',
          render: (h, params) => handleChildType(h, params)
        },
        {
          title: '登记人',
          key: 'teacherName',
          width: 150,
          align: 'center'
        },
        {
          title: '日期',
          key: 'recordDate',
          width: 150,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operations',
          width: 250,
          align: 'center'
        }
      ],
      dataList: [],
      tableIsLoading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      totalPage: 0,
    }
  },
  methods: {
    async getTableData(params = {
      page_size: this.pageSize
    }) {
      this.tableIsLoading = true
      const result = await getInfantHealthList(params)
      const dataSource = getDataSource(result)
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource))
        this.page = info.page || 0
        this.total = info.total || 0
        this.totalPage = info.total_page || 0
        if (info.list) {
          const {
            list
          } = info
          this.dataList = []
          list.map(item => {
            this.dataList.push({
              id: item.id,
              gardenId: item.garden_id,
              infantId: item.infant_id,
              createTime: item.create_time,
              updateTime: item.update_time,
              remark: item.remark,
              className: item.ClassName,
              classId: item.class_id,
              childName: item.NickName,
              type: item.type,
              temperature: item.temperature,
              healthStatus: item.health_condition,
              symptom: item.symptom,
              processMode: item.process_mode,
              teacherName: item.realname,
              recordDate: item.record_date,
              operations: [{
                tag: '详情',
                type: 'info'
              },
              {
                tag: '删除',
                type: 'error'
              }
              ]
            })
          })
        }
      } else
        this.$Message.error(
          `操作失败, 原因: ${result.msg || handleErrorCode(result.code)}`
        );
      this.tableIsLoading = false
    }
  },
  created() {
    this.getTableData()
  }
}