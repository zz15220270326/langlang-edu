import store from '@/store'

import { Message } from 'view-design';

function getDayText(item) {
  switch (parseInt(item)) {
    case 0:
      return '〇'; // √
    case 1:
      return '√';
    case 2:
      return '－';
    case 3:
      return 'X';
    case 4:
      return '休';
    case 5:
      return '';
    default:
      return '';
  }
}

function getDayColor(item) {
  switch (item) {
    case '〇':
      return 'skyblue';
    case '√':
      return '#0d0';
    case 'X':
      return 'red';
    case '－':
      return 'orange';
    case '':
      return '#0094ff';
    case '周六':
      return '#999';
    case '周日':
      return '#999';
    default:
      return '#333';
  }
}

function handleRenderDay(h, params, day, crtEl) {
  const {
    row,
    column,
    index
  } = params;
  const renderDay = parseInt(column.title);
  const today = parseInt(store.getters.ymdGetters.split('-')[2]);
  const ableClick = renderDay >= today && index > 0;
  // const text = getDayText(row[`day${day * 1 + 1}`])
  const text = row[`day${day * 1 + 1}`];
  const color = getDayColor(text);

  // if (index === 1) {
  //   console.log(row.day12);
  // }

  return h(
    'Tooltip', {
    props: {
      content: ableClick ?
        '点击进行操作(出勤, 缺勤, 请假, 事假)' : '此处无法操作'
    },
    style: {
      color,
      cursor: ableClick ? 'pointer' : '',
      'font-size': '0.8rem'
    },
    nativeOn: {
      click: () => {
        if (ableClick) {
          Message.info({
            content: `编辑${renderDay}号幼儿出勤情况`,
            background: true
          });
          // row.id schoolTime
          crtEl.modalTitle = `编辑${crtEl.year}年${crtEl.month}月${renderDay}日幼儿出勤情况`;
          crtEl.edits = {
            id: row.id,
            schoolTime: `${crtEl.year}-${crtEl.month}-${renderDay < 10 ? '0' + renderDay : renderDay}`
          };
          crtEl.isShowEditModal = true;
        }
      }
    }
  },
    text.length ? text : '?'
    // text.length ? text : 'todo'
    // text.length ? text : ''
  )
}

function switchGrade(classGrade = '') {
  switch (classGrade) {
    case 'grade1':
      return '小班';
    case 'grade2':
      return '中班';
    case 'grade3':
      return '大班';
    default:
      return '';
  }
}

export {
  getDayText,
  getDayColor,
  handleRenderDay,
  switchGrade
}