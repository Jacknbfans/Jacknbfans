import React from 'react';
import axios from 'axios';

class LogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] }; // 初始化logs状态数组
    }
    
    componentDidMount() {
		this.handleData();

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

	async handleData(){
		const response = await axios.get('http://104.128.95.54:3030/consumer'); // 发送GET请求到指定URL
      
		if (response.status === 200) {
			console.log(response.data); // 将返回的数据设置为状态变量data的值
		} else {
			console.error(`Error ${response.status}: ${response.statusText}`);
		}
	}
    
    render() {
        return <div className='rabbitmqMain'>{this.renderLogs()}</div>;
    }
    
    renderLogs() {
        return this.state.logs.map(([message]) => <p key={Math.random()} style={{ whiteSpace: "pre" }}>{`${message}`}</p>);
    }
}
 
export default LogComponent;
