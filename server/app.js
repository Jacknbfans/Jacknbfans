var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
var cors = require("cors");
var indexRouter = require('./routes/index');
var qpsRouter = require('./routes/qps');
//
var testAPIRouter = require('./routes/testAPI');
var app = express();

//
const expressWs = require('express-ws')
const websocket = require('./routes/websockets')
const amqp = require('amqplib');
const amqpRouter = require('./routes/rabbitMQ');
const producerRouter = require('./routes/producer');
const consumerRouter = require('./routes/consumer');
const redisRouter = require('./routes/redisCache');
const childSubRouter = require('./routes/childSub');
expressWs(app);

const rabbitExpress = require('rabbitmq-express');
const server = rabbitExpress();




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
app.use('/qps', qpsRouter);
//
app.use('/testAPI', testAPIRouter);

app.use('/websockets', websocket);

app.use('/rabbitMQ', amqpRouter);
app.use('/producer', producerRouter);
app.use('/consumer', consumerRouter);
app.use('/redisCache', redisRouter);
app.use('/childSub', childSubRouter);

app.listen(3030, () => {
  console.log('server is listening on port 3030')
}) 


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
