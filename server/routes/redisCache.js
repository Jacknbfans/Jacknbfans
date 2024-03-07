/* const redis = require('redis');
const io = require('socket.io')(3000);
const client = redis.createClient();

client.on('connect',() =>{ console.log('Connected to Reids'); });
io.on('connection',(socket) =>{ 
    console.log('Client connected');
    // listen redis data change
    client.on('message',(channel,message) => { socket.emit('message',message ); });
    // subscription redis channel
    client.subscribe('mychannel');
}) */