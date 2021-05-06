export const pList = [
  // ? 家长列表
  {
    info: '选择家长',
    key: 0
  },
  {
    info: '父亲',
    key: 1
  },
  {
    info: '母亲',
    key: 2
  },
  {
    info: '继父或养父',
    key: 3
  },
  {
    info: '继母或养母',
    key: 4
  },
  {
    info: '祖父',
    key: 5
  },
  {
    info: '祖母',
    key: 6
  },
  {
    info: '外祖父',
    key: 7
  },
  {
    info: '外祖母',
    key: 8
  },
  {
    info: '姐姐',
    key: 9
  },
  {
    info: '兄弟姐妹',
    key: 10
  },
  {
    info: '其他亲属',
    key: 11
  },
  {
    info: '非亲属',
    key: 12
  },
]

export const pGender = ['男', '女']

export const genderTitle = '请选择性别'

export const genderList = [{
    info: '请选择性别',
    key: 0
  },
  {
    info: '男',
    key: 1
  },
  {
    info: '女',
    key: 2
  }
]

const defaultParent = {
  pTitle: '选择家长',
  pList,
  pName: '',
  pPhone: '',
  pCard: '',
  pGender,
  genderTitle,
  genderList
}

export {
  defaultParent
}