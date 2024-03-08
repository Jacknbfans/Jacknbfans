var express = require('express');
var router = express.Router(); 

const redis = require('redis');
//const redisModules = require('../lib/Redis');



//


//let redisClient;

/* const redis = require("ioredis");
function Redis() {
  const conn = {
    port: '6379',
    host: 'localhost',
    password: ''
  }
  return new redis(conn);
} */

/* async function redisConnect() {
    redisClient = redis.createClient();
    redisClient.on('error',(errror)=>console.error(`Error : ${error} `));
    await redisClient.connect();
} */

async function fetchDataFromApi() {
      let apiUrl = 'http://104.128.95.54:3030/api';
      const apiResponse = await axios.get(apiUrl);
      console.log('send API request');

      return apiResponse.data;
}

router.get('/', (req, res) => {
  try {
        var result = '555';
        const client = redis.createClient({
          url:'redis://localhost:6379'
        }); 
        
        client.on('ready',() => {
          console.log('redis is ready ...');
        });
        
        client.on('error',err => {
          console.log('err',err);
        });
        
        client.connect();

        client.set('kevins', '2323', redis.print);
        client.get('kevins', (err, value) => {
          if (err) throw err;
          // output: value
          console.log(value);        
          result = value;
          // disconnect
          client.quit();
        });

        res.status(200).send({
          data:result
      });
/*       const redisKey = 'kevin';
      let result;
      let isCached = false;
      const cacheResult = redisClient.get(redisKey);
      if(cacheResult){
        isCached = true;
        result = JSON.parse(cacheResult);
      }else{
        result = fetchDataFromApi();
        if(!result.length){
          throw new Error('request error');
        }
        redisClient.set(redisKey,JSON.stringify(result));
      } 
      
        res.status(200).send({
          formCache:isCached,
          data:result
      });
      */

      //res.send("success connect redis");
  } catch (error) {
      console.log(error);
      res.status(404).send(`not able to connect to redis: ${error}`);
      //res.send(`not able to connect to redis: ${error}`);
  }
});


module.exports = router; 