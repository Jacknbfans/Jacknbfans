import React, { Component, useEffect } from 'react';
import '../../css/ws.css'
import { withRouter, Prompt  } from 'react-router-dom'

const ws = new WebSocket('ws://104.128.95.54:3030/websockets/test')
/* ws.onopen = e => {
  console.log('WebSocket 连接状态： ' + ws.readyState)
}

ws.onmessage = data => {
  const receiveBox = document.getElementById('receive-box')
  receiveBox.innerHTML += '<p>' + data.data + '</p>'
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
} */

function handleClick() {
  
  const msgBox = document.getElementById('msg-need-send');
  ws.send(msgBox.value);
} 
  
class Websocket extends Component {

    constructor(props) {
      super(props);
      //bind this event
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
        document.getElementById('exit').addEventListener('click',this.handleClick);

/*         window.addEventListener('scroll', () => { 
          var h = window.innerHeight;
          var j = document.documentElement.scrollHeight;
          var k = document.documentElement.scrollTop;
          if ((h + k) >= j - 150) {
              console.log('add scroll');
          }
        }); */

        ws.onopen = e => {
          console.log('WebSocket 连接状态： ' + ws.readyState)
        }
        
        ws.onmessage = data => {
          const receiveBox = document.getElementById('receive-box')
          receiveBox.innerHTML += '<p>' + data.data + '</p>'
          receiveBox.scrollTo({
            top: receiveBox.scrollHeight,
            behavior: "smooth"
          })
        }


    }

    componentWillMount () {
      // 拦截判断是否离开当前页面
      window.addEventListener('beforeunload', this.beforeunload);
      console.log('componentWillMount');
    }

    componentWillUnmount () {
      // 销毁拦截判断是否离开当前页面
      window.removeEventListener('beforeunload', this.beforeunload);
      //ws.close();
      console.log('componentWillUnmount');
    }

    beforeunload (e) {
      ws.close();
      console.log('beforeunload:'+e);
    }

    handleClick() {
      ws.close();
      console.log('this.handleClick');
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
            {/* <button id="exit" onClick={this.handleClick}>关闭连接</button> */}
            <button id="exit" >关闭连接</button>
        </div>
        );
      }
    }

export default Websocket