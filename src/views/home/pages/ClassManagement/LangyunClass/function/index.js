import { Message } from 'view-design';
// ? config
import { garden } from '@/config';
// ? utils
import { localSave } from '@/utils';

export function handleGrade(grade) {
  switch (grade) {
    case 1:
      return '小班';
    case 2:
      return '中班';
    case 3:
      return '大班';
  }
}

export function getGradeByName(grade = '') {
  switch (grade) {
    case '小班':
      return 1;
    case '中班':
      return 2;
    case '大班':
      return 3;
    default:
      return 0;
  }
}

export function handleOperations(grade) {
  if (grade < 3) {
    return [{
        tag: '升班',
        type: 'info'
      },
      {
        tag: '编辑',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ];
  } else {
    return [{
        tag: '毕业',
        type: 'info'
      },
      {
        tag: '编辑',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ];
  }
}

export function setLocalClass(list = []) {
  const classInfo = localStorage.getItem(garden.CLASS_INFO);
  if (!classInfo) {
    const classList = [];
    list.map((item, index) => {
      classList.push({
        classId: item.id,
        info: item.ClassName,
        key: index + 1
      });
    });
    localSave(garden.CLASS_INFO, classList);
  }
}

// ! myself: VueComponents (this)
export function checkSubmitInfos(myself) {
  if (!myself.className.length) {
    Message.warning('班级名称不能为空');
    return false;
  }
  if (myself.childrenCount <= 0) {
    Message.warning('请设置班级人数');
    return false;
  }
  if (myself.entryTime === '') {
    Message.warning('请设置开学日期');
    return false;
  }
  if (myself.childrenCount <= 0) {
    Message.warning('请指定开学日期');
    return false
  }
  if (!myself.currentGrade) {
    Message.warning('请选择年级');
    return false;
  }
  if (!myself.teacher.length) {
    Message.warning('请选择教师');
    return false;
  }
  if (!myself.slogan.length) {
    Message.warning('请填写口号');
    return false;
  }
  Message.info('校验通过');
  return true;
}