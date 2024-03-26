var express = require('express');
var router = express.Router();
var cp = require('child_process');
var myChild = cp.fork('./childSub',{ silent:true});
const cluster = require('cluster');
const numCPUs = require('os').availableParallelism;
const process = require('process');

const { fork } = require('child_process');
const forked = fork('childSub',{ silent:true});

function errorMsg() {
  console.error('Something must be wrong with the connection ...');
}

//node cluster Channel closed kill
//node:events:491  Error [ERR_IPC_CHANNEL_CLOSED]: Channel closed
/* GET users listing. */
router.get('/', async(req, res, next)=> {

    try {

/*       forked.on('message', (msg) => {
        console.log('Message from child', msg);
      });
      
      forked.send({ hello: 'world' }); */

/*       const timeouts = [];

      cluster.on('fork', (worker) => {
        timeouts[worker.id] = setTimeout(errorMsg, 2000);
      });
      cluster.on('listening', (worker, address) => {
        clearTimeout(timeouts[worker.id]);
      });
      cluster.on('exit', (worker, code, signal) => {
        clearTimeout(timeouts[worker.id]);
        errorMsg();
      });  */

     /*  if (cluster.isPrimary) {
        const worker = cluster.fork();
        let timeout;
      
        worker.on('listening', (address) => {
          worker.send('shutdown');
          worker.disconnect();
          timeout = setTimeout(() => {
            worker.kill();
          }, 2000);
        });
      
        worker.on('disconnect', () => {
          clearTimeout(timeout);
        });
      
      } else if (cluster.isWorker) {
        const net = require('net');
        const server = net.createServer((socket) => {
          // 接続は決して終わりません
        });
      
        server.listen(8000);
      
        process.on('message', (msg) => {
          if (msg === 'shutdown') {
            // サーバーへの接続を正常に閉じることを開始します。
          }
        });
      }  */

/*       if (cluster.isPrimary) {
        const worker = cluster.fork();
        worker.on('exit', (code, signal) => {
          if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
          } else if (code !== 0) {
            console.log(`worker exited with error code: ${code}`);
          } else {
            console.log('worker success!');
          }
        });
      } */

/*       if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
      
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
          console.log('cluster.fork()');
        }
      
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
        });
      } else {
        // Workers can share any TCP connection
      
        console.log(`Worker ${process.pid} started`);
      } */
 
       
    /*    const sleep = time => new Promise(done => setTimeout(done, time));
        const clusterCount = 4;
        const portNumber = 10080;

        if (cluster.isMaster) {
            const spawnProcess = () => {
              // プロセスを終了させるまでの時間: 0 〜 5000 msec
              const ttl = 5000 * Math.random();
              const child = cluster.fork();
              let timeout;
          
              child.on("listening", () => {
                // 指定時間で終了(Graceful kill)させる
                console.log(`誕生！ 死まで ${ttl} msec.`);
                timeout = setTimeout(() => {
                  console.log(`死: ${child.id}`);
                  child.kill();
                }, ttl);
              });
              child.on("disconnect", () => {
                // 別の理由で死んだ場合はkillをキャンセル
                if (timeout) {
                  clearTimeout(timeout);
                }
              });
              child.on("exit", () => {
                // 子プロセスが終了したら代わりのものを1つ起動する
                spawnProcess();
              });
            };
          
            // 子プロセスを複数起動する
            for (let i = 0; i < clusterCount; i++) {
              spawnProcess();
            }
          }

 
 */
          //setTimeout(() => {
          //  myChild.kill(); // does not terminate the node process in the shell
          //}, 2000);

        
        myChild.on('error',(err) => {
            console.log('Process error');
        });

        myChild.on('message',function(msg){
            someLib.on('data', function(data){
                console.log('some data');
                process.send(data);
            });
        }); 

/* 
        myChild.send('hello',undefined,undefined,(e) => {
            if(e!=null){
                console.log('got err',e);
            }
        });



       myChild.on('exit', () => {
            console.log('Process exited');
            exited = true;
        });

         myChild.on('cancel-process', (event, arg) => {
            child.kill();
        });

        */
    } catch (e) {
        console.log('Ignore error');
    }


});

module.exports = router;
