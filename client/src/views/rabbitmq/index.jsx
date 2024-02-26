//import React, { Component , useRef } from 'react'
import React, { Component } from 'react'

//const iRef = useRef<HTMLIFrameElement | null>(null);
const handleLoad = () => {
  setTimeout(() => {  
   //iRef.current.contentWindow.postMessage('hello', '*');
   console.log('this is handleLoad');
  }, [100]);
}

export default class Rabbitmq extends Component {

    constructor(){
        super()
        this.execComd = this.execComd.bind(this)
        this.myRef=React.createRef();
    }

    componentDidMount(){
      
    }

    execComd(command){
      console.log("666");
      console.log(this.myRef.current.contentWindow.postMessage('hello', '*'));
    
    }

    render() {
        return (
            <> 
                <div className='rabbitmqMain'>
                    <button onClick={()=>this.execComd('bold')}>Click</button>
                    <iframe ref={this.myRef} onLoad={handleLoad} id="rabbitmq" name="rabbitmq" src='http://104.128.95.54:15672' title='rabbitmq' width='100%' height='100%' />
                </div>
            </>
        )
    }
}