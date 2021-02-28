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
    obj.nextLink = $(this).children().eq(0).find('a').attr('href')
    obj.nextLinkName = $(this).children().eq(0).find('a').text()
    $(this)
      .children('.movie-item-out')
      .slice(1)
      .each(function (index, element) {
        let rowChild = {}
        rowChild.index = index
        rowChild.link = $(this).find('.movie-name').attr('href')
        rowChild.title = $(this).find('.movie-name').attr('title')
        rowChild.imgsrc = $(this).find('img').attr('src')
        rowChild.time = $(this).find('em').text()
        rowChild.timeName = $(this).find('span').text()
        obj.content.push(rowChild)
      })
    data.push(obj)
  })
  return data
}

const fromDataInnerList = $ => {
  let data = []
  let obj = {}
  obj.content = [] //内容列表
  obj.sort = [] // 分类
  obj.paging = [] //底部分页
  obj.title = $('.container>.row').children().find('h3').text()

  obj.allMovie = $('.hwh-page-info').find('em').eq(0).text() //所有影视数量
  obj.active = $('.hwh-page-info').find('em').eq(1).text() //当前页

  let k = $('.pagination')
    .eq(1)
    .children()
    .slice(-1)
    .find('a')
    .attr('href')
    .split('/')
  obj.allPage = k[k.length - 1].slice(0, -5) //分页数量

  $('.pagination')
    .eq(0)
    .children()
    .find('a')
    .each(function () {
      let sortarr = {}
      sortarr.linkTitle = $(this).text()
      sortarr.linkUrl = $(this).attr('href')
      obj.sort.push(sortarr)
    })

  $('.pagination')
    .eq(1)
    .children()
    .slice(0)
    .each(function () {
      let pagingarr = {}

      pagingarr.linkTitle = $(this).children().text()
      pagingarr.linkUrl = $(this).children('a').attr('href')

      obj.paging.push(pagingarr)
    })

  $('.container div .row')
    .children()
    .each(function (index, element) {
      let rowChild = {}
      rowChild.index = index
      rowChild.link = $(this).find('.movie-name').attr('href')
      rowChild.title = $(this).find('.movie-name').attr('title')
      rowChild.imgsrc = $(this).find('img').attr('src')
      rowChild.time = $(this).find('.otherinfo').text()
      obj.content.push(rowChild)
    })
  data.push(obj)
  return data
}

module.exports = {
  fromDataHomeList,
  fromDataInnerList,
}
