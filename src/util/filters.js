import moment from 'moment'

import globalOptions from '../services/global_options'

export default {
  install(Vue) {
    Vue.filter('round', (value, accuracy, keep) => {
      if (typeof value !== 'number') return value
      var fixed = value.toFixed(accuracy)
      return keep ? fixed : +fixed
    })
    Vue.filter('distance', (meters, decimals, asFloat) => {
      if (meters === 0) {
        return ''
      }
      decimals = decimals || 2
      asFloat = asFloat || false
      const f = Math.pow(10, decimals)
      if (globalOptions.distanceMode === 'Miles') {
        let v = Math.round((meters / 1609.344) * f) / f
        if (asFloat) {
          return v
        }
        return `${v} miles`
      }
      let v = Math.round((meters / 1000) * f) / f
      if (asFloat) {
        return v
      }
      return `${v} km`
    })
    Vue.filter('hhmmss', milliseconds => {
      return moment.utc(milliseconds).format('HH:mm:ss')
    })
  }
}
