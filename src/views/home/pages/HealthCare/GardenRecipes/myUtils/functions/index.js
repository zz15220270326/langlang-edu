export function initDataList() {
  const dataList = [
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '早餐'
    },
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '早点'
    },
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '午餐'
    },
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '午点'
    },
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '晚餐'
    },
    {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      type: '晚餐建议'
    },
  ];
  return dataList;
}

export function formatContent(content) {
  const sourceObject = {};
  const sourceList = [];
  const dataList = initDataList();

  Object.keys(content).map((itm, idx) => {
    sourceObject[`day${idx + 1}`] = content[itm]
  });
  Object.keys(sourceObject).map((itm1, idx1) => {
    sourceList[idx1] = [];
    Object.keys(sourceObject[itm1]).map(itm2 => {
      sourceList[idx1].push(sourceObject[itm1][itm2].food.toString())
    });
  });
  dataList.map((itm1, idx1) => {
    sourceList.map((itm2, idx2) => {
      itm1[`day${idx2 + 1}`] = itm2
        .filter((itm3, idx3) => idx3 === idx1)
        .toString()
    });
  });
  return dataList;
}

export function getMenuNameByKey(key) {
  switch (key) {
    case 'meal0':
      return '早餐';
    case 'meal1':
      return '早点';
    case 'meal2':
      return '午餐';
    case 'meal3':
      return '午点';
    case 'meal4':
      return '晚餐';
    case 'meal5':
      return '晚餐建议';
  }
}

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