import React, { memo } from 'react'
//const redis = require("ioredis");

/* function Redis() {
  const conn = {
    port: '6379',
    host: '127.0.0.1',
    password: ''
  }
  return new redis(conn);
} 
 */
const Rediscache = memo(() => {
    return (
        <div className='redisMain'>Rediscache</div>
    )
})

export default Rediscache;
