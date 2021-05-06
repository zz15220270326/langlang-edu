// ! 把标准时间转化为时间戳
export const dateToMs = (origonDate) => {
  return origonDate > 0 ?
    new Date(origonDate).getTime() : 0;
};

// ! 把时间戳转化为'年-月-日 时:分:秒'
export const transformTimeStamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

  // const s = ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) // 秒
  // const dateString = Y + M + D + h + m + s

  const dateString = Y + M + D + h + m;

  return dateString;
};

// ! 把时间戳转化为'年-月'
export const transformToYM = (timestamp) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  const result = (Y + M);
  return result;
};

// ! 把时间戳转化为'年-月-日'
export const transformToYMD = (timestamp) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M = isAddZero(date.getMonth() + 1) + '-';
  const D = isAddZero(date.getDate());
  const result = (Y + M + D);
  return result;
};

// ! 获取某年某月的天数
export const getDays = (year, month) => {
  var d = new Date(year, month, 0);
  return d.getDate();
};

// ! 根据时间戳获取 时 分 秒
export function getHMS(timestamp = 0) {
  const hours = parseInt((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = parseInt((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    seconds = ((timestamp % (1000 * 60)) / 1000).toFixed(0);
  const result = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
  return result;
}

// ! 根据年-月-日获取星期几
export const getWeekDays = (dateString) => {
  let dateArray = dateString.split('-');
  let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  // return '周' + '日一二三四五六'.charAt(date.getDay())
  return '周' + '日一二三四五六'.charAt(date.getDay());
};

// ! 根据具体时间: 'y-m-d' 获取该日期所在的星期一的日期
export function getMondayDate(dateString = transformToYMD(dateToMs(Date()))) {
  let dateArr = dateString.split('-');
  let date = new Date(dateArr[0], parseInt(dateArr[1] - 1), dateArr[2]);
  let week = date.getDay();
  let minus = week ? week - 1 : 6;
  date.setDate(date.getDate() - minus);//获取minus天前的日期
  const y = date.getFullYear();
  const m = isAddZero(date.getMonth() + 1);//获取月份
  const d = isAddZero(date.getDate());
  return y + '-' + m + '-' + d;
}

// ! 根据下标获取星期几
export function getDayKey(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'Mon';
    case 1:
      return 'Tue';
    case 2:
      return 'Wed';
    case 3:
      return 'Thu';
    case 4:
      return 'Fri';
  }
}

export function isAddZero(random = '0') {
  if (random * 1 < 10) {
    return '0' + random;
  } else {
    return random;
  }
}

// ? 根据出生日期获取年龄

export function getAgeByBirthday(dateStr = '0000-00-00') {
  const r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r === null) return 'error';
  const d = new Date(r[1], r[3] - 1, r[4]);
  if (
    d.getFullYear() === parseInt(r[1]) &&
    (d.getMonth() + 1) === parseInt(r[3]) &&
    d.getDate() === parseInt(r[4])
  ) {
    const Y = new Date().getFullYear();
    return (Y - r[1]).toString() + '岁';
  }
  return ('formatError');
}

export function getAge(strAge) {
  const birArr = strAge.split("-");
  const birYear = birArr[0];
  const birMonth = birArr[1];
  const birDay = birArr[2];

  d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1; //记得加1
  const nowDay = d.getDate();
  let returnAge = 0;

  if (birArr == null) {
    return false;
  }
  var d = new Date(birYear, birMonth - 1, birDay);
  if (d.getFullYear() === birYear && (d.getMonth() + 1) === birMonth && d.getDate() === birDay) {
    if (nowYear === birYear) {
      returnAge = 0; // 
    } else {
      var ageDiff = nowYear - birYear; // 
      if (ageDiff > 0) {
        if (nowMonth === birMonth) {
          var dayDiff = nowDay - birDay; // 
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birMonth; // 
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;
  } else {
    return ("输入的日期格式错误！");
  }
}

// export function getAgeByBirthday(birthday = '') {
//   const [y, m, d] = birthday.split('-')
//   let age = 0
//   if (this.defaultMonth * 1 > m * 1) {
//     age = this.defaultYear * 1 - y * 1
//   } else {
//     if (this.defaultMonth * 1 === m * 1) {
//       if (this.defaultDay * 1 > d * 1) {
//         age = this.defaultYear * 1 - y * 1
//       }
//     }
//     if (this.defaultMonth * 1 < m * 1) {
//       age = this.defaultYear * 1 - y * 1 - 1
//     }
//   }
//   return `${age}岁`
// }

// ? 获取'n天前'/'n天后'的日期
export function getNearDate(dayCount) {
  const dd = new Date();
  dd.setDate(dd.getDate() + dayCount); //获取AddDayCount天后的日期
  const y = dd.getFullYear();
  const m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  return y + '-' + m + '-' + d;
}