var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
var cors = require("cors");
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
//
var testAPIRouter = require('../routes/testAPI');

var app = express();
//
//socket.io公式：
/* var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on("connection",function(socket){
    socket.on("chat",function(msg){
        //把接收到的msg原样广播
        console.log(msg);
        io.emit("chat",msg); //要是socket就是点对点
    });
});
//这里千万注意是http在监听
http.listen(3000); */

//const express = require('express')
const expressWs = require('express-ws') // 引入 WebSocket 包

const websocket = require('../routes/websockets')

//const app = express()
expressWs(app) // 将 WebSocket 服务混入 app，相当于为 app 添加 .ws 方法

app.use(express.static('../client/public'))
app.use('./routes/websockets', websocket)
app.get('*', (req, res) => {})
app.listen(3030, () => {
  console.log('server is listening on port 3030')
})

app.get('/', function (req, res, next) {
  res.send('Hello World!')
})

// 建立 WebSocket 服务
//
// 第一个参数为服务路径： /basic
// 第二个参数为与前端建立连接时会调用的回调函数
//   ws 相当于建立 WebSocket 的实例
//   req 为建立连接的请求
app.ws('/basic', function (ws, req) {
  console.log('connect success')
  console.log(ws)
 
  // 使用 ws 的 send 方法向连接另一端的客户端发送数据
  ws.send('connect to express server with WebSocket success')

  // 使用 on 方法监听事件
  //   message 事件表示从另一段（服务端）传入的数据
  ws.on('message', function (msg) {
    console.log(`receive message ${msg}`)
    ws.send('default response')
  })

  // 设置定时发送消息
  let timer = setInterval(() => {
    ws.send('interval message ${new Date()}')
  }, 2000)

  // close 事件表示客户端断开连接时执行的回调函数
  ws.on('close', function (e) {
    console.log('close connection')
    clearInterval(timer)
    timer = undefined
  })
})
const port = 8001;
app.listen(port, () => {console.log('express server listen at http://localhost:${port}')});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//
app.use('/testAPI', testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
