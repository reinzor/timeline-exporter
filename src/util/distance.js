function formatKilometers(meters, decimals) {
  decimals = decimals || 2
  let f = Math.pow(10, decimals)
  return `${Math.round(meters / 1000. * f) / f} km`
} 

export { formatKilometers }