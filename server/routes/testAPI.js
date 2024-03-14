var express = require('express');
var router = express.Router();

const net = require('net');
const fs = require('fs');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;



/* const fs = require('fs');
const asyncHooks = require('async_hooks');

let indent = 0;
const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const eid = asyncHooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      1,
      ${indentStr}${type}(${asyncId}):
      trigger: ${triggerAsyncId} execution: ${eid}, resouce.keys: ${Object.keys(resource)}\n);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(1, ${indentStr}before:  ${asyncId}\n);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(1, ${indentStr}after:  ${asyncId}\n);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(1, ${indentStr}destroy:  ${asyncId}\n);
  },
});

asyncHook.enable();

Promise.resolve('ok').then(() => {
  setTimeout(() => {
    console.log('>>>', asyncHooks.executionAsyncId());
  }, 10);
}); */

/* router.get('/', async(req, res)=> {

    try{
        const delay = util.promisify(setTimeout);
        const tasks = [];
    
        for (let i = 0; i < 1000000; i++) {
            tasks.push(delay(10000));
        }
    
        await Promise.all(tasks); 

        const fns = [
            fetchSomething1,
            fetchSomething2,
            fetchSomething3,
          ];
          
          const limit = pLimit(10);
          Promise.all(
            fns
              .map(fn =>
                limit(async () => {
                  await fn() // fetch1/2/3
                })
              ) // map
          ); // Promise.all 
    
        res.send('Kevin:88-23');

    }catch (error) {
        res.send(`not abele to connect to RabbitMQ_Websockets: ${error}`);
    }

});*/

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

router.post('/',async(request,response) => {
    try{
        const { productID } =  request.body;

        //QPS
        let a = 1;
        setTimeout(() => {
            console.log(a);
        },0);
        a = 2;
        setTimeout(() => {
            console.log(a);
        }, 0);
        a = 3;

        let sleepTime = 3000;
        await nodeSleep(sleepTime);
        let unuseData = await getUnseData();

        response.end(`Node Stop The World ${sleepTime}s,unseDate:${unuseData}`);  
/* 
        fs.readFile('txt/test.txt',(err,data) => {
            console.log(data);
            response.writeHead(200);
            response.end(`txt is ${data}`);
        }) */

/*         if (cluster.isMaster) {
            console.log(`主进程 ${process.pid} 正在运行`);
          
            // 衍生工作进程。
            for (let i = 0; i < 1; i++) {
              cluster.fork();
            }
          
            cluster.on('exit', (worker, code, signal) => {
              console.log(`工作进程 ${worker.process.pid} 已退出`);
            });
          } else {
            // 工作进程可以共享任何 TCP 连接。
            // 在本例子中，共享的是一个 HTTP 服务器。
            response.writeHead(200);
            response.end('你好世界\n');

            console.log(`工作进程 ${process.pid} 已启动`);
          } */
          




        //response.status(200).json({ Kevin: '88-23' }); 

    }catch(error){
        response.status(500).json({ error: 'testAPI error' });
    }
});

module.exports = router; 



