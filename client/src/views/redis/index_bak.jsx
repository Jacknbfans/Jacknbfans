import React, { useEffect,useState } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:3300');

const Redis = ()=> { const[data,setData] = useState('');
useEffect(()=> { 
                    socket.on('message',(message)=> { setData(message); })
                    return () =>{
                        socket.off('message');
                    };
},[]);

return (
    { data }
);};

export default Redis 