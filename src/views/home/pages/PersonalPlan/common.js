// ? titles
export const semesterPlanTitle = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 80,
    align: 'center'
  },
  {
    title: '计划学期',
    key: 'planSemester',
    align: 'center',
    width: 300
  },
  {
    title: '班级',
    key: 'className',
    align: 'center',
    width: 180
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 100,
    render: (h, params) => renderStatus(h, params)
  },
  {
    title: '创建时间',
    key: 'createTime',
    align: 'center',
    width: 300
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];
export const yearPlanTitle = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 80,
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 300
  },
  {
    title: '班级',
    key: 'className',
    width: 100
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
    align: 'center'
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];
export const workSummaryTitle = [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 80,
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 300
  },
  {
    title: '班级',
    key: 'className',
    align: 'center',
    width: 300
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 100,
    render: (h, params) => renderStatus(h, params)
  },
  {
    title: '发送时间',
    key: 'createTime',
    align: 'center',
    width: 200
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];
export const workReportTitle = [
  {
    type: 'selection',
    width: 80,
    align: 'center'
  },
  {
    title: '序号',
    key: 'number',
    width: 100,
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    align: 'center',
    width: 300
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 120,
    render: (h, params) => renderStatus(h, params)
  },
  {
    title: '发送时间',
    key: 'createTime',
    align: 'center',
    width: 280
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center'
  }
];
// ? operations
export const operations = [
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
  }
];

export const renderStatus = (h, params) => {
  const { row } = params;
  const text = row.status === 0 ? '未点评' : '已点评';
  const color = row.status === 0 ? '#f00' : '#0e0';
  return h('span', {
    style: {
      color,
      'font-weight': 600,
      'font-size': '0.92rem'
    }
  }, text);
};