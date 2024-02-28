import React from 'react'
import { Stomp } from '@stomp/stompjs'

/**
	/queue/queuename：使用默认转发器订阅/发布消息，默认由stomp自动创建一个持久化队列 

	/amq/queue/queuename：与/queue/queuename的区别在于队列不由stomp自动进行创建，队列不存在失败 

	/topic/routing_key：通过amq.topic转发器订阅/发布消息，订阅时默认创建一个临时队列，通过routing_key与topic进行绑定 

	/temp-queue/xxx：创建一个临时队列(只能在headers中的属性reply-to中使用)，可用于发送消息后通过临时队列接收回复消息，接收通过client.onreceive 

	/exchange/exchangename/[routing_key]：通过转发器订阅/发布消息，转发器需要手动创建 

	client.subscribe(destination,callback,headers) ：订阅消息 

	client.send(destination,headers,body)：发布消息 

	client.unsubscribe(id)：取消订阅，id为订阅时返回的编号 

	client.onreceive：默认接收回调从临时队列获取消息 
	
	*/

   





 
class LogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] }; // 初始化logs状态数组
    }
    
    componentDidMount() {
		var ws = new WebSocket('ws://104.128.95.54:3030/websockets/test');
		// 获得Stomp client对象
		var client = Stomp.over(ws);
	
		// SockJS does not support heart-beat: disable heart-beats
		client.heartbeat.outgoing = 0;
		client.heartbeat.incoming = 0;
	
		// 定义连接成功回调函数
		var on_connect = function(x) {
			client.send("exchange.direct","ctra.news","ctra.news");
			//data.body是接收到的数据
			client.subscribe("exchange.direct", "ctra.news",function(data) {
				var msg = data.body;
				//$("#message").append("收到数据：" + msg);
				console.log('message : ' + msg);
			});
		};
	
		// 定义错误时回调函数
		var on_error =  function() {
			console.log('error');
		};
	
		// 连接RabbitMQ
		client.connect('guest', 'guest', on_connect, on_error, '/');
		console.log(">>>连接上http://104.128.95.54:15672/");




        console.log('component mounted'); // 测试mounted事件
        
        const originalConsoleLog = window.console.log; // 保存原始的console.log函数
        
        window.console.log = (...args) => {
            this.setState({ logs: [...this.state.logs, args] }); // 更新logs状态数组
            
            if (typeof originalConsoleLog === 'function') {
                originalConsoleLog(...args); // 调用原始的console.log函数
            } else {
                throw new Error("originalConsoleLog is not a function");
            }
        };
    }
    
    render() {
        return <div className='rabbitmqMain'>{this.renderLogs()}</div>;
    }
    
    renderLogs() {
        return this.state.logs.map(([message]) => <p key={Math.random()} style={{ whiteSpace: "pre" }}>{`${message}`}</p>);
    }
}
 
export default LogComponent;