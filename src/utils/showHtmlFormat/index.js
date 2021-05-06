// ? 将html字符串按照html字符串的形式显示出来
export function showHtmlFormat(text) {
  let arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  let htmlText = ''
  htmlText = text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t]
  })
  return htmlText
}

// // ? 判断是否含有特殊字符标签
// export function existHtmlTags(text) {
//   let arrEntities = {
//     'lt': '<',
//     'gt': '>',
//     'nbsp': ' ',
//     'amp': '&',
//     'quot': '"'
//   }
//   Object.keys(arrEntities).map(key => {
//     if (text === key) {
//       return true
//     }
//     return false
//   })
// }