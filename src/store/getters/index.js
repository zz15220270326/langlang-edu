export default {
  ymdGetters: state => {
    const {
      defaultYear,
      defaultMonth,
      defaultDay
    } = state
    return `${defaultYear}-${defaultMonth}-${defaultDay}`
  }
}