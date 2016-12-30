var xkOper = function (jx0404id,type,xkzy,trjf,obj){ 
  var rev = eval('(' + $.ajax({
  //type
  //必修选课: bxxk
  //选修选课: xxxk
  //本学期计划选课: bxqjhxk
  //专业内跨年级选课: knjxk
  //跨专业选课: fawxk
  //公选课选课: ggxxkxk
  url:"/jsxsd/xsxkkc/" + type + "Oper",
  data:{
    jx0404id:jx0404id,
    xkzy:xkzy,
    trjf:trjf
    },
    async:false
  }).responseText + ')');
  
  if(rev.success){
    chrome.runtime.sendMessage(jx0404id + ": 选课成功！");
  
    $("#xkzyView").window("close");
    $("#xkjfView").window("close");

    var jfViewStr = rev.jfViewStr;
    if(jfViewStr!=null && jfViewStr!=""){
      var myDiv=document.getElementById("jfView");
          myDiv.innerHTML=jfViewStr;
    }

    $("#zyxkButton").attr("disabled",false); 
    $("#trjfButton").attr("disabled",false); 

    parent.window.document.getElementById("xkkbLi").className = "current";
    parent.window.document.getElementById("xkjgLi").className = "";
    parent.window.document.getElementById("xkrzLi").className = "";
    //	parent.window.document.getElementById("xktkLi").className = "";
    
    //刷新课表页面
    parent.window.frames["kbFrame"].location.href="/jsxsd/xsxkjg/xsxkkb"; 
    }else{
      $("#div_"+jx0404id).show();
      $("#zyxkButton").attr("disabled",false); 
      $("#trjfButton").attr("disabled",false); 
      chrome.runtime.sendMessage(jx0404id + ": " + rev.message);
      //setTimeout(arguments.callee, 5000, jx0404id, type);
    }
  }

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    request.forEach(function(item, index){
      xkOper(item.code, item.type);
   	})
});