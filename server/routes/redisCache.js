var express = require('express');
var router = express.Router(); 

const redis = require('redis');


async function redisCaches(){

  const client = redis.createClient({
    url:'redis://localhost:6379'
  }); 

  client.on('error', err => console.log('Redis Client Error', err));

  await client.connect();

  const value = await client.keys('*');

  console.log(value);

  await client.hSet('guangguang2', '222', 'value222');

  await client.disconnect();
}


router.get('/', (req, res) => {
  try {
        redisCaches();
        res.status(200).send({ data:'success' });
  } catch (error) {
      console.log(error);
      res.status(404).send(`not able to connect to redis: ${error}`);
  }
});


module.exports = router; 