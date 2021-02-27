// 加载http模块
var http = require('http')
var cheerio = require('cheerio')
var iconv = require('iconv-lite')
const express = require('express')
const app = express()

var url = 'http://www.613767.com'

app.get('/', function (req, response) {
  http
    .get(url, function (res) {
      var datas = []
      // 获取页面数据
      res.on('data', function (data) {
        datas.push(data)
      })
      // 数据获取结束
      res.on('end', function () {
        var chunk = iconv.decode(Buffer.concat(datas), 'utf-8')
        var htmlListData = filterHtmlList(chunk)
        response.send(htmlListData)
      })
    })
    .on('error', function () {
      console.log('获取数据出错！')
    })
})

/* 过滤页面信息 */
function filterHtmlList(html) {
  if (html) {
    // 沿用JQuery风格，定义$
    var $ = cheerio.load(html, { decodeEntities: false })
    return $.html()
  } else {
    console.log('无数据传入！')
  }
}

app.listen(3000)
