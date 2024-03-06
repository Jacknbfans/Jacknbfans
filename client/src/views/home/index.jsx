import React, { Component } from 'react';
import axios from 'axios';
import '../../css/ws.css'

const ws = new WebSocket('ws://104.128.95.54:3030/websockets/test');

class Home extends Component {
    constructor(props) {
      console.log('constructor');
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = { apiResponse: "" };
    }
  
    componentDidMount() {
        this.handleClick();
        ws.onopen = e => {
          console.log('WebSocket connect state ' + ws.readyState)
        }      
        ws.onmessage = data => {
          const receiveBox = document.getElementById('receive-box');
          if(receiveBox != null){
            receiveBox.innerHTML += '<p>' + data.data + '</p>'
            receiveBox.scrollTo({
              top: receiveBox.scrollHeight,
              behavior: "smooth"
            })
          }
        }
        document.getElementById('send-btn').addEventListener('click',this.sendClick);
        document.getElementById('exit').addEventListener('click',this.exitClick);
    }

    async handleClick(){
        const response = await axios.get('http://104.128.95.54:3030/producer'); // sennd GET request to special URL
        if (response.status === 200) {
          console.log('response:'+response.data); // return data is able to set state var value
        } else {
          console.error(`Error ${response.status}: ${response.statusText}`);
        }
    } 

    sendClick() {
          if(ws.readyState===1){
            const msgBox = document.getElementById('msg-need-send');
            ws.send(msgBox.value);
            console.log('send message:'+msgBox.value);
          }else{
            console.log('send no');
            window.location.reload();
          }
    } 

    exitClick() {
      ws.close();
      console.log('handleClick close');
    } 

    render(){
        return (
            <div className='homeMain'>
                <div className="websocket">
                    <div className="receive">
                    <div id="receive-box"/>
                    </div>
                    <div className="send">
                    <textarea type="text" id="msg-need-send" defaultValue={"777"} />
                    <span className='btns'>
                        <button id="send-btn">send message</button> 
                        &nbsp; &nbsp; &nbsp;
                        <button id="exit">close connect</button>
                    </span>
                    </div>      
                </div>
            </div>
        );
    }
}

export default Home