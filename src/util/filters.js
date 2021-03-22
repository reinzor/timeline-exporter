import globalOptions from '../services/global_options'

export default {
  install(Vue) {
    Vue.filter('round', (value, accuracy, keep) => {
      if (typeof value !== 'number') return value
      var fixed = value.toFixed(accuracy)
      return keep ? fixed : +fixed
    })
    Vue.filter('distance', (meters, decimals) => {
      if (meters === 0) {
        return ''
      }
      decimals = decimals || 2
      const f = Math.pow(10, decimals)
      if (globalOptions.distanceMode === 'Miles') {
        return `${Math.round((meters / 1609.344) * f) / f} miles`
      }
      return `${Math.round((meters / 1000) * f) / f} km`
    })
  }
}
