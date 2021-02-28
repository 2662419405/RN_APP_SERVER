// 加载http模块
var http = require('http')
var cheerio = require('cheerio')
var iconv = require('iconv-lite')
const express = require('express')
const app = express()
const { fromDataHomeList,fromDataInnerList } = require('./api')

var url = 'http://www.613767.com'
var innerurl = 'http://www.613767.com/type/1.html'

app.get('/homeList', function (req, response) {
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
        var $ = cheerio.load(chunk, { decodeEntities: false })
        var htmlListData = fromDataHomeList($);
        response.json(htmlListData)
      })
    })
    .on('error', function () {
      console.log('获取数据出错！')
    })
})


app.get('/innerList', function (req, response) {
  http
    .get(innerurl, function (res) {
      var datas = []
      // 获取页面数据
      res.on('data', function (data) {
        datas.push(data)
      })
      // 数据获取结束
      res.on('end', function () {
        var chunk = iconv.decode(Buffer.concat(datas), 'utf-8')
        var $ = cheerio.load(chunk, { decodeEntities: false })
        var htmlListData = fromDataInnerList($);
        response.json(htmlListData)
      })
    })
    .on('error', function () {
      console.log('获取数据出错！')
    })
})

app.listen(3005,()=>{
    console.log("服务器启动在3005端口上")
})
