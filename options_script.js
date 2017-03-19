(function () {
  var data = JSON.parse(localStorage.getItem('data'))
  if (data) {
    data.classes.forEach(function (item, index) {
      var html = '<div><span>' + item.name + '</span><span>' + item.code + '</span><span>' + item.type + '</span>'
      html += '<span><a href="" class="del">删除</a></span></div>'
      $('.classes').append(html)
    })
  }
}())

$('#add').submit(function (e) {
  var data = JSON.parse(localStorage.getItem('data'))
  if (!data) {
    data = {}
    data.classes = []
  } 

  var classes = data.classes
  var name = $('#class_name').val()
  var code = $('#code').val()
  var type = $('#type').val()
  var typeCode
  switch (type) {
    case '必修选课':
      typeCode = 'bxxk'
      break
    case '选修选课':
      typeCode = 'xxxk'
      break
    case '本学期计划选课':
      typeCode = 'bxqjhxk'
      break
    case '专业内跨年级选课':
      typeCode = 'knjxk'
      break
    case '跨专业选课':
      typeCode = 'fawxk'
      break
    case '公选课选课':
      typeCode = 'ggxxkxk'
      break
    default:
      typeCode = 'bxxk'
  }
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