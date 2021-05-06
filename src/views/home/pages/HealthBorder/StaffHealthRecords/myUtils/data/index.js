import { healthStatus } from '@/utils';

export const titleList = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '教师姓名',
    key: 'teacherName',
    align: 'center',
    width: 150
  },
  {
    title: '体温',
    key: 'temperature',
    align: 'center',
    width: 120
  },
  {
    title: '健康状况',
    key: 'healthStatus',
    align: 'center',
    render: (h, params) => healthStatus(h, params)
  },
  {
    title: '症状',
    key: 'symptom',
    align: 'center'
  },
  {
    title: '日期',
    key: 'recordDate',
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];

export const healthStatusList = [
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
];