const express = require('express');
const expressWs = require('express-ws');
const amqp = require('amqplib');
const router = express.Router()
expressWs(router);
const arr = []; 
const redis = require('redis');
const hash = new Map();
const hashList = {};
const crypto = require('crypto');
var rs = require('jsrsasign');
const fs = require('fs');
const path = require('path');
let privatePath = path.resolve(__dirname,'../../api/rsa_private.key');
let publicPath = path.resolve(__dirname,'../../api/rsa_pub.key');
let pkP8Path = path.resolve(__dirname,'../../api/eckey.p8');
let pkPemPath = path.resolve(__dirname,'../../api/eckey.pem');

async function consumer() {
  try{
      //verify
      const publicKey = fs.readFileSync(publicPath).toString();
      let ver = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA"});
      ver.init(publicKey);
      ver.updateString('digest');


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
          //hash.set(Math.random().toFixed(5),msg.content.toString());
          hashList[Math.random().toFixed(5)] = msg.content.toString();
  /*         arr.forEach((element) =>{
            console.log(element);
          });  */
          setCache(msg.content.toString());
          //console.log(ver.verify(rs.KJUR.crypto.Base64.parseHEX(msg.content.toString()))); 
          console.log(ver.verify(msg.content.toString())); 
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

    //hashList[Math.random().toFixed(5)] = values;

/*     for (const key in hashList) {
      if (Object.hasOwnProperty.call(hashList, key)) {
        const value = hashList[key];
        console.log(key, value);
      }
    }  */

    //await client.hSet(['guangguang4', Math.random().toFixed(5), values],redis.print);
    //await client.set(Math.random().toFixed(5),values);
    //await client.hSet('guangguang5', 'field1', values,redis.print);
    //await client.set('guangguang8', hashList);
    //await client.hSet('msg-session', hashList,redis.print);
    await client.hSet('messages-session', hashList,redis.print);

    await client.disconnect();
}

router.ws('/test', async(ws, req) => {
  try {
      //sha256WithRSA create signature object ,setup sign code alg
/*       var pkP8 = fs.readFileSync(pkP8Path).toString();
      var hex1 = "0100000012";
      var hex2 = "5a81483d96b0bc15ad19af7f5a662e14b275729fbc05579b18513e7f550016b1";
      var sig = new rs.KJUR.crypto.Signature({"alg": "SHA256withECDSA"});
      sig.init(pkP8); 
      sig.updateHex(hex1);
      sig.updateHex(hex2);
      var sigValueHex = sig.sign(); */
      //sign
/*       const privateKey = fs.readFileSync(privatePath).toString();
      const key = rs.KEYUTIL.getKey(privateKey);
      const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
      signature.init(key);
      signature.updateString('hashDigest');
      var sig = signature.sign(); */


      consumer();     

      const client = redis.createClient({ url:'redis://localhost:6379' }); 
    
      client.on('error', err => console.log('Redis Client Error', err));
    
      await client.connect();
    
      //const result = await client.hGet('guangguang4', '0.77166',redis.print);
      //console.log('result:'+result);
      //const resultList = await client.hGetAll('msg-session');
      const resultList = await client.hGetAll('messages-session');
      console.log(resultList);
      for (const key in resultList) {
        if (Object.hasOwnProperty.call(resultList, key)) {
          const value = resultList[key];
          //console.log(key, value);

          let interval;
          interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {     
              ws.send(value);
            } else {
              clearInterval(interval)
            }
          }, 1000)
    
          ws.on('message', msg => {
            ws.send(msg)
          }) 
        }
      } 

     await client.disconnect();

  } catch (error) {
      ws.send(`not abele to connect to RabbitMQ_Websockets: ${error}`);
  }
})

module.exports = router
