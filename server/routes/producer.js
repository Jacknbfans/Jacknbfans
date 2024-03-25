var express = require('express');
var router = express.Router(); 
const amqp = require('amqplib');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
var rs = require('jsrsasign');
const fs = require('fs');
const path = require('path');
let privatePath = path.resolve(__dirname,'../../api/rsa_private.key');
let pkP8Path = path.resolve(__dirname,'../../api/eckey.p8');

async function producer() {
  try{
    //sha256WithRSA sign create signature object ,setup sign code alg
    const privateKey = fs.readFileSync(privatePath).toString();
    const key = rs.KEYUTIL.getKey(privateKey);
    const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
    signature.init(key); 
    signature.updateString('digest');
    const originSign = signature.sign();

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel =  await connection.createChannel();
    const exchangeName = 'exchange.direct';
    const routingKey = 'ctra.news';
    const msg = 'Producer';
    await channel.assertExchange(exchangeName,'direct', { durable : true });
    for(let i = 0; i < 10; i++){
      //create ciphertext
      //signature.updateString(`${msg} No${i}Messages`);
      //const originSign = signature.sign();
      console.log(rs.hextob64(originSign));
      console.log(i);
      await channel.publish(
        exchangeName,
        routingKey,
        //Buffer.from(`${msg} No${i}Messages`)
        //Buffer.from(hash.update(i))
        //sha256WithRSA
        //hash.digest('hex')
        //create ciphertext
        //Buffer.from(signature.updateString(i))
        Buffer.from(rs.hextob64(originSign))
      );
    }
    console.log("success connect RabbitMQ_producer");
    setTimeout(() => {
         channel.close();
          process.exit(0);
          console.log('close');
      }, 360000);
  } catch (error){
    console.log(error);
  }
}

router.get('/', (req, res) => {
  try {
    producer();
    res.send("success connect producer");
  } catch (error) {
    res.send(`not able to connect to RabbitMQ_get: ${error}`);
  }
});

module.exports = router; 
