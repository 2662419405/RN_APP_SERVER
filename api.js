var cheerio = require('cheerio')
/**
 * 获取首页数据
 * 板块Title，内容：添加事件，名字，图标
 * @param {*} $  HTML
 */
const fromDataHomeList = $ => {
  let data = []
  $('.container .row').each(function (index, element) {
    let obj = {}
    obj.title = $(this).children().eq(0).children('h3').text()
    data.push(obj)
  })
  return data
}

module.exports = {
  fromDataHomeList,
}
