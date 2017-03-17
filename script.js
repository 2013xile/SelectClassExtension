$('.submit').on('click', function () {
  $.getJSON('class.json', function (data) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, data.classes)
    })
  })
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    $('.message').append(request + '<br />')
  })