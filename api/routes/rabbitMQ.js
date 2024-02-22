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

  amqp.connect('amqp://localhost')
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

    res.send('Real-Time Application');
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
