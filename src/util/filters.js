export default {
  install(Vue) {
    Vue.filter('kilometers', (meters, decimals) => {
      if (meters == 0.) {
        return ''
      }
      decimals = decimals || 2
      let f = Math.pow(10, decimals)
      return `${Math.round(meters / 1000. * f) / f} km`
    });
  }
}
