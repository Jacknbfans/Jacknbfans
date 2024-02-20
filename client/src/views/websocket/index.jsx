import React, { Component } from 'react';
import '../../css/ws.css'
//import { useNavigate, withRouter } from 'react-router-dom'

const ws = new WebSocket('ws://104.128.95.54:3030/websockets/test');

window.addEventListener('scroll', () => { 
  var h = window.innerHeight;
  var j = document.documentElement.scrollHeight;
  var k = document.documentElement.scrollTop;
  if ((h + k) >= j - 150) {
      console.log('add scroll');
  }
});

window.onload= function(){
  console.log('onload');
}

class Websocket extends Component {
  
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
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
        console.log('componentDidMount');

        ws.onopen = e => {
          console.log('WebSocket 连接状态： ' + ws.readyState)
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

        document.getElementById('send-btn').addEventListener('click',this.startClick);
        document.getElementById('exit').addEventListener('click',this.handleClick);

    }

    componentWillMount () {
      console.log('componentWillMount');
    }

    componentWillUnmount () {
      console.log('componentWillUnmount');
    }


    handleClick() {
      ws.close();
      console.log('handleClick close');
    } 

    startClick() {

        console.log('startState:'+ws.state);

          if(ws.readyState===1){
            console.log('1111111')
            const msgBox = document.getElementById('msg-need-send');
            ws.send(msgBox.value);
            console.log('startMsgBox:'+msgBox.value);
          }else{
            console.log('2222222');
            window.location.reload();
          }
    } 

    render(){
        return (
          <div className="websocket">
            <div className="receive">
              <p>服务端返回的消息</p>
              <div id="receive-box"/>
            </div>
            <div className="send">
              <textarea type="text" id="msg-need-send" defaultValue={"777"} />
              <p>
                <button id="send-btn">点击发消息给服务端</button> 
              </p>
            </div>
            <button id="exit">关闭连接</button>
        </div>
        );
      }
    }

export default Websocket