import axios from 'axios'
import toGeoJSON from '@mapbox/togeojson'
import moment from 'moment'

function fetchGoogleTimelineData(from, to) {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const name = `${moment(fromDate).format('YYYY-DD-MM')}_${moment(toDate).format('YYYY-DD-MM')}`

  const requests = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const uri = `https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i${year}!2i${month}!3i${day}!2m3!1i${year}!2i${month}!3i${day}`
    requests.push(axios.get(uri))
  }

  console.log(`Fetching from ${from} to ${to}`)
  console.log(`${requests.length} days of Timeline data ..`)

  return new Promise((resolve, reject) => {
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          const data = {
            name,
            items: []
          }
          responses.forEach(response => {
            const kml = new DOMParser().parseFromString(response.data, 'application/xml')
            const gj = toGeoJSON.kml(kml)
            gj.features.forEach(feature => {
              const timeBegin = moment(feature.properties.timespan.begin)
              const timeEnd = moment(feature.properties.timespan.end)
              const duration = moment.duration(timeEnd.diff(timeBegin)).asMilliseconds()
              data.items.push({
                name: feature.properties.name,
                address: feature.properties.address,
                timeBegin: feature.properties.timespan.begin,
                timeEnd: feature.properties.timespan.end,
                duration: duration,
                category: feature.properties.Category,
                distance: feature.properties.Distance,
                latitude: feature.geometry.type === 'Point' ? feature.geometry.coordinates[1] : null,
                longitude: feature.geometry.type === 'Point' ? feature.geometry.coordinates[0] : null
              })
            })
          })

          // Remove duplicated multi-day items
          data.items = data.items.filter((e, index) => {
            const _e = JSON.stringify(e)
            return (
              index ===
              data.items.findIndex(e2 => {
                return JSON.stringify(e2) === _e
              })
            )
          })

          resolve(data)
        })
      )
      .catch(errors => {
        reject(errors)
      })
  })
}

export default fetchGoogleTimelineData
