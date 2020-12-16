import globalOptions from '../services/global_options'

function getFirstDayOfWeek(date) {
  let d = new Date(date)
  let day = d.getDay()
  let first = d.getDate() - day
  if (globalOptions.startWeekDay === 1) {
    first += day === 0 ? -6 : 1
  }
  return new Date(d.setDate(first))
}

function getLastDayOfWeek(date) {
  let d = new Date(date)
  let day = d.getDay()
  let first = d.getDate() - day
  if (globalOptions.startWeekDay === 1) {
    first += day === 0 ? -6 : 1
  }
  let last = first + 6;
  return new Date(d.setDate(last))
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  let day = firstDayOfYear.getDay()
  if (globalOptions.startWeekDay === 1) {
    day += day === 0 ? -6 : 1
  }
  return Math.ceil((pastDaysOfYear + day) / 7);
}

export { getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth, getWeekNumber }