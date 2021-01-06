function getFirstDayOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const first = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(first))
}

function getLastDayOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const first = d.getDate() - day + (day === 0 ? -6 : 1)
  const last = first + 6
  return new Date(d.setDate(last))
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function getWeekNumber(date) {
  var tdt = new Date(date.valueOf())
  var dayn = (date.getDay() + 6) % 7
  tdt.setDate(tdt.getDate() - dayn + 3)
  var firstThursday = tdt.valueOf()
  tdt.setMonth(0, 1)
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7))
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000)
}

export { getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth, getWeekNumber }
