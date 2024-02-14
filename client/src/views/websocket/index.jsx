import React, { Component } from 'react';


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

    render(){
        return (
            <>
            <meta charSet="UTF-8" />
            <title>Title</title>
            <link rel="stylesheet" href="./ws.css" />
            <script src="../websocket.js" />
            <div className="websocket">
                <div className="receive">
                <p>服务端返回的消息</p>
                <div id="receive-box" />
                </div>
                <div className="send">
                <textarea type="text" id="msg-need-send" defaultValue={""} />
                <p>
                    <button id="send-btn">点击发消息给服务端</button>
                </p>
                </div>
                <button id="exit">关闭连接</button>
            </div>
            </>

        );
      }
    }


export default Websocket