import React, { Component } from 'react';
import axios from 'axios';

class Qps extends Component {
    constructor(props) {
      console.log('constructor');
      super(props);
    }
  
    componentDidMount() {
        document.getElementById('testBtn').addEventListener('click',this.sendClick);
    }

    async sendClick(){
        setTimeout(() => {
            console.log('start running');
        },0);

        setInterval(() => {
            axios.post('http://104.128.95.54:3030/qps','222')
            .then( res => {
                       if (res.status === 200) {
                           console.log('response:'+res.data); 
                       } else {
                           console.error(`Error ${res.status}: ${res.statusText}`);
                       }
                   })
           .catch( error => {
               console.log(error);
           })
        }, 10);

        console.log('end running');
    } 

    render(){
        return (
            <div className='QpsMain'>
                <button id="testBtn">send</button> 
            </div>
        );
    }
}

export default Qps