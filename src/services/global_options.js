class Globaloptions {
  constructor() {
    this.groupMode = 'None'
    this.groupModeOptions = ['None', 'Week', 'Month']

    this.distanceMode = 'Kilometers'
    this.distanceModeOptions = ['Kilometers', 'Miles']

    this.autoFetch = true

    this.csvExportProcessedDistance = false
    this.csvExportProcessedDuration = false
    this.csvExportDatesInLocalTimezone = false

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
