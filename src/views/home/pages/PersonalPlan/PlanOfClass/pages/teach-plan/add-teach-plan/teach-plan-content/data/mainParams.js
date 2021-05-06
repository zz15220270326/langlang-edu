const innerData = {
  am: {
    type: ['0', '0', '0', '0', '0'], // ? (number | string) []
    class: ['', '', '', '', ''] // ? string []
  },
  pm: {
    type: ['0', '0', '0', '0', '0'], // ? (number | string) []
    class: ['', '', '', '', ''] // ? string []
  }
}

function copyInner(data) {
  return JSON.parse(JSON.stringify(data))
}

export default {
  Mon: copyInner(innerData),
  Tue: copyInner(innerData),
  Wed: copyInner(innerData),
  Thu: copyInner(innerData),
  Fri: copyInner(innerData)
}