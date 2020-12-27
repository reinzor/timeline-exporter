export default {
  install(Vue) {
    Vue.filter('round', (value, accuracy, keep) => {
      if (typeof value !== 'number') return value
      var fixed = value.toFixed(accuracy)
      return keep ? fixed : +fixed
    })
    Vue.filter('kilometers', (meters, decimals) => {
      if (meters === 0) {
        return ''
      }
      decimals = decimals || 2
      const f = Math.pow(10, decimals)
      return `${Math.round((meters / 1000) * f) / f} km`
    })
  }
}
