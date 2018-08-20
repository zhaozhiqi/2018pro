const vFilter = {
  numFilter: function(value) {
    const realVal = Number(value).toFixed(2)
    return realVal
  },
  getAns: function(value) {
    const base = /(?=((?!\b)\d{3})+$)/g
    return value.replace(base, ',')
  }
}

export default vFilter
