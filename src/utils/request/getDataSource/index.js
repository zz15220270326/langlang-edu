export default function getDataSource(result) {
  let dataSource = {}
  if (result.status === 'Success') {
    if (result.data) {
      dataSource = result.data
    }
  }
  return dataSource
}