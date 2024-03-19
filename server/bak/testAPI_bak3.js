var express = require('express');
var router = express.Router();

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


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


function nodeSleep(time) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(true)
        }, time);
    });
}

function getUnseData() {
    return new Promise((resolve,reject)=>{
        fs.readFile('txt/test.txt', (err, data) => {
            if (err) reject(err);
            resolve(data)
        });
    });
}

function add(num1,num2,callback){
    var sum = num1 + num2;
    callback(sum);
}

function say(content){
    console.log(content);
}

function test(callback){
    content = 'hello nodejs';
    callback(content);
}

function color(){
    return new Promise((resolve,reject)=>{
        let sino = parseInt(Math.random()*6+1);
        setTimeout(()=>{
            resolve(sino);
        },3000);
    });
}

async function testColor(){
    let n = await color();
    console.log(n);
}

router.post('/',async(request,response) => {
    try{
        const { productID } =  request.body;
        //million 
        //QPS
        //Callback
        //I/O intensive
        //CPU intensive

        setTimeout(() => {
            if (cluster.isMaster) {
              console.log(`main process ${process.pid} running`);
            } 
        },0);

        setTimeout(() => {
            fs.readFile('txt/test.txt',(err,data) => {
                if(err) return console.error(err);
                console.log('NO1 :'+data);
            }) 
            console.log('end 1000');
        },1000);
        



        let sleepTime = 3000;
        await nodeSleep(sleepTime);
        let unuseData = await getUnseData();
        console.log('NO2:'+unuseData);


        setInterval(() => {
            add(1,2,function(sum){
                console.log(sum);
                test(say);
            });
        }, 5000);
        console.log('end 5000');


        testColor(); 


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






        response.status(200).json({ Kevin: '88888888' }); 

    }catch(error){
        response.status(500).json({ error: 'testAPI error' });
    }
});

module.exports = router; 



