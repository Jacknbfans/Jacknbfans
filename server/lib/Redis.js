async function redis(){
    //set
    this.setCache = async (key,value,time=5) => {
        await redisClient.set(key,value,{
          EX:time * 60
        });
    }

    //get
    this.getCache = async (key) => {
        return (await redisClient.get(key).then( data => data )) || null;
    }

    //del
    this.delCache = async (key) => {
        return await redisClient.del(key);
    }
  }

  const redis = new Redis();
  module.exports = redis;