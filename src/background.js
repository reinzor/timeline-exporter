import fetchGoogleTimelineData from './services/fetch-google-timeline-data'

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({ url: chrome.extension.getURL('index.html') })
})

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  fetchGoogleTimelineData(request.from, request.to)
    .then(data => {
      console.log('Received data', data)
      sendResponse({
        error: null,
        data
      })
    })
    .catch(error => {
      sendResponse({
        error
      })
    })
  // return true to indicate we wish to send a response asynchronously
  return true
})
