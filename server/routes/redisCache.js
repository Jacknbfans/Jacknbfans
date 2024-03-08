var express = require('express');
var router = express.Router(); 
const redis = require('redis');
//const io = require('socket.io');
const client = redis.createClient();

client.on('connect',() =>{ console.log('Connected to Reids'); });
/* io.on('connection',(socket) =>{ 
    console.log('Client connected');
    // listen redis data change
    client.on('message',(channel,message) => { socket.emit('message',message ); });
    // subscription redis channel
    client.subscribe('mychannel');
})  */

router.get('/', (req, res) => {
    try {
      res.send("success connect redis");
    } catch (error) {
      res.send(`not able to connect to redis: ${error}`);
    }
  });

module.exports = router; 