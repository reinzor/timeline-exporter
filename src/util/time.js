function formatDuration(date) {
  let hours = `${Math.floor(date.asHours())}`.padStart(2, '0')
  let minutes = `${date.minutes()}`.padStart(2, '0')
  let seconds = `${date.seconds()}`.padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export { formatDuration }
