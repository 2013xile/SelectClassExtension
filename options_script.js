(function () {
  var data = JSON.parse(localStorage.getItem('data'))
  if (data) {
    data.classes.forEach(function (item, index) {
      var html = '<div><span>' + item.name + '</span><span>' + item.code + '</span><span>' + item.type + '</span>'
      html += '<span><a href="" class="del">删除</a></span></div>'
      $('.classes').append(html)
    })
  }

  showClasses()
}())

$('#type').on('change', showClasses)

$('#add').submit(function (e) {
  var data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    data = {}
    data.classes = []
  } 

  var classes = data.classes
  var name = $('#class option:selected').text()
  var code = $('#class').val()
  var type = $('#type option:selected').text()
  var typeCode = $('#type').val()
  var new_class = {
    name: name,
    code: code,
    type: type,
    typeCode: typeCode
  }
  classes.push(new_class)
  localStorage.setItem('data', JSON.stringify(data))
})

$('#add2').submit(function (e) {
  var data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    data = {}
    data.classes = []
  } 

  var classes = data.classes
  var name = $('#class_name').val()
  var code = $('#code').val()
  var type = $('#type2 option:selected').text()
  var typeCode = $('#type2').val()
  var new_class = {
    name: name,
    code: code,
    type: type,
    typeCode: typeCode
  }
  classes.push(new_class)
  localStorage.setItem('data', JSON.stringify(data))
})

$('.del').on('click', function () {
  var code = $(this).parent().prev().prev().text()
  var data = JSON.parse(localStorage.getItem('data'))
  var classes = data.classes
  classes.forEach(function (item, index, arr) {
    if (item.code === code) {
      console.log(true)
      arr.splice(index, 1)
    }
  })
  localStorage.setItem('data', JSON.stringify(data))
})

function showClasses () {
  $('#class').text('')
  var type = $('#type').val()
  $.getJSON(`/data/${type}.json`).done(function (data) {
    if (data) {
      data.aaData.forEach(function (item, index) {
        var teacher = item.skls
        var name = item.fzmc ? item.kcmc + '[' + item.fzmc + ']' : item.kcmc
        var code = item.jx0404id
        var time = item.sksj
        var html = `<option value="${code}">${name} ${teacher} ${time}</option>`
        $('#class').append(html)
      })
    }
    $('#class').select2()
  })
}
