// ? 数组相关的工具

// ? 1.数组去重
// *** 一般的元素去重 (字符串, 数字...)
export function uniqueArr(arr = []) {
  return arr.filter((item, index, arr) => {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  })
}

// export function uniqueChildRoute(arr = []) {
//   for (let i = 1; i < arr.length; i ++) {
//     for (let j = arr.length - 1; j > 0; j--) {
//       if (arr[i].name === arr[j].name) {
//         arr.splice(j, 1)
//       }
//     }
//   }
// }
// *** 数组中的对象去重 (去除数组中相同的key)
export function uniObjArr(initList, key = '') {
  let obj = {};
  const list = initList.reduce((item, next) => {
    obj[next[key]] ? '' : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
  return list;
}