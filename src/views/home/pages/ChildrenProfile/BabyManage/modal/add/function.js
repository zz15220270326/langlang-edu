import {
  Message
} from 'view-design'

function handleCheckParams(params = {}) {
  if (!Object.keys(params).length) {
    Message.warning('幼儿信息不能为空')
    return false
  }
  if (!params.username || !params.username.length) {
    Message.warning('请输入幼儿名字')
    return false
  }
  if (!params.sex || params.sex === 0) {
    Message.warning('请选择幼儿性别')
    return false
  }
  if (!params.nation || !params.nation.length) {
    Message.warning('请选择幼儿所在的民族')
    return false
  }
  if (!params.birthday || !params.birthday.length) {
    Message.warning('请填写幼儿的出生日期')
    return false
  }
  if (!params.gardenDate || !params.gardenDate.length) {
    Message.warning('请填写幼儿的入园日期')
    return false
  }
  if (!params.classId) {
    Message.warning('请选择幼儿所在的班级')
    return false
  }
  if (!params.parent) {
    Message.warning('请填写家长的相关信息')
    return false
  } else {
    // const parent = JSON.parse(params.parent)
    const { parent } = params // ? array
    const item = parent.some((item, index) => {
      if (
        !item.relation ||
        !item.relation.length ||
        item.relation === '选择家长') {
        Message.warning(`第${index + 1}条家长的身份信息不得为空`)
        return index + item
      } else if (!item.name || !item.name.length) {
        Message.warning(`第${index + 1}条家长的姓名不得为空`)
        return index + item
      } else if (!item.phone || !item.phone.length) {
        Message.warning(`第${index + 1}条家长的手机号码不得为空`)
        return index + item
      }
      // ? 暂时先不检查卡号
      // else if (!item.parentCard || !item.parentCard.length) {
      //   Message.warning(`第${index + 1}条家长的考勤卡号不得为空`)
      //   return index + item
      // } 
      else return null
    })
    if (item) {
      return false
    }
  }
  return true
}

function switchGender(gender) {
  switch (gender) {
    case '请选择性别':
      return 0
    case '男':
      return 1
    case '女':
      return 2
  }
}

function switchSex(sex = 0) {
  switch (sex) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return ''
  }
}

function handleStatus(code = 0) {
  switch (parseInt(code)) {
    case -1:
      return '未上传'
    case 0:
      return '待审核'
    case 1:
      return '审核通过'
    case 2:
      return '审核拒绝'
    default:
      return ''
  }
}

function handleStatusType(code = 0) {
  switch (parseInt(code)) {
    case -1:
      return 'default'
    case 0:
      return 'warning'
    case 1:
      return 'success'
    case 2:
      return 'error'
    default:
      return ''
  }
}

export {
  handleCheckParams,
  switchGender,
  switchSex,
  handleStatus,
  handleStatusType
}