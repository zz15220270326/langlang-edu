/**
 * @处理错误时返回的信息
 */
export function handleErrorCode(code) {
  switch (code) {
    case 404:
      return '资源未找到'
    case 701:
      return '资源未找到'
    case 700:
      return '当前系统繁忙, 请稍后重试'
    case 702:
      return '输入有误'
    case 703:
      return '缺少参数'
    case 800:
      return '操作错误'
    case 801:
      return '当前系统繁忙，请稍后重试'
    case 802:
      return '数据有误'
    case 803:
      return '您的帐号在其他设备登录，请重新登录'
    case 804:
      return '登陆信息已过期，请重新登录'
    case 805:
      return '您没有该功能权限，请联系园长开通'
    case 890:
      return '该孩子已离开园所，无法进行相关操作'
    default:
      return '未知错误...'
  }
}