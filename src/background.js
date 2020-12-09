import fetchGoogleTimelineData from './services/fetch-google-timeline-data'

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') });
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    fetchGoogleTimelineData(request.from, request.to).then(data => {
      sendResponse(data)
    })
    .catch(error => {
      alert(`Failed to fetch timeline data: ${error}`)
    });
  });
