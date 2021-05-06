export default function getNoonKey(noonIndex) {
  switch (noonIndex) {
    case 0:
      return 'am'
    case 1:
      return 'pm'
  }
}