var xkOper = function (jx0404id, type) {
  $.ajax({
  //type
  //必修选课: bxxk
  //选修选课: xxxk
  //本学期计划选课: bxqjhxk
  //专业内跨年级选课: knjxk
  //跨专业选课: fawxk
  //公选课选课: ggxxkxk
    url: `/jsxsd/xsxkkc/${type}Oper?jx0404id=${jx0404id}`,
    success: function (res) {
      res = JSON.parse(res)
      if (res.success) {
        chrome.runtime.sendMessage(jx0404id + ': 选课成功！')
      } else {
        chrome.runtime.sendMessage(jx0404id + ': ' + res.message)
      }
    }
  })
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    request.forEach(function (item, index) {
      xkOper(item.code, item.typeCode)
    })
  })