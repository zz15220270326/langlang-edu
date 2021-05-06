import {
  Message
} from 'view-design'

export function checkParams(params = {}) {
  if (!params.uid || params.uid <= 0) {
    Message.warning({
      content: '当前教师职位不得为空',
      background: true
    })
    return false
  }
  return true
}

export function clearBoth(myself) {
  myself.classTitle = myself.classList[0].info
  myself.currentClassId = 0
  myself.career = ''
  myself.iBirthday = ''
  myself.iMotto = ''
  myself.iHonor = ''
  myself.img = {}
  myself.imgs = []
}