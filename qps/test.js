const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
 
if (cluster.isMaster) {
  // 主进程
  console.log(`主进程 ${process.pid} 正在运行`);
 
  // 为每个CPU核心启动一个工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程
  // 创建一个服务器并监听请求
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(3030);
 
  console.log(`工作进程 ${process.pid} 已启动`);
}
