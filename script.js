var html = "<label id='code'>Class Code: </label><input type='text' name='code' id='code' /><br /><label id='type'>Class Type: </label><select id='type'><option value='bxxk'>必修选课</option><option value='xxxk'>选修选课</option><option value='bxqjhxk'>本学期计划选课</option><option value='knjxk'>专业内跨年级选课</option><option value='ggxxkxk'>公选课选课</option></select><br />";
$("input[value='Add']").on("click", function() { 
  $(this).before(html); 
});
$("#class").submit(function(e){
  var info = [],
      data = $("#class").serializeArray();
  for(i = 0; i < data.length; i++) {
    var code = $("#class").serializeArray()[i].value,
        type = $("select:eq(" + i + ") option:selected").val();
    if(code == "" || type == "") continue;
    info.push({ "code": code, "type": type});
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, info);
  });
  e.preventDefault();
})
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    $(".message").append(request + "<br />");
  });