var express = require('express');
var router = express.Router();

var http = require('http');
var cheerio = require('cheerio');
var URL = require('url');
var path = require('path');
var fs = require('fs');
var async = require('async');

var baseUrl = "http://cnodejs.org/";
var targetUrl = "http://cnodejs.org/";
var stime = new Date();

var arr = [];

router.get('/', function(req, res, next) {
     
  var async = require('async');

  //模拟一组连接地址
  var urls = [];
  for(var i = 0; i < 30; i++) {
      urls.push(arr + i);
  }
  console.log(urls);
  
  // 并发连接数的计数器
  var concurrencyCount = 0;
  
  // 并发抓取数据的过程
  var fetchUrl = function (url, callback) {
      // delay 的值在 2000 以内，是个随机的整数
      var delay = parseInt((Math.random() * 10000000) % 2000, 10);
      concurrencyCount++;
      console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
      setTimeout(function () {
          concurrencyCount--;
          //抓取成功，调用回调函数
          callback(null, url + ' html content');
      }, delay);
  };
  
  //使用 async.mapLimit 来 5 个并发抓取，并获取结果
  async.mapLimit(urls, 5, function (url, callback) {
      fetchUrl(url, callback);
  }, function (err, result) {
      //所有连接抓取成功，返回回调结果列表
      console.log('final:');
      console.log(result);
  });

});

function sGet(url,callback){
  var chunks = [];
  http.get(url,(res)=>{
    if (res.statusCode != '200') {
      callback({message:"抓取失败,状态码:"+res.statusCode,url:url});
      return;
    }
    res.on('data',(chunk)=>{
      chunks.push(chunk);
    });
    res.on('end',()=>{
      callback(null,Buffer.concat(chunks).toString());
    });
  }).on('error',(e)=>{
    callback({message:"抓取失败",url:url,err:e});
  });
}

sGet(targetUrl,(err,data)=>{
  if (err) {
    console.log(err);
    return false;
  }
  var $ = cheerio.load(data);
  var anchors = $("#topic_list a.topic_title");
  console.log('共'+anchors.length+'个任务');

  const most=5;//并发数
    //创建队列并指定并发数
  var q=async.queue(function(url,callback){
    var filename = path.basename(url)+'.txt';
    sGet(url, (err, data)=> {/*  */
      if (err) {
        callback(err);
        return false;
      }
      fs.writeFile('./html/' + filename, data, function (err) {
        if (err) {
          throw err;
        }
        callback(null,filename);
      });
    });
  },most);

  q.drain = function() {
    console.log('任务全部完成,共耗时:'+(new Date()-stime)+'ms');
  }

  anchors.each(function(){
    var url = URL.resolve(baseUrl,$(this).attr('href'));
    q.push(url,function(err,filename){
      if (err) {
        console.log(err);
        return;
      }
      console.log("finished:"+filename);
    });
  });
});


module.exports = router;
