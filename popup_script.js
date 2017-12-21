$('.submit').on('click', function () {
  var data = JSON.parse(localStorage.getItem('data'))
  if (data.classes.length !== 0) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, data.classes)
    })
  } else {
    $('.message').text('当前课表为空，请先编辑课表')
  }
})

$('.edit').on('click', function () {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage()
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'))
  }
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    $('.message').append(request + '<br />')
  })