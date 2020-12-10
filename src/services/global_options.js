class Globaloptions {
  constructor() {
    this.startWeekDay = 1
    this.startWeekDayOptions = [
      { value: 0, text: 'Sunday' },
      { value: 1, text: 'Monday' }
    ]
    this.load()
  }

  store() {
    window.localStorage.setItem('globalOptions', JSON.stringify(this))
  }

  load() {
    const storedString = window.localStorage.getItem('globalOptions')
    if (storedString) {
      const storedObject = JSON.parse(storedString)
      Object.assign(this, storedObject)
    }
  }
}

export default new Globaloptions()
