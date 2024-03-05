const express = require('express');
const expressWs = require('express-ws');
const amqp = require('amqplib');
const router = express.Router()
expressWs(router);

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
    console.log("sucess connect to RabbitMQ_Websockets_Consumer");
  } catch (error){
    console.log(error);
  }
}

router.ws('/test', (ws, req) => {
  try {
      ws.send('connect sucess')
      let interval
      interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.send(Math.random().toFixed(2))
        } else {
          clearInterval(interval)
        }
      }, 1000)

      ws.on('message', msg => {
        ws.send(msg)
      })
  } catch (error) {
      res.send(`not abele to connect to RabbitMQ_websockets: ${error}`);
  }
})

module.exports = router
