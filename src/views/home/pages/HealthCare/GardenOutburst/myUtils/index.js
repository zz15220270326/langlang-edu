import { Message } from 'view-design';

// ? data
export const titleList = [
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
    title: '幼儿姓名',
    key: 'nickname',
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
    title: '状况名称',
    key: 'outBurstName',
    align: 'center',
    width: 150
  },
  {
    title: '发生场景',
    key: 'outBurstScene',
    align: 'center',
    width: 150
  },
  {
    title: '处理情况',
    key: 'outBurstContent',
    align: 'center',
    width: 150
  },
  {
    title: '当班老师',
    key: 'realname',
    align: 'center',
    width: 120
  },
  {
    title: '记录时间',
    key: 'outBurstTime',
    align: 'center',
    width: 200
  },
  {
    title: '操作',
    slot: 'operations',
    align: 'center',
    // width: 360,
    // fixed: 'right'
  }
];

// ? fn
export function handleCheck(params) {
  // params
  if (params.classId <= 0) {
    Message.warning('请选择班级');
    return false;
  }
  if (params.infant <= 0) {
    Message.warning('请选择班级幼儿');
    return false;
  }
  if (!params.outBurstName.length) {
    Message.warning('请填写状况名称');
    return false;
  }
  if (!params.outBurstScene.length) {
    Message.warning('请填写发生场景');
    return false;
  }
  if (!params.outBurstContent.length) {
    Message.warning('请填写处理情况');
    return false;
  }
  if (params.teacher <= 0) {
    Message.warning('请选择班级教师');
    return false;
  }
  // if (!params.pictures.length) {
  //   Message.warning('请选择状况图片');
  //   return false;
  // }
  return true;
}