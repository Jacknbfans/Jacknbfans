const express = require('express');
const expressWs = require('express-ws');
const amqp = require('amqplib');
const router = express.Router()
expressWs(router);
const arr = []; 

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
        //console.log('Consumer:',msg.content.toString());
        arr.push(msg.content.toString());
        arr.forEach((element) =>{
          console.log(element);
        }); 
        channel.ack(msg);
      },
      { noAck:false }
    );
    console.log("success connect to RabbitMQ_Websockets_Consumer");
  } catch (error){
    console.log(error);
  }
}

router.ws('/test', (ws, req) => {
  try {
      consumer();

      ws.send('connect success');
      let interval;
      interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          //ws.send(Math.random().toFixed(2));
          ws.send(arr[Math.floor(Math.random() * arr.length)]);
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
