import globalOptions from '../services/global_options'

function getFirstDayOfWeek(date) {
  let d = new Date(date)
  let first = d.getDate() - d.getDay() + globalOptions.startWeekDay
  return new Date(d.setDate(first))
}

function getLastDayOfWeek(date) {
  let d = new Date(date)
  let first = d.getDate() - d.getDay() + globalOptions.startWeekDay
  let last = first + 6;
  return new Date(d.setDate(last))
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export { getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth }