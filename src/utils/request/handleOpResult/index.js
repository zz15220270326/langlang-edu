export default function handleOpResult(result) {
  if (result.status === 'Success' || result.status === 200) {
    return true
  } else {
    return false
  }
}