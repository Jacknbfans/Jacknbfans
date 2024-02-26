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


async function loginToRabbitMq() {
  try {
      // 创建与RabbitMQ服务器的连接
      const connection = await amqp.connect({ url: 'amqp://localhost' });
      
      console.log("成功连接到 RabbitMQ");
      
      // 关闭连接
      setTimeout(() => {
          //connection.close();
          //process.exit(0);
          console.log('hehe');
      }, 500);
  } catch (error) {
      console.error(`无法连接到 RabbitMQ: ${error}`);
  }
}

loginToRabbitMq();

router.get('/', (req, res) => {


  try {
    // 创建与RabbitMQ服务器的连接
    const connection =  amqp.connect({ url: 'amqp://localhost' })
    .then((connection) => connection.createChannel())
    .then((channel) => {
      // Channel is ready for use
      channel.assertExchange('direct_exchange', 'direct', { durable: false });
      channel.assertQueue('chat_messages', { durable: false });
      channel.bindQueue('chat_messages', 'direct_exchange', 'chat');
    })

    //const message = req.body.message;

    // Publish the message to RabbitMQ
    //channel.publish('direct_exchange', 'chat', Buffer.from(message));
  
    //res.sendStatus(200);
    
    res.send("成功连接到 RabbitMQ");
    
    // 关闭连接
    setTimeout(() => {
        //connection.close();
        //process.exit(0);
        console.log('haha');
    }, 500);
} catch (error) {
    //console.error(`无法连接到 RabbitMQ: ${error}`);
    res.send(`无法连接到 RabbitMQ: ${error}`);
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


/* 
router.post('/message', (req, res) => {
  const message = req.body.message;

  // Publish the message to RabbitMQ
  channel.publish('direct_exchange', 'chat', Buffer.from(message));

  res.sendStatus(200);
});
 */

module.exports = router; 
