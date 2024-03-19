const express = require('express');
const expressWs = require('express-ws');
const amqp = require('amqplib');
const router = express.Router()
expressWs(router);
const arr = []; 
const redis = require('redis');

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
        arr.push(msg.content.toString());
        arr.forEach((element) =>{
          console.log(element);
        }); 
        setCache(msg.content.toString());
        channel.ack(msg);
      },
      { noAck:false }
    );
    console.log("success connect to RabbitMQ_Websockets_Consumer");
  } catch (error){
    console.log(error);
  }
}

async function setCache(values){

    const client = redis.createClient({ url:'redis://localhost:6379' }); 

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    const lists = await client.keys('*');

    console.log(lists);

    //await client.hSet('guangguang3', '333', values);
    await client.set(Math.random().toFixed(5),values);

    await client.disconnect();
}

async function getCache(){
  const client = redis.createClient({ url:'redis://localhost:6379' }); 

  client.on('error', err => console.log('Redis Client Error', err));

  await client.connect();

  await client.get(Math.random().toFixed(5),values);

  await client.disconnect();
}

router.ws('/test', (ws, req) => {
  try {
      consumer();

      ws.send('connect success');
      let interval;
      interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.send(arr[Math.floor(Math.random() * arr.length)]);
        } else {
          clearInterval(interval)
        }
      }, 1000)

      ws.on('message', msg => {
        ws.send(msg)
      })
  } catch (error) {
      res.send(`not abele to connect to RabbitMQ_Websockets: ${error}`);
  }
})

module.exports = router
