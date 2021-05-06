export default function initPostData(postData = {}, id = 0, timeCases = []) {
  timeCases.map((item, index) => {
    if (item.id === id) {
      const {
        timeTables
      } = timeCases[index]
      // ? 获取上午的列表和下午的列表
      let list1 = timeTables.filter(a => a.start_time.split(':')[0] * 1 < 13),
        list2 = timeTables.filter(a => a.start_time.split(':')[0] * 1 >= 13)
      for (let i = 0; i < list1.length; i++) {
        postData.Mon.am.push('')
        postData.Tue.am.push('')
        postData.Wed.am.push('')
        postData.Thu.am.push('')
        postData.Fri.am.push('')
      }
      for (let i = 0; i < list2.length; i++) {
        postData.Mon.pm.push('')
        postData.Tue.pm.push('')
        postData.Wed.pm.push('')
        postData.Thu.pm.push('')
        postData.Fri.pm.push('')
      }
    }
  })
}