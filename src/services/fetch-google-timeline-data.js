import axios from 'axios'
import toGeoJSON from '@mapbox/togeojson'
import moment from 'moment'

function fetchGoogleTimelineData(from, to) {
  let fromDate = new Date(from);
  let toDate = new Date(to);

  let requests = []
  for (var date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    let year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    let uri = `https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i${year}!2i${month}!3i${day}!2m3!1i${year}!2i${month}!3i${day}`
    requests.push(axios.get(uri))
  }

  console.log(`Fetching from ${from} to ${to}`)
  console.log(`${requests.length} days of Timeline data ..`)
  
  return new Promise((resolve, reject) => {
    axios.all(requests).then(axios.spread((...responses) => {
      let data = []
      responses.forEach(response => {
        let kml = new DOMParser().parseFromString(response.data, "application/xml");
        let gj = toGeoJSON.kml(kml)
        gj.features.forEach((feature) => {
          let timeBegin = moment(feature.properties.timespan.begin)
          let timeEnd = moment(feature.properties.timespan.end)
          let duration = moment.duration(timeEnd.diff(timeBegin));
          data.push({
            name: feature.properties.name,
            address: feature.properties.address,
            timeBegin: timeBegin,
            timeEnd: timeEnd,
            duration: duration,
            category: feature.properties.Category,
            distance: feature.properties.Distance
          })
        })
      })
      resolve(data)
    })).catch(errors => {
      reject(errors)
    })
  });
}

export default fetchGoogleTimelineData