const express = require('express');
const expressWs = require('express-ws');
const amqp = require('amqplib');
const router = express.Router()
expressWs(router);
const arr = []; 
const redis = require('redis');
const hash = new Map();

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
        hash.set(Math.random().toFixed(5),msg.content.toString());
/*         arr.forEach((element) =>{
          console.log(element);
        });  */
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

    //console.log(lists);

    //await client.hSet(['guangguang4', Math.random().toFixed(5), values],redis.print);
    //await client.set(Math.random().toFixed(5),values);
    //await client.hSet('guangguang5', 'field1', values,redis.print);
   //await client.set('guangguang', arr);
      

    await client.disconnect();
}

router.ws('/test', async(ws, req) => {
  try {
      consumer();     

      const client = redis.createClient({ url:'redis://localhost:6379' }); 
    
      client.on('error', err => console.log('Redis Client Error', err));
    
      await client.connect();
    
      const result = await client.hGet('guangguang4', '0.30599',redis.print);
      console.log('result:'+result);
      const result2 = await client.hGetAll('guangguang7');
      console.log(result2);

      let interval;
      interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {     
          ws.send(result);
        } else {
          clearInterval(interval)
        }
      }, 1000)

      ws.on('message', msg => {
        ws.send(msg)
      }) 


     await client.disconnect();

  } catch (error) {
      ws.send(`not abele to connect to RabbitMQ_Websockets: ${error}`);
  }
})

module.exports = router
