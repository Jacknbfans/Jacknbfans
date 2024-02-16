import React, { Component } from 'react';
import '../../css/ws.css'

const ws = new WebSocket('ws://104.128.95.54:3030/websockets/test')
ws.onopen = e => {
  console.log('WebSocket 连接状态： ' + ws.readyState)
}

function handleClick() {
  
    const msgBox = document.getElementById('msg-need-send');
    ws.send(msgBox.value);
} 

ws.onmessage = data => {
  const receiveBox = document.getElementById('receive-box')
  receiveBox.innerHTML += '<p>' + data.data + '</p>'
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
}

  
class Websocket extends Component {

    constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
    }
  
    callAPI() {
        fetch("http://104.128.95.54:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .then(err => err);
    }
  
    componentDidMount() {
        this.callAPI();
    }

    handleClick() {
      ws.close();
      console.log('close');


  } 


    render(){
        return (


          <div className="websocket">
          <div className="receive">
            <p>服务端返回的消息</p>
            <div id="receive-box" />
          </div>
          <div className="send">
            <textarea type="text" id="msg-need-send" defaultValue={"666"} />
            <p>
              <button id="send-btn" onClick={handleClick}>点击发消息给服务端</button>
            </p>
          </div>
          <button id="exit" onClick={this.handleClick}>关闭连接</button>
        </div>
        

        );
      }
    }


export default Websocket