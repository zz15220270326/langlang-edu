export default function checkDataSource(dataSource = {}) {
  if (Object.keys(dataSource).length > 0 || dataSource === []) {
    return true
  } else {
    return false
  }
}