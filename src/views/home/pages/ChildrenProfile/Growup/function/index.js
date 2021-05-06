export function switchSex(sex = '1') {
  const sexInt = parseInt(sex)
  switch (sexInt) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return ''
  }
}