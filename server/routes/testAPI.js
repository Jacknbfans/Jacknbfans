var express = require('express');
var router = express.Router();

const crypto = require('crypto');
var rs = require('jsrsasign');
const NodeRSA = require('node-rsa');
const keyRSA = new NodeRSA({ b: 512 });
const publicKey = keyRSA.exportKey('public');
const privateKey = keyRSA.exportKey('private');

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

        //1.Method
        //node-rsa
        console.log('Public Key:'+publicKey);
        console.log('Private Key:'+privateKey);
        const publicKeys = '-----BEGIN PUBLIC KEY-----666-----END PUBLIC KEY-----';
        const privateKeys = '-----BEGIN PRIVATE KEY-----222-----END PRIVATE KEY-----';
        //use public key encryption
/*         const encrypt = new NodeRSA(publicKeys);
        const encryptedData = encrypt.encrypt('hello kevin','base64');
        console.log('Encrypted Data:',encryptedData);
        //use private key Decrypt
        const decrypt = new NodeRSA(privateKeys);
        const decryptedData = decrypt.decrypt(encryptedData,'utf8');
        console.log('Decrypted Data:',decryptedData); */

        //2.Method
        //sha256WithRSA
        const privateKeysString = '-----BEGIN PRIVATE KEY-----MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDl3qqZiBYqv9qT55lohRxVJIbYOYHiGelaN5PaRpecOjOyOl03ZcgNsLLc9HfYrWXo7TyBGg+dYz2LoauNPOrHxG7mxmBD1V7faTEjiYfwEqyZ4zpWHP+IHOwZaUE26HGVjVm7z1akmnb7bC9fViXpjqH9Hj3+/s5omTBb992nCUDu9sXzHaQcE2WquTlkOuCvf/YtxhBZCaQEvmP34GiYzR+Veihgs90KTKEqJyd0Hd72AK2xwJ2JfN3Idz2Z+3RqVlWXm1SgZPf98XNHJjq2gLMClpAMMR8sLvEljij+Rv6JZXEx2UuiSslVBYHJGsi6a5mHIGGucv9C+9y+BGOFAgMBAAECggEBALrVP04oqPO4Gh1LCYpFXqDpXlxSaXnvW5ZDQ/4OkF2fhLMg8vD63h4ad1ZVsS9AyGsIn7vDBdwDdFuQXNIgKCeURht2M3oO69ykMBdVSlLbqsQtRxYE3cCw2UlSHnpVdTR7veqDfEWvcnOqG9reN1Rc5NbJhNREIFot4HtvvA1tUqeWjgUN9Gb6hpBdJKmUfaXlBZvYysHkjsbPgDGtGljnnCHXZepGGKAJjWCh/JKzJgcVeLEMKCqvd9KvJp1Ny3pdx0dQN1A2xF+CG/TaXmOt/WhrGk6k4YQ4hW60S4VaPBum0HJapAkaR/LxjbP4DKEF2hHLiX/P/f9b/nHIcWUCgYEA9VRsfZ9xD6gEsPClEVwSTrzb8CD8kelt+PM/xdnmRjYwZ07vZO1qHXD/54yXxbx35UXJKzW6+hknWqKHmanLNd22xifbDWwz2gDUlAmHCPbz+ZfHG0wDOOo9EhcrOKXa6z1HBd6ufgnfC7WRV0w/w3nkaVj3kDXpZAhXaN8nDJ8CgYEA794bPMyXuEIZgxJxXkEVpKB1yGxsknzu/HrV4nKYMXTrGa+M04/CNfM/XgR3/q1jkBcdfvu0AgQyTR+bU+M/sRlYi0iiAwsenbm4lpk6HmAHccqyYFwzG7zvNKZKUlEjMgDWn0z7QrCAiTK8P2pNBS37+40/Yr1MkQno6ip8uVsCgYEA8t7RSMw/sbA0dLbHs5fix/BQDDmb0Re2t26ZA9XkEj4zTRLoDJK9Kshjj2ewGSGr0F51+UEICfA89Y1RkN53Pqxv9Vwfj/o+muOXj7ae6FES11Va17s4tW+vZelp8HrBb4EKftUlCcHb/kuRx0rFFU/mwCRDcZDtrQpU/o1sqyECgYEA4Y9/FYFe+spNq0/gg724WIL7v2kV//qz0YDBOJyCOZ+0pQbL6vY4rvr7D7IsFLV/9rOF7S9Masj/dD7QleYQsr0e4nt+vlXqiG9pAVU9reqnlX4Cl1KcTO0yE9R790SNUCwxpsOBU4keleW71/ZiTwia+EYu4O8Z3RnwiKNDfhkCgYAbD04vFYQCijFls+omWIFvp9CpRlNBDmxc4Ya4QanJoDTVdgr8r/GJv8Zqc/WpMIk5rb5scUyZbtc61JoVdcyLpezQdAzGvZDIFo4IvcGiglLYEztT9YM7YNUBfmPstepH+CNs8eRdufO5mxLjMHDrC6b7s1Lr3JcLJfPIUh0jkg==-----END PRIVATE KEY-----';
        const key = rs.KEYUTIL.getKey(privateKeysString);
        //create signature object ,setup sign code alg
        const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
        //init
        signature.init(key);
        signature.updateString('create Hash digest');
        //create ciphertext
        const originSign = signature.sign();
        console.log(rs.hextob64(originSign));

        //3.Method
        // read private.key
        const privateKey = fs.readFileSync('../../api/private.key', 'utf8');       
        // create decrypte private.key
        const decryptKey = crypto.createPrivateKey(privateKey);     
        // example data
        const data = "hello kevin 323";
        // SHA256 hash
        const hash = crypto.createHash('sha256');
        hash.update(data);
        const digest = hash.digest('hex');
        console.log('SHA256 result:', digest);
        // RSA decrypt
        const encryptedData = Buffer.from(digest, 'base64'); 
        const decryptedData = decryptKey.decrypt({
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
            input: encryptedData
        });
        console.log('decryptedData:', decryptedData.toString());

        //QPS : one hundred thousand
        //I/O intensive & CPU intensive
        //Start multiple processes : child_process
        //polling


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




