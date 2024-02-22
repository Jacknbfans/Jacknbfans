import React, { Component } from 'react'


class Rabbitmq extends Component {

  
    render(){
        return (
                <div className='rabbitmqMain'>
                  <iframe src='http://104.128.95.54:15672/' title='rabbitmq' width='100%' height='100%' />
                </div>
        );
      }
}

export default Rabbitmq