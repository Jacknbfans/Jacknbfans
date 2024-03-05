import React, { Component } from 'react';
import axios from 'axios';
import '../../css/ws.css'

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

class Home extends Component {
  
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
        this.handleData();
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

    async handleData(){
		const response = await axios.get('http://104.128.95.54:3030/consumer'); // 发送GET请求到指定URL
      
		if (response.status === 200) {
			console.log(response.data); // 将返回的数据设置为状态变量data的值
		} else {
			console.error(`Error ${response.status}: ${response.statusText}`);
		}
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