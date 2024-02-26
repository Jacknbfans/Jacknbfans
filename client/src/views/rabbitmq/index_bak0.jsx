import React, { useState } from 'react'


const Rabbitmq = () => {

    const [key,setKey] = useState(1);

    const url = 'http://104.128.95.54:15672';

    window.onload= function(){
      setKey(key + 1);
    }

    return (
            <div className='rabbitmqMain'>
              <iframe key={key} src={url}  title='rabbitmq' width='100%' height='100%' />
            </div>
    );

}

export default Rabbitmq
