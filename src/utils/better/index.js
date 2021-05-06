// * 防抖函数和节流函数

export function antiShake(method, context) {
  clearTimeout(method.timer)
  method.timer = setTimeout(function () {
    console.log('函数防抖')
    method.call(context)
  }, 500)
}

export function chokeUse(idName) {
  let canRun = true
  document.getElementById(idName).onscroll = () => {
    if (!canRun) {
      return
    }
    canRun = false
    setTimeout(() => {
      console.log('函数节流')
      canRun = true
    }, 500)
  }
}