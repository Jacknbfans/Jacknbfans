var express = require('express');
var router = express.Router(); 
const amqp = require('amqplib');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
var rs = require('jsrsasign');

async function producer() {
  try{

    //sha256WithRSA
    const privateKeysString = '-----BEGIN PRIVATE KEY-----MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDl3qqZiBYqv9qT55lohRxVJIbYOYHiGelaN5PaRpecOjOyOl03ZcgNsLLc9HfYrWXo7TyBGg+dYz2LoauNPOrHxG7mxmBD1V7faTEjiYfwEqyZ4zpWHP+IHOwZaUE26HGVjVm7z1akmnb7bC9fViXpjqH9Hj3+/s5omTBb992nCUDu9sXzHaQcE2WquTlkOuCvf/YtxhBZCaQEvmP34GiYzR+Veihgs90KTKEqJyd0Hd72AK2xwJ2JfN3Idz2Z+3RqVlWXm1SgZPf98XNHJjq2gLMClpAMMR8sLvEljij+Rv6JZXEx2UuiSslVBYHJGsi6a5mHIGGucv9C+9y+BGOFAgMBAAECggEBALrVP04oqPO4Gh1LCYpFXqDpXlxSaXnvW5ZDQ/4OkF2fhLMg8vD63h4ad1ZVsS9AyGsIn7vDBdwDdFuQXNIgKCeURht2M3oO69ykMBdVSlLbqsQtRxYE3cCw2UlSHnpVdTR7veqDfEWvcnOqG9reN1Rc5NbJhNREIFot4HtvvA1tUqeWjgUN9Gb6hpBdJKmUfaXlBZvYysHkjsbPgDGtGljnnCHXZepGGKAJjWCh/JKzJgcVeLEMKCqvd9KvJp1Ny3pdx0dQN1A2xF+CG/TaXmOt/WhrGk6k4YQ4hW60S4VaPBum0HJapAkaR/LxjbP4DKEF2hHLiX/P/f9b/nHIcWUCgYEA9VRsfZ9xD6gEsPClEVwSTrzb8CD8kelt+PM/xdnmRjYwZ07vZO1qHXD/54yXxbx35UXJKzW6+hknWqKHmanLNd22xifbDWwz2gDUlAmHCPbz+ZfHG0wDOOo9EhcrOKXa6z1HBd6ufgnfC7WRV0w/w3nkaVj3kDXpZAhXaN8nDJ8CgYEA794bPMyXuEIZgxJxXkEVpKB1yGxsknzu/HrV4nKYMXTrGa+M04/CNfM/XgR3/q1jkBcdfvu0AgQyTR+bU+M/sRlYi0iiAwsenbm4lpk6HmAHccqyYFwzG7zvNKZKUlEjMgDWn0z7QrCAiTK8P2pNBS37+40/Yr1MkQno6ip8uVsCgYEA8t7RSMw/sbA0dLbHs5fix/BQDDmb0Re2t26ZA9XkEj4zTRLoDJK9Kshjj2ewGSGr0F51+UEICfA89Y1RkN53Pqxv9Vwfj/o+muOXj7ae6FES11Va17s4tW+vZelp8HrBb4EKftUlCcHb/kuRx0rFFU/mwCRDcZDtrQpU/o1sqyECgYEA4Y9/FYFe+spNq0/gg724WIL7v2kV//qz0YDBOJyCOZ+0pQbL6vY4rvr7D7IsFLV/9rOF7S9Masj/dD7QleYQsr0e4nt+vlXqiG9pAVU9reqnlX4Cl1KcTO0yE9R790SNUCwxpsOBU4keleW71/ZiTwia+EYu4O8Z3RnwiKNDfhkCgYAbD04vFYQCijFls+omWIFvp9CpRlNBDmxc4Ya4QanJoDTVdgr8r/GJv8Zqc/WpMIk5rb5scUyZbtc61JoVdcyLpezQdAzGvZDIFo4IvcGiglLYEztT9YM7YNUBfmPstepH+CNs8eRdufO5mxLjMHDrC6b7s1Lr3JcLJfPIUh0jkg==-----END PRIVATE KEY-----';
    const key = rs.KEYUTIL.getKey(privateKeysString);
    //create signature object ,setup sign code alg
    const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
    //init
    signature.init(key);


    const connection = await amqp.connect('amqp://localhost:5672');
    const channel =  await connection.createChannel();
    const exchangeName = 'exchange.direct';
    const routingKey = 'ctra.news';
    const msg = 'Producer';
    await channel.assertExchange(exchangeName,'direct', { durable : true });
    for(let i = 0; i < 1000; i++){
      //create ciphertext
      signature.updateString(`${msg} No${i}Messages`);
      const originSign = signature.sign();
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
