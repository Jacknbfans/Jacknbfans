var express = require('express');
var router = express.Router(); 
const amqp = require('amqplib');

async function producer() {
  try{
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel =  await connection.createChannel();
    const exchangeName = 'exchange.direct';
    const routingKey = 'ctra.news';
    const msg = 'Producer';
    await channel.assertExchange(exchangeName,'direct', { durable : true });
    for(let i = 0; i < 1000; i++){
      console.log(i);
      await channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(`${msg} 第${i}条消息`)
      );
    }
    console.log("成功连接到 RabbitMQ_producer");
    setTimeout(() => {
         channel.close();
          process.exit(0);
          console.log('close');
      }, 3600000);
  } catch (error){
    console.log(error);
  }
}

router.get('/', (req, res) => {
  try {
    producer();
    res.send("成功连接到 producer");
  } catch (error) {
    res.send(`无法连接到 RabbitMQ_get: ${error}`);
  }
});

module.exports = router; 
