var express = require('express');
var router = express.Router(); 
const amqp = require('amqplib');
const rmq = require('../lib/RabbitMQ');

/* router.post('/message', (req, res) => {
  const message = req.body.message;

  // Publish the message to RabbitMQ
  channel.publish('direct_exchange', 'chat', Buffer.from(message));

  res.sendStatus(200);

});  */


/* module.exports = function (url, opt) {
  return rmq(url, opt);
};  */




router.get('/', (req, res) => {


  try {
    const message = req.body.message;
    console.log('req.body.message : ' + req.body.message);
    const tmp = 'hello get';
    //console.log('res : ' + res.sendStatus(200))
    // 创建与RabbitMQ服务器的连接
    const connection =  amqp.connect({ url: 'amqp://localhost' })
    .then((connection) => connection.createChannel())
    .then((channel) => {
      // Channel is ready for use
      //channel.assertExchange('direct_exchange', 'direct', { durable: false });
      //channel.assertQueue('chat_messages', { durable: false });
      //channel.bindQueue('chat_messages', 'direct_exchange', 'chat');
      channel.assertExchange('exchange.direct', 'direct', { durable: true });
      channel.assertQueue('ctra.news', { durable: true });
      channel.bindQueue('ctra.news', 'exchange.direct', 'ctra.news');
      
      //channel.queue_declare('ctra.news',{ durable: true });
      // Publish the message to RabbitMQ
      channel.publish('exchange.direct', 'ctra.news', Buffer.from(tmp));
    
      //res.sendStatus(200);
    })

    //const message = req.body.message;

    // Publish the message to RabbitMQ
    //channel.publish('direct_exchange', 'chat', Buffer.from(message));
  
    //res.sendStatus(200);
    
    console.log("成功连接到 RabbitMQ_get");
    res.send("成功连接到 RabbitMQ_get");
    
    // 关闭连接
    setTimeout(() => {
        connection.close();
        process.exit(0);
        console.log('get');
    }, 3600000);
} catch (error) {
    //console.error(`无法连接到 RabbitMQ: ${error}`);
    res.send(`无法连接到 RabbitMQ_get: ${error}`);
}


/*   amqp.connect('amqp://localhost')
    .then((connection) => connection.createChannel())
    .then((channel) => {
      // Channel is ready for use
      channel.assertExchange('direct_exchange', 'direct', { durable: false });
      channel.assertQueue('chat_messages', { durable: false });
      channel.bindQueue('chat_messages', 'direct_exchange', 'chat');
    })
    .catch((error) => {
      console.error('Error connecting to RabbitMQ', error);
    }); 

    res.send('Real-Time Application'); */
});


async function loginToRabbitMq() {
  try {
    //const message = req.body.message;
    const message = 'hell async';
      // 创建与RabbitMQ服务器的连接
      const connection = await amqp.connect({ url: 'amqp://localhost' })
       .then((connection) => connection.createChannel())
      .then((channel) => {
        // Channel is ready for use
        //channel.assertExchange('direct_exchange', 'direct', { durable: false });
        //channel.assertQueue('chat_messages', { durable: false });
        //channel.bindQueue('chat_messages', 'direct_exchange', 'chat');
        channel.assertExchange('exchange.direct', 'direct', { durable: true });
        channel.assertQueue('ctra.news', { durable: true });
        channel.bindQueue('ctra.news', 'exchange.direct', 'ctra.news');
        
        //channel.queue_declare(queue='gulixueyuan.news');
        // Publish the message to RabbitMQ
        channel.publish('exchange.direct', 'ctra.news', Buffer.from(message));
      }) 

      
      console.log("成功连接到 RabbitMQ_async");

      
      // 关闭连接
      setTimeout(() => {
          connection.close();
          process.exit(0);
          console.log('async');
      }, 3600000);
  } catch (error) {
      console.error('无法连接到 RabbitMQ_async: ${error}');
  }
}

loginToRabbitMq();

/* 
router.post('/message', (req, res) => {
  const message = req.body.message;

  // Publish the message to RabbitMQ
  channel.publish('direct_exchange', 'chat', Buffer.from(message));

  res.sendStatus(200);
});
 */

module.exports = router; 
