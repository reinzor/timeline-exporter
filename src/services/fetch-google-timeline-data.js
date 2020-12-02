
import axios from 'axios'
import toGeoJSON from '@mapbox/togeojson'

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
  
  return new Promise((resolve, reject) => {
    axios.all(requests).then(axios.spread((...responses) => {
      let data = []
      responses.forEach(response => {
        let kml = new DOMParser().parseFromString(response.data, "application/xml");
        let gj = toGeoJSON.kml(kml)
        data = data.concat(gj.features)
      })
      resolve(data)
    })).catch(errors => {
      reject(errors)
    })
  });
}

export default fetchGoogleTimelineData