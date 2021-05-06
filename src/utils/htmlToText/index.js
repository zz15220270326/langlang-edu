// ? 将html转化成纯文字 (express)
export default function (randomText) {
  let arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  let htmlText = randomText.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t];
  })
  // if (ref) {
  //   // console.log(ref.$parent.content)
  // }
  let input = htmlText
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').
  replace(/<[^>]+?>/g, '').
  replace(/\s+/g, ' ').
  replace(/ /g, ' ').
  replace(/>/g, ' ')
  return {
    input,
    htmlText
  }
}