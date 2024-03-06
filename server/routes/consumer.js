var express = require('express');
var router = express.Router(); 
const amqp = require('amqplib');

async function consumer() {
  try{
    const connection = await amqp.connect('amqp://104.128.95.54:5672');
    const channel =  await connection.createChannel();
    const exchangeName = 'exchange.direct';
    const queueName = 'ctra.news';
    const bindingKey = 'ctra.news';
    await channel.assertExchange(exchangeName,'direct', { durable : true });
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName,exchangeName,bindingKey);
    await channel.prefetch(1,false);
    await channel.consume(
      queueName,
      (msg) => {
        console.log('Consumer:',msg.content.toString());
        channel.ack(msg);
      },
      { noAck:false }
    );
    console.log("success connect to RabbitMQ_consumer");
  } catch (error){
    console.log(error);
  }
}

router.get('/', async(req, res) => {
  try {
    consumer();
    res.send("success connect to consumer");
  } catch (error) {
    res.send(`not able to connect to consumer_get: ${error}`);
  }
});

module.exports = router; 
