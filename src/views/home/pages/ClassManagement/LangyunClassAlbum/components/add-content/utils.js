export function checkParams(params, myself) {
  const {
    uid,
    title,
    type,
    classId,
    classBoardIds,
    gardenBoardIds
  } = params
  // switch (params) {
  //   case uid <= 0:
  //     myself.$Message.warning('该用户id不存在')
  //     return false
  //   case !title.length:
  //     myself.$Message.warning('相册名称不得为空')
  //     return false
  //   case type === 'unknown':
  //     myself.$Message.warning('请选择相册的分类')
  //     return false
  //   case classId === 0:
  //     myself.$Message.warning('请选择所在的班级')
  //     return false
  //   case classBoardIds === 0:
  //     myself.$Message.warning('请选择班牌')
  //     return false
  //   case !gardenBoardIds.length:
  //     myself.$Message.warning('请选择园牌')
  //     return false
  //   default:
  //     return true
  // }
  if (uid <= 0) {
    myself.$Message.warning('该用户id不存在')
    return false
  }
  if (!title.length) {
    myself.$Message.warning('相册名称不得为空')
    return false
  }
  if (type === 'unknown') {
    myself.$Message.warning('请选择相册的分类')
    return false
  }
  if (classId === 0) {
    myself.$Message.warning('请选择所在的班级')
    return false
  }
  if (classBoardIds === 0) {
    myself.$Message.warning('请选择班牌')
    return false
  }
  if (gardenBoardIds.length === 0) {
    myself.$Message.warning('请选择园牌')
    return false
  }
  return true
}