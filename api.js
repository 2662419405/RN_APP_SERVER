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
    obj.content = []
    obj.title = $(this).children().find('h3').text()
    obj.nextLink  = $(this).children().eq(0).find("a").attr("href")
    obj.nextLinkName = $(this).children().eq(0).find("a").text()
    $(this).children(".movie-item-out").slice(1).each(function(index, element){
      let rowChild = {}
      rowChild.index = index
      rowChild.link = $(this).find(".movie-name").attr("href")
      rowChild.title = $(this).find(".movie-name").attr("title")
      rowChild.time = $(this).find("em").text()
      rowChild.time = $(this).find("span").text()
      obj.content.push(rowChild)
    })
    data.push(obj)
  })
  return data
}

module.exports = {
  fromDataHomeList,
}
