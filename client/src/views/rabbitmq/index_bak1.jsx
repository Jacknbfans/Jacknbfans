import React, { useState } from 'react'


const Rabbitmq = () => {

    const [iframeSrc, setIframeSrc] = useState('http://104.128.95.54:15672/#/connections');

    const handleInputChange = () => {
      setIframeSrc('http://104.128.95.54:15672/#/connections');
    };

    return (
      <div className='rabbitmqMain'>
        <iframe src={iframeSrc}  title='rabbitmq' width='100%' height='100%' onLoad={handleInputChange} />
      </div>
    );

}

export default Rabbitmq
