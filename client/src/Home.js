
import React from 'react'
import { Navigate } from 'react-router-dom'

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <h1>There is home</h1>
        );
    }
}

export default Home;