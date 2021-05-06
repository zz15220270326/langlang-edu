export default function setNullValue(items = [], rowIndex = 0) {
  for (let i = 0; i < rowIndex; i++) {
    if (!items[i]) {
      items[i] = ''
    }
  }
}